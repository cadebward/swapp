/**
 * PilotListView
 * 
 * React Native
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var PilotListView = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.pilots),
    }
  },

  renderRow: function(pilot) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.onPress(pilot)}>
          <View style={styles.container}>
            <Text>{ pilot.name }</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    height: 60,
    paddingLeft: 8,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
});

module.exports = PilotListView;
