import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MenuButton from '../Components/MenuButton/MenuButton';

export class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MenuButton naigation={this.props.navigation} />
                <Text style={styles.text}> Home Screen </Text>
            </View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 25,
        fontWeight: '500'
    }
})
