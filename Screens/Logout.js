import React from 'react';
import { View } from 'react-native';
import firebase from '../firebase/Firebase';

export default class Logout extends React.Component {
    componentDidMount() {
        firebase.auth().signOut()
        this.props.navigation.navigate("WelcomeScreen")
    }
    render() {
        return (
            <View></View>
        )
    }
}