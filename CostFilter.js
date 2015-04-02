/**
 * FilterCost component
 *
 * Contains a SwitchIOS for sorting starships and a TextInput for
 * filtering by amount.
 */

'use strict';

var React = require('react-native');
var {
  Text,
  TextInput,
  StyleSheet,
  View,
} = React;

var Switch = require('./Switch');

var CostFilter = React.createClass({
  getInitialState: function() {
    return {
      filterPrice: null,
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

  filterValue: function(e) {
    var text = e.nativeEvent.text.toLowerCase();
    this.props.onFilterValueChange(text)
  },

  render: function() {
    var showFilter = StyleSheet.create({
      filter: {
        height: (this.state.showFilter) ? 60 : 0,
        flexDirection: 'row',
      }
    });

    var SortText = (this.state.sortSwitch) ? 'Sorted Desc' : 'Sorted Asc';

    return (
      <View style={showFilter.filter}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>{ SortText }</Text>
          <Switch onChange={this.sortSwitchChange}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.sliderText}>Do not use commas. eg: 10000</Text>
          <TextInput 
            style={styles.textInput}
            onChange={this.filterValue} 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Input your max budget"
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
  textInput: {
    flex: 1,
    height: 30,
    borderColor: '#eeeeee',
    borderWidth: 1,
    margin: 13,
    marginTop: 1,
    paddingLeft: 8,
  },
  inputContainer: {
    flex: 2,
    paddingRight: 8,
  },
});

module.exports = CostFilter;
