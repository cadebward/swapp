/**
 * SearchScreen
 * 
 */

'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch('http://swapi.co/api/starships/')
    .then((resp) => resp.json())
    .then((response) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.results),
        loaded: true
      })
    }).done()
  },

  renderShip: function(ship) {
    return (
      <View style={styles.container}>
        <Text>{ship.name}</Text>
      </View>
    )
  },

  render: function() {
    if (!this.state.loaded) {
      return <View style={styles.loading}><Text>Loading Starships...</Text></View>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderShip}
        style={styles.listView}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    padding: 20
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    padding: 20
  },
  listView: {
    // paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = SearchScreen;
