import React, {Component, Fragment} from 'react';
import {View, Button} from 'react-native';




// Componente ohne Zustand könnte auch eine Fkt sein:
export default function MyButton(props) {
    let button = null;
    if (props.visible) {
    const {style, title, onPress} = props;
    button = (
        <View style={style}>
             <Button title={title} color='darkgrey' onPress={onPress}/>
        </View>
    );
    }
    return button;
}
