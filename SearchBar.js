/**
 * SearchBar Component
 * 
 * Used to filter starships by name on the main page.
 */

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TextInput,
  View,
} = React;

var SearchBar = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarInput}
          onChange={this.props.onChange} 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for a starship"
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
});

module.exports = SearchBar;
