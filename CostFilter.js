/**
 * FilterCost component
 *
 */

'use strict';

var React = require('react-native');
var {
  Text,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  View,
} = React;

var Switch = require('./Switch');

var FILTER_STATUS = false;

var CostFilter = React.createClass({
  getInitialState: function() {
    return {
      filterPrice: Math.floor((0 * 100000) + 1000),
      showFilter: false,
      sortSwitch: false,
    }
  },

  componentDidMount: function() {
    this.props.register(this.filterPressed);
  },

  filterPressed: function() {
    this.setState({
      showFilter: !this.state.showFilter
    });
  },

  sortSwitchChange: function(value) {
    this.setState({sortSwitch: value});
    this.props.onSortSwitchChange(value);
  },

  filterSwitchChange: function(value) {
    this.setState({sortSwitch: value});
    this.props.onFilterSwitchChange(value);
  },

  filterSliderChange: function(value) {
    this.setState({
      filterPrice: Math.floor((value * 100000) + 1000)
    })
  },

  filterSliderComplete: function(value) {
    this.props.onSliderChange(Math.floor((value * 100000) + 1000))
  },

  render: function() {
    var showFilter = StyleSheet.create({
      filter: {
        height: (this.state.showFilter) ? 60 : 0,
        flexDirection: 'row',
      }
    });

    var SortText = (this.state.sortSwitch) ? 'Sorted Asc' : 'Sorted Desc';

    return (
      <View style={showFilter.filter}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>{ SortText }</Text>
          <Switch onChange={this.sortSwitchChange}/>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filter Price</Text>
          <Switch onChange={this.filterSwitchChange}/>
        </View>
        <View style={styles.slider}>
          <Text style={styles.sliderText}>Filter Price By: {this.state.filterPrice}</Text>
          <SliderIOS 
            style={styles.sliderInput} 
            onValueChange={this.filterSliderChange}
            onSlidingComplete={this.filterSliderComplete}
          />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterText: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 5
  },
  sliderText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
    marginBottom: -1
  },
  filterContainer: {
    flex: 1,
    marginLeft: 8,
    marginTop: 5,
  },
  sliderInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
  slider: {
    flex: 2,
    paddingRight: 8,
  },
});

module.exports = CostFilter;
