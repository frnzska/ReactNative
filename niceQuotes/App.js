import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, SafeAreaView, Platform, View} from 'react-native';
import * as SQLite from 'expo-sqlite'; // file based 
import Firebase from './js/Firebase/Firebase';

//import AsyncStorage from '@react-native-community/async-storage';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';
import MyButton from './js/components/MyButton';

const db = SQLite.openDatabase('quotes.db');
// mit export quasi public class damit woanders genutzt werden kann
export default class App extends React.Component {
  state = {index: 0, showNewQuoteScreen: false, quotes:[], isLoading: true} // React spezifische Eigenschaft
  
/*  ### Store with Async Storage: ###
-------------------------------------

  _storeDataAsync(quotes) {
    AsyncStorage.setItem('QUOTES', JSON.stringify(quotes)) // AsyncStorage ist lokaler texbasierter key-value storage, easiest method of local saving
  }

  _retrieveDataFromAsyncStorage = async () => {
  let val = await AsyncStorage.getItem('QUOTES');
  if (val) {
    result = JSON.parse(val); // returns a promise obj, so use then
    this.setState({quotes: result});
   }
  }

  ### Store with SQLite: ###
-------------------------------------

  _saveQuoteInDb(text, author, quotes) {
    let query = `INSERT INTO quotes (text,author) VALUES (?,?)`;
    args = [text, author]
    db.transaction(
      transaction => transaction.executeSql(query, args,
        (_, result) => {quotes[quotes.length-1].id = result.insertId;
                       this.setState({quotes:quotes}) }// add insert id to quotes
        )
    );
  }

  _retrieveDataFromDb (){
    let query = 'SELECT * FROM quotes';
    db.transaction(
      transaction => transaction.executeSql(query, [], // leere liste da keine params
        (_, result) => this.setState({quotes: result.rows._array})
        )
    );
    }


  _deleteQuoteFromDb(id) {
    let query = 'DELETE FROM quotes WHERE id = ?';
    db.transaction( transaction => transaction.executeSql(query, [id]));
  }
*/

  _saveQuoteInDb = async (text, author, quotes) => {
    docRefResult = await Firebase.db.collection('quotes').add({text, author});
    quotes[quotes.length - 1].id = docRefResult.id;
    console.log(`${docRefResult.id}-- ${quotes[quotes.length-1].id}`);
    this.setState({quotes:quotes});
  }

  _retrieveDataFromDb = async () => {
    let quotes = [];
    let query = await Firebase.db.collection('quotes').get();

    query.forEach( row => {
      quotes.push({
        id: row.id,
        text: row.data().text,
        author: row.data().author
      });
    });
    this.setState({ quotes: quotes })
    this.setState({isLoading: false});  
  }


  _deleteQuoteFromDb(id) {
    Firebase.db.collection('quotes').doc(id).delete();
  }

  _addQuote = (text, author) => {
    let { quotes, index } = this.state; // liste aus zitaten von state Variablen zuweisen
    if (text && author) quotes.push({ text: text, author: author }); // add zitat
    else alert('Incomplete fields, nothing will be saved');
    //this._storeDataAsync(quotes);
    this._saveQuoteInDb(text, author, quotes);
    this.setState({ showNewQuoteScreen: false, quotes: quotes, index:quotes.length - 1}); // update quotes im state mit quotes
  }

  _deleteQuote = () => {
     _delete = () => {
      let {index, quotes} = this.state;
      this._deleteQuoteFromDb(id=quotes[index].id);
      quotes.splice(index, 1)
      //this._storeDataAsync(quotes);
      this.setState({index: 0, quotes: quotes});
      }
    
    Alert.alert('Zitat löschen?', 
                '---',
                [{text: 'Abbruch'},
                 {text: 'OK', onPress: () => _delete()}]
                );

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
    /* Mit SQLite
    let query = `CREATE TABLE IF NOT EXISTS quotes 
                 ( id INTEGER PRIMARY KEY NOT NULL,
                   text TEXT,
                   author TEXT )`

   db.transaction(
      transaction => transaction.executeSql(query) 
    )
    */

   Firebase.init(); // stelle Verbindung zu Firebase her
   this._retrieveDataFromDb()
  }

  render() // muss bei classen mindestens render enthalten um zu wissen wie ui aussehen soll,
  // kann initialen state definieren mit property state, so soll app aussehen beim laden
  { 
    if (this.state.isLoading) {
      return(
      <View  style={styles.container}>
        <ActivityIndicator size='large' color='blue'/>
      </View>
      ) 
  }


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