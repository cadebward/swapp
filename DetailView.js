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
  View,
} = React;

var PilotListView = require('./PilotListView');
var PilotDetail = require('./PilotDetail');

var currency = require('./currency');

var DetailView = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      pilots: []
    }
  },

  fetchPilot: function(url) {
    return new Promise(function(resolve, reject) {
      fetch(url)
      .then((resp) => resp.json())
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    });
  },

  getPilots: function() {
    var pilots = [];
    var count = 0;
    this.props.pilots.forEach((pilot) => {
      this.fetchPilot(pilot).then((data) => {
        pilots = pilots.concat(data);
        count++;
        if (count == this.props.pilots.length) {
          this.setState({
            pilots: pilots,
            loaded: true,
          });
        }
      // }).catch((error) => {this.setState({networkError: true})})
      }).catch((error) => {console.log(error)})
    });
  },

  onPilotPress: function(pilot) {
    this.props.navigator.push({
      title: 'Pilot',
      component: PilotDetail,
      backButtonTitle: 'Back',
      passProps: pilot
    })
  },

  render: function() {
    var pilotList;

    if (this.state.networkError) {
      return <View style={styles.loading}><Text>Network Error :(</Text></View>
    }

    if (this.props.pilots.length && !this.state.loaded) {
      this.getPilots();
      return <View style={styles.loading}><Text>Loading Details...</Text></View>
    }

    if (this.props.pilots.length) {
      pilotList = (
        <PilotListView 
          pilots={this.state.pilots} 
          onPress={this.onPilotPress}
        />
      )
    } else {
      pilotList = <View style={styles.pilots}><Text>No Pilots</Text></View>
    }

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.name}</Text>
          <Text style={styles.detail}>Model: { this.props.model }</Text>
          <Text style={styles.detail}>Manufacturer: { this.props.manufacturer }</Text>
          <Text style={styles.detail}>Price: { currency(this.props.cost_in_credits) }</Text>
          <Text style={styles.detail}>Length: { this.props['length'] }</Text>
          <Text style={styles.detail}>Max Atmosphering Speed: { this.props.max_atmosphering_speed }</Text>
          <Text style={styles.detail}>Crew: { this.props.crew }</Text>
          <Text style={styles.detail}>Passengers: { this.props.passengers }</Text>
          <Text style={styles.detail}>Cargo Capacity: { currency(this.props.cargo_capacity) }</Text>
          <Text style={styles.detail}>Consumables: { this.props.consumables }</Text>
          <Text style={styles.detail}>Hyperdrive Rating: { this.props.hyperdrive_rating }</Text>
          <Text style={styles.detail}>MGLT: { this.props.MGLT }</Text>
          <Text style={styles.detail}>Starship Class: { this.props.starship_class }</Text>
        </View>
        <View style={styles.pilotsTitle}>
          <Text style={styles.pilots}>Pilots:</Text>
        </View>
        { pilotList }
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pilotsTitle: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: '#F5FCFF',
  },
  pilots: {
    marginTop: 15,
    marginLeft: 8,
    fontSize: 16,
    paddingBottom: 5,
  },
  detail: {
    marginTop: 5,
  }
});

module.exports = DetailView;
