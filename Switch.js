/**
 * FilterCost component
 *
 */

'use strict';

var React = require('react-native');
var {
  Text,
  TextInput,
  StyleSheet,
  SwitchIOS,
  View,
} = React;

var Switch = React.createClass({
  getInitialState: function() {
    return {
      value: false
    };
  },

  handleChange: function(value) {
    this.setState({
      value
    });
    this.props.onChange(value);
  },

  render: function() {
    return (
      <View>
        <SwitchIOS onValueChange={this.handleChange} value={this.state.value} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = Switch;
