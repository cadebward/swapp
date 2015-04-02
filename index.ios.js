/**
 * STARWARS App (SWAPP) * theme song enters *
 * 
 * React Native
 * https://github.com/facebook/react-native
 * 
 * Cade Ward April 2015
 */

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var SearchScreen = require('./SearchScreen');

var listeners = [];

var SWAPP = React.createClass({
  register: function(cb) {
    listeners.push(cb);
  },

  filter: function() {
    listeners.forEach(function(cb) {
      cb();
    });
  },

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Starships',
          component: SearchScreen,
          rightButtonTitle: 'Filter',
          onRightButtonPress: this.filter,
          passProps: {register: this.register}
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('swapp', () => SWAPP);

module.exports = SWAPP;
