/**
 * PilotDetail component
 * 
 * Provides a component for displaying details about a pilot.
 */

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var PilotDetail = React.createClass({
  render: function() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.name}</Text>
          <Text style={styles.detail}>Height: {this.props.height}</Text>
          <Text style={styles.detail}>Weight: {this.props.mass}</Text>
          <Text style={styles.detail}>Gender: {this.props.gender}</Text>
          <Text style={styles.detail}>Hair Color: {this.props.hair_color}</Text>
          <Text style={styles.detail}>Skin Color: {this.props.skin_color}</Text>
          <Text style={styles.detail}>Birth Year: {this.props.birth_year}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 8,
    paddingTop: 80
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    marginTop: 5,
  }
});

module.exports = PilotDetail;
