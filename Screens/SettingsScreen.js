import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MenuButton from '../Components/MenuButton/MenuButton';

export class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MenuButton naigation={this.props.navigation} />
                <Text style={styles.text}> Settings Screen </Text>
            </View>
        )
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { color: 'black', fontSize: 25, fontWeight: '500' }
})
