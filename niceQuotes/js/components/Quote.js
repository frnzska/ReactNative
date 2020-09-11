import React, {Component, Fragment} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';


/*
export default class Quote extends Component {
    render() {
        const {text, author} = this.props; // destructuring enspricht ->
        // const text = this.props.text
        // const author = this.props.author
        return(
            <Fragment>
                <Text>{text}</Text>
                <Text>-- {author}</Text>
            </Fragment>
        )
    }

}
*/

// Componente ohne Zustand könnte auch eine Fkt sein:
export default function Quote(props) {
    const {text, author} = props;
    return (
        <View style={stylo.container}>
            <ScrollView>
                <Text style={[stylo.zitat, {color: 'white'}]}>{text}</Text>
                </ScrollView>
            <Text style={stylo.author}> &mdash; {author}</Text>
            
        </View>
    );
}

const stylo = StyleSheet.create({
    container: { padding: 20,  justifyContent: 'center', borderWidth: 1, height:'50%', width: '80%'},
    zitat: {
        fontSize: 36, 
        fontStyle: "italic", 
        marginBottom: 20,
        textAlign: 'left',
    },
    author: {fontSize: 20, textAlign: 'right'}
});