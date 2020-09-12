import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text,SafeAreaView, Button, Platform, ScrollView} from 'react-native';

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

const data = [
  {text: 'yo bro ahskjasf ashjkafsdk fasd kafsklj asfkj afskj adfsk jadsfkj fdsa afs afs kfask jasfk jfas fkafjöafljfasdjl afs afs lafsjkl fsd jklfas klafslk akj fsaö lfa jfsd fsakj fafsj fsakj fksalfj klsaj fksalj fkjslaj fklsaj fklsj afkj kasfj kjsa fkdsjafaslökfjöajkfd öljfas akljfaskj faksdfask dfjsa fksaffds kjfsakj akljf klsaj fksak fksjfskfjk asljdfkas fdka fj', author: 'the bro'},
  {text: 'milkshake please', author: 'boy from the yard'},
  {text: 'Hallo!', author: 'the lover'}
]


// mit export quasi public class damit woanders genutzt werden kann
export default class App extends React.Component {
  state = {index: 0, showNewQuoteScreen: false, quotes: data} // React spezifische Eigenschaft
  
  _addQuote = (text, author) => {
    let { quotes } = this.state; // liste aus zitaten von state Variablen zuweisen
    if (text && author) quotes.push({ text: text, author: author }); // add zitat
    else alert('Incomplete fields, nothing will be saved');
    this.setState({ showNewQuoteScreen: false, quotes:quotes }); // update quotes im state mit quotes
  }

  _silentlyBack = () => {
    this.setState({ showNewQuoteScreen: false }); // update quotes im state mit quotes
  }

  
  render() // muss bei classen mindestens render enthalten um zu wissen wie ui aussehen soll,
  // kann initialen state definieren mit property state, so soll app aussehen beim laden
  { 
    // some state logic organising order of quotes
    let {index, quotes} = this.state;
    const quote = quotes[index];
    let newIndex = index + 1;
    if (newIndex === quotes.length) newIndex = 0;
    let oldIndex = index - 1;
    if (oldIndex === -1) oldIndex = quotes.length - 1
    
    /*
    Button in View
    */
    return (
    <SafeAreaView style={styles.container}>
    <View style={styles.newButton}>  
        <Button title='Create'     color='darkgrey' onPress={() =>this.setState({showNewQuoteScreen: true})}> </Button> 
    </View>  
    <NewQuote isVisible={this.state.showNewQuoteScreen} onSaveFct={this._addQuote} backButton={this._silentlyBack}></NewQuote>
    <Quote text={quote.text} author={quote.author}></Quote>
      <View style={styles.button}>
        <Button title='NEXT' color='darkgrey' onPress={() => this.setState({index: newIndex})}/>
        <Button title='BACK' color='darkgrey'  onPress={() => this.setState({index: oldIndex})}/>
      </View>
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
    justifyContent: 'center',
  }, 
  button: {
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 100 : 60,  // if plattform is ios than use 100 else 60 due to different screen format
    flexDirection: 'row',
    alignItems: 'center'},
  newButton: {
    position: 'absolute', 
    top: 60

    }
});

/*
Was passiert:
- render wird bei App (Klassen initialisierung) aufgerufen
- button wird gedrückt, Zustand ändert sich, render wird erneut ausgeführt
- auserdem wird render von Quote aufgerufen wannimmer sich übergebenes prop ändert
*/