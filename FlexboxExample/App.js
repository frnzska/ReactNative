import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

export default class App extends Component {
  render() {
  return (
    <View style={styles.container}>
      <View style={ styles.square}/>
      <View style={ styles.box }/>
      <View style={ styles.rectangle }/>

    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // flex > 0 -> max ausdehnung
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  },
  square: {backgroundColor:'cyan', width: 100, height: 100},
  box: {backgroundColor:'lightcoral', width: 100, height: 100},
  rectangle: {backgroundColor:'tomato', width: 100, height: 100}
  // binnen elementen auf einer ebene kann flex auch größenverhältnis festlegen
  // bsp. elem1 mit flex:1, elem2 mit flex:2 heißt elem2 is doppelt so groß wie elem1

});

/*
flexDirection: 'column' or 'row' oder 'row-reverse', default 'column'
justifyContent: 'flex-start' or 'center', 'space-around', 'space-evenly', 'space-between'
   Anordung auf Hauptachso, wo beginnet, bspw. 'center' zentriert in Mitte alles zusammen geklatscht,
   'space-evenly' gleichverteilter space zwischen elementen
alignItems: 'flex-start' oder 'flex-end' oder 'center' oder 'stretch' und 'baseline' // Anordnung auf Querachse (Querachse ist die, die nicht Hauptachse ist)
   Wenn Hauptachse row ist, dann würde alignItems: 'flex-end' die items am boden anordnen und mit center quer über die mitte
   Wenn Hauptache row ist, dann würde alignItems: 'stretch'
   baseline: bei unterschiedlich großen elementen, ordnet baseline alle auf einer höhe/breite an, Grundlinienausrichtung
   stretch: da alignItems sich auf Querachse auswirkt, werden Elemente auf diesr Ebene in die Länge gestretcht insofern kein height bzw width angegeben ist
flexWrap: 'wrap', erzwingt Umbruch wenn elemente nicht mehr auf Screen dargetstellt werden
alignSelf: obige properties sind alle auf container ebene, man kann noch individuelle darstellung von elementen definieren mit alignSelf
  
   
*/
