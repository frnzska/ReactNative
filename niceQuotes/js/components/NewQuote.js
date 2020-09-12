import React, {Component} from 'react';
import {Button, TextInput, Modal, View, StyleSheet, Text} from 'react-native';

export default class NewQuote extends Component {
    state = {content:null, author:null};

    render() {
        const {isVisible, onSaveFct, backButton} = this.props;  // destructuring
        const {content, author} = this.state;

        // aus <newQuote tag übergeben in App.js
            return (
            <Modal 
            visible={isVisible}
            animationType='slide'
            onRequestClose={ () =>  { this.setState({ content: null, author: null });
                                      backButton();}
            } // Abbruch beim nicht speichern und drücken des Backbuttons
            >
            <View style={styles.container}>
                    <TextInput 
                     style={[styles.input, {height:150}]} // list style properties in array  
                     placeholder='Zitat Inhalt' 
                     multiline={true}
                     onChangeText={textParam => this.setState({content:textParam})
                     // takes input and sets new state, with changing state render is executed again
                     }/>
                     
                    <TextInput 
                     style={styles.input} 
                     placeholder='Author'
                     onChangeText={authorParam => this.setState({author:authorParam})}/>
                    <Button title='Speichern' onPress={() => { onSaveFct(content, author); 
                                                               this.setState({ content: null, author: null }); // zurücksetzen ansonsten bleibt 
                                                               // letzer speicherwert bei leerlassen und speichern drücken erhalten und wird nochmals gespeichert 
                                                            }
                                                             
                    // content, author destructured oben, wird an onSaveFct übergeben
                    }> </Button>
                </View>
            </Modal>
            )       
        }
    }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth:1,
        borderColor: 'darkgrey',
        borderRadius: 4,
        width: '80%',
        margin: 20,
        fontSize: 20

    }
});