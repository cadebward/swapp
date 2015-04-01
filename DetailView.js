/**
 * DetailView
 * 
 * React Native
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var DetailView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.name}</Text>
        <Text>Cost: {this.props.cost_in_credits}</Text>
        <Text>Pilots: {this.props.pilots.length} view</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 80
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

module.exports = DetailView;
