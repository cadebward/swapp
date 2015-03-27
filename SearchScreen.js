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

  render: function() {
    if (!this.state.loaded) {
      return <View style={styles.loading}><Text>Loading Starships...</Text></View>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
      />
    );
  }
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingLeft: 20,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
});

module.exports = SearchScreen;
