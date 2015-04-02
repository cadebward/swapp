/**
 * SearchScreen
 * 
 */

'use strict';

// load fake data while developing... their api is slow
var DEV = false;


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
      showFilter: false,
      filterByPrice: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => true,
      }),
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  handleShipClick: function(ship) {
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
        })
        .catch((error) => {
          console.log(error);
        })
      }
    });
  },

  fetchData: function() {
    this.getShips('http://swapi.co/api/starships/').then((results) => {

      // sort results leaving 'unknown' at the top
      // 'unknown' is treated as lowest so it shows up in searches
      results.sort(function(a, b){
        if (a.cost_in_credits === 'unknown') return -1;
        return parseFloat(a.cost_in_credits) - parseFloat(b.cost_in_credits)
      });

      this.setState({
        starships: results,
        dataSource: this.getDataSource(results),
        loaded: true
      });
    });
  },

  renderRow: function(ship) {
    return (
      <ShipCell onPress={() => this.handleShipClick(ship)} ship={ship} />
    )
  },

  getDataSource: function(ships) {
    return this.state.dataSource.cloneWithRows(ships);
  },

  searchChange: function(e) {
    var text = e.nativeEvent.text.toLowerCase();
    var re = new RegExp(text.toLowerCase());
    var filteredShips = [];
    // if list is being filtered, use that list instead of the main list
    var ships = (this.state.filterByPrice) ? this.state.filteredByPriceList : this.state.starships;
    for (var i = 0; i < ships.length; ++i) {
      if (ships[i].name.toLowerCase().match(re)) {
        filteredShips.push(ships[i]);
      }
    }

    this.setState({
      dataSource: this.getDataSource(filteredShips)
    });
  },

  sortSwitchChange: function(bool) {
    if (this.state.filterByPrice) {
      this.setState({
        dataSource: this.getDataSource(this.state.filteredByPriceList.reverse()),
        starships: this.state.starships.reverse(),
      })
    } else {
      this.setState({
        dataSource: this.getDataSource(this.state.starships.reverse()),
      }); 
    }
  },

  filterValueChange: function(value) {
    // if input is removed, return whole list
    if (value == '') {
      this.setState({
        dataSource: this.getDataSource(this.state.starships),
        filterByPrice: false,
        filteredByPriceList: [],
      });
    }

    // if an invalid number is entered, do nothing
    if (isNaN(parseFloat(value))) return;

    // otherwise strip list of all ships above the value entered into the input
    var filteredShips = [];
    var ships = this.state.starships;
    for (var i = 0; i < ships.length; ++i) {
      if (parseFloat(ships[i].cost_in_credits) < value || ships[i].cost_in_credits == 'unknown') {
        filteredShips.push(ships[i]);
      }
    }

    this.setState({
      dataSource: this.getDataSource(filteredShips),
      filteredByPriceList: filteredShips,
      filterByPrice: true,
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
          onFilterValueChange={this.filterValueChange}
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
