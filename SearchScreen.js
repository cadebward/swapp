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
        rowHasChanged: (row1, row2) => true,
      }),
      showFilter: false,
      filterByPrice: false,
      filterPrice: 1000,
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
        })
        .catch((error) => {
          console.log(error);
        })
      }
    });
  },

  fetchData: function() {
    this.getShips('http://swapi.co/api/starships/').then((results) => {

      results.sort(function(a, b){
        if (a.cost_in_credits === 'unknown') return 1;
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
      <ShipCell onPress={() => this._handleShipClick(ship)} ship={ship} />
    )
  },

  getDataSource: function(ships) {
    return this.state.dataSource.cloneWithRows(ships);
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
      dataSource: this.getDataSource(filteredShips)
    });
  },

  sortSwitchChange: function(bool) {
    this.setState({
      dataSource: this.getDataSource(this.state.starships.reverse())
    });
  },

  filterSwitchChange: function(bool) {
    if (bool) {
      this.setState({
        filterByPrice: true
      })
      this.filterByPrice();
    } else {
      this.setState({
        filterByPrice: false,
        dataSource: this.getDataSource(this.state.starships),
      })
    }
  },

  sliderChange: function(value) {
    this.setState({
      filterPrice: value
    });

    if (this.state.filterByPrice) {
      this.filterByPrice();
    }
  },

  filterByPrice: function() {
    var filteredShips = [];
    var ships = this.state.starships;
    for (var i = 0; i < ships.length; ++i) {
      if (parseFloat(ships[i].cost_in_credits) < this.state.filterPrice) {
        filteredShips.push(ships[i]);
      }
    }
    this.setState({
      dataSource: this.getDataSource(filteredShips),
      filteredByPriceList: filteredShips,
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
