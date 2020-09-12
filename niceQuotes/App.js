import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text,SafeAreaView, Button, Platform, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';
import MyButton from './js/components/MyButton';


// mit export quasi public class damit woanders genutzt werden kann
export default class App extends React.Component {
  state = {index: 0, showNewQuoteScreen: false, quotes:{}} // React spezifische Eigenschaft
  

  _storeData(quotes) {
    AsyncStorage.setItem('QUOTES', JSON.stringify(quotes)) // AsyncStorage ist lokaler texbasierter key-value storage
  }

  _retrieveData = async () => {
  let val = await AsyncStorage.getItem('QUOTES');
  if (val) {
    result = JSON.parse(val); // returns a promise obj, so use then
    this.setState({quotes: result});
   }
  }

  _addQuote = (text, author) => {
    let { quotes, index } = this.state; // liste aus zitaten von state Variablen zuweisen
    if (text && author) quotes.push({ text: text, author: author }); // add zitat
    else alert('Incomplete fields, nothing will be saved');
    this._storeData(quotes);
    this.setState({ showNewQuoteScreen: false, quotes: quotes, index:quotes.length - 1}); // update quotes im state mit quotes
  }

  _deleteQuote = () => {
    let {index, quotes} = this.state;
    new_quotes = quotes.splice(index, 1)
    console.log(`${index}`);
    this._storeData(quotes)
    this.setState({index: 0})
  } 

  _silentlyBack = () => {
    this.setState({ showNewQuoteScreen: false }); // Backbutton wird gedrückt, Vorgang abbrechen
  }

  _nextQuote = () => {
    let {index, quotes} = this.state;
    let newIndex = index + 1;
    if (newIndex === quotes.length) newIndex = 0;
    this.setState({index: newIndex});
  }

  _lastQuote = () => {
    let {index, quotes} = this.state;
    let oldIndex = index - 1;
    if (oldIndex === -1) oldIndex = quotes.length - 1
    this.setState({index: oldIndex});
  }
  

  _randomQuote = () => {
    let {index, quotes} = this.state;
    let randomIndex = Math.floor(Math.random() * quotes.length);
    this.setState({index: randomIndex});
  }

  componentDidMount() {
   this._retrieveData()
  }

  render() // muss bei classen mindestens render enthalten um zu wissen wie ui aussehen soll,
  // kann initialen state definieren mit property state, so soll app aussehen beim laden
  { 
    //this._retrieveData()
    let {index, quotes} = this.state;
    const quote = quotes[index];
    let content = <Text>Bisher keine Zitate</Text>
    if (quote) content = <Quote text={quote.text} author={quote.author}></Quote>

    let showNaviButton = false
    if (quotes.length >= 2) showNaviButton = true
    console.log(`render ${index}`);
    return (
    <SafeAreaView style={styles.container}>
    <MyButton visible={true} style={styles.createButton} title='Create' onPress={() =>this.setState({showNewQuoteScreen: true})}/>
    <MyButton visible={quotes.length >= 1} style={styles.deleteButton} title='Delete' onPress={this._deleteQuote}/>
    <NewQuote isVisible={this.state.showNewQuoteScreen} onSaveFct={this._addQuote} backButton={this._silentlyBack}></NewQuote>
    {//quote === undefined ? (<Text>Bisher keine Zitate</Text>) : (<Quote text={quote.text} author={quote.author}></Quote>)
    content}  
    <MyButton visible={showNaviButton} style={styles.nextButton} title='Next' onPress={this._nextQuote}/>
    <MyButton visible={showNaviButton} style={styles.randomButton} title='Random' onPress={this._randomQuote}/>
    <MyButton visible={showNaviButton} style={styles.backButton} title='Back' onPress={this._lastQuote}/>
    <StatusBar style="auto" />
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  nextButton: {
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 100 : 60,  // if plattform is ios than use 100 else 60 due to different screen format
    right: 20
    },
  backButton: {
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 100 : 60,  // if plattform is ios than use 100 else 60 due to different screen format
    left: 20
    },
  createButton: {
    position: 'absolute', 
    top: 60,
    right: 20
    },
   deleteButton: {
    position: 'absolute', 
    top: 60,
    left: 20
    },
    randomButton: {
      position: 'absolute', 
      bottom: Platform.OS === 'ios' ? 100 : 60,
      left: '42%'
      }
});

/*
Was passiert:
- render wird bei App (Klassen initialisierung) aufgerufen
- button wird gedrückt, Zustand ändert sich, render wird erneut ausgeführt
- auserdem wird render von Quote aufgerufen wannimmer sich übergebenes prop ändert
*/