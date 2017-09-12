/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Highlight from 'react-native-highlight-words'
import {fetchWeather} from  './weatherApi'


const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
}


const phrases = {
  Default: {
    title: "Fetching the Fucking Weather",
    subtitle: "Be patient, you're witnessing a miricle",
    highlight: "Fucking",
    color: "#636363",
    background: "#9C9C9C"
  },
  Clear: {
    title: "It's Fucking Amaze Balls",
    subtitle: "Rock that shit!",
    highlight: "Fucking",
    color: "#E32500",
    background: "#FFD017"
  },
  Rain: {
    title: "Rain rain please go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A"
  },
  Thunderstorm: {
    title: "Fucking Thunder Strike",
    subtitle: "Unplug those devices",
    highlight: "Thunder",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "limit",
    color: "#0044FF",
    background: "#939393"
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "You're not supposed to eat it",
    highlight: "Fucking",
    color: "#021D4C",
    background: "#15A678"
  },
  Drizzle: {
    title: "Meh... don't even ask",
    subtitle: "What did I just say?",
    highlight: "don't",
    color: "#B3F6E4",
    background: "#1FBB68"
  },
  Mist: {
    title: "Mist title",
    subtitle: "Mist sub",
    highlight: "Mist",
    color: "#B3F6E4",
    background: "#1FBB68"
  },
}

class App extends Component {
  componentWillMount() {
    this.state = {
      temp: 0,
      weather: 'Default'
    }
  }
  componentDidMount() {
    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (positionData) => fetchWeather(positionData.coords.latitude, positionData.coords.longitude)
        .then(res => this.setState({
          temp: Math.round(res.temp),
          weather: res.weather,
        })),
      (error) => alert("Error! Could not access location data."),
      {timeout:10000}
    )
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background}]}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={100} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
        <Highlight
          style={styles.title}
          highlightStyle={{color: phrases[this.state.weather].color}}
          searchWords={[phrases[this.state.weather].highlight]}
          textToHighlight={phrases[this.state.weather].title}
/>
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white',
  },
  body: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 5,
    margin: 10,
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 76,
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white',
  },
});

export default App;
