/**
 * ShipCell component
 * 
 * Cell component used for each individual cell in the startships 
 * ListView. 
 */

'use strict';

var React = require('react-native');
var {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
} = React;

var currency = require('./currency');

var ShipCell = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={styles.container}>
            <View>
              <Text style={styles.name}>{ this.props.ship.name }</Text>
              <View style={styles.info}>
                <Text style={styles.cost}>Price: { currency(this.props.ship.cost_in_credits) }</Text>
                <Text style={styles.pilot}>Pilots: { this.props.ship.pilots.length }</Text>
              </View>
            </View>
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
  cost: {
    fontSize: 12,
  },
  pilot: {
    fontSize: 12,
    marginLeft: 15
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  name: {
    fontSize: 16
  },
});

module.exports = ShipCell;
