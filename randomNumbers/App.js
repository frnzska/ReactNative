import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

  _doSomething () { // class function
    alert('something');
  }

  state = {number :`${Math.round(Math.random()*100)}`} // stuff to be changed seems to go into state since there a setter method is available
  _changeNumber = () => {
    this.setState({number: `${Math.round(Math.random()*100)}`}); // arrrg
  }
   
  render() { // needs to be in class, called at initialisation and when state component changes
  return (
    <View style={styles.container}>
      <Text>{this.state.number}</Text>
        <Button title="click" onPress={this._doSomething}> </Button>
      <View style={styles.specificButtonStyle}>
        <Button title="new n" color='green' onPress={this._changeNumber}></Button> 
      </View>
      <StatusBar style="auto" />
    </View>
  );
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specificButtonStyle:{
    position: 'absolute', 
    top: 300
  }
});
