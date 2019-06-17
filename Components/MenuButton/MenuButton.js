import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const MenuButton = (props) => (
    <Icon
        name="md-menu"
        size={30}
        color="#000000"
        style={Styles.menuButton}
        onPress={() => props.naigation.toggleDrawer()}
    />
);
export default MenuButton;

const Styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        top: 10,
        left: 15,
        zIndex: 9
    }
})