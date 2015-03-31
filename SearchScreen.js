/**
 * SearchScreen
 * 
 */

'use strict';

// load fake data while developing... their api is slow
var DEV = true;


var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  SliderIOS,
  TouchableHighlight,
  View
} = React;

var DetailView = require('./DetailView');
var ShipCell = require('./ShipCell');
var SearchBar = require('./SearchBar');
var CostFilter = require('./CostFilter');


var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      showFilter: false,
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

      if (DEV) {
        results = require('./fakeData');
        resolve(results);
      } else {
        get('http://swapi.co/api/starships/');
      }

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
        });
      }
    });
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

  sortSwitchChange: function(bool) {
    console.log('sort changed');
  },

  filterSwitchChange: function(bool) {
    console.log('filter changed');
  },

  sliderChange: function(value) {
    console.log('slider changed');
  },

  filter: function() {
    this.setState({
      showFilter: true
    })
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
        <CostFilter 
          onSortSwitchChange={this.sortSwitchChange} 
          onFilterSwitchChange={this.filterSwitchChange} 
          onSliderChange={this.sliderChange}
          showFilter={this.state.showFilter}
          register={this.props.register}
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
