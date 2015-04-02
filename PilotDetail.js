/**
 * PilotDetail
 * 
 * React Native
 * https://github.com/facebook/react-native
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
          <Text>Height: {this.props.height}</Text>
          <Text>Weight: {this.props.mass}</Text>
          <Text>Gender: {this.props.gender}</Text>
          <Text>Hair Color: {this.props.hair_color}</Text>
          <Text>Skin Color: {this.props.skin_color}</Text>
          <Text>Birth Year: {this.props.birth_year}</Text>
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
});

module.exports = PilotDetail;
