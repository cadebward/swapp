/**
 * SearchScreen
 * 
 */

'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var DetailView = require('./DetailView');
var ShipCell = require('./ShipCell');
var SearchBar = require('./SearchBar');

var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  _handleShipClick: function(ship) {
    this.props.navigator.push({
      title: 'Detail',
      component: DetailView,
      backButtonTitle: 'Back',
      passProps: ship
    })
  },

  getShips: function() {
    return new Promise((resolve, reject) => {
      var results = [];

      get('http://swapi.co/api/starships/');

      function get(url) {
        fetch(url)
        .then((resp) => resp.json())
        .then((response) => {
          results = results.concat(response.results);
          // API returns a link to the next page if there are more results
          if (response.next && typeof response.next === 'string') {
            get(response.next);
          } else {
            resolve(results)
          }
        })
      }

    })
  },

  fetchData: function() {
    this.getShips('http://swapi.co/api/starships/').then((results) => {
      this.setState({
        starships: results,
        dataSource: this.state.dataSource.cloneWithRows(results),
        loaded: true
      });
    });
  },

  renderRow: function(ship) {
    return (
      <ShipCell onPress={() => this._handleShipClick(ship)} ship={ship} />
    )
  },

  searchChange: function(e) {
    var text = e.nativeEvent.text.toLowerCase();
    var re = new RegExp(text.toLowerCase());
    var filteredShips = [];
    var ships = this.state.starships;
    for (var i = 0; i < ships.length; ++i) {
      if (ships[i].name.toLowerCase().match(re)) {
        filteredShips.push(ships[i]);
      }
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredShips)
    });
  },

  render: function() {
    if (!this.state.loaded) {
      return <View style={styles.loading}><Text>Loading Starships...</Text></View>
    }

    return (
      <View style={styles.container}>
        <SearchBar
          onChange={this.searchChange}
        />
        <View style={styles.seperator}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  seperator: {
    height: 1,
    backgroundColor: '#eeeeee'
  },
});

module.exports = SearchScreen;
