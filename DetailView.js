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
        <Text>{this.props.name}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40
  },
});

module.exports = DetailView;
