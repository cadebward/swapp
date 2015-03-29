/**
 * ShipCell
 * 
 * React Native
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var {
  View,
  TouchableHighlight,
  StyleSheet,
  Text
} = React;

var ShipCell = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={styles.container}>
            <Text>{ this.props.ship.name }</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 8,
  },
  cell: {
    paddingLeft: 20,
  }
});

module.exports = ShipCell;
