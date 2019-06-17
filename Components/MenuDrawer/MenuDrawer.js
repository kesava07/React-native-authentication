import React from 'react';
import { Image, Dimensions, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MenuDrawer extends React.Component {
    displayLinks = (nav, title) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate(nav)}>
            <Text style={styles.bottomLinks}>{title}</Text>
        </TouchableOpacity>
    )
    render() {
        let displayUserDetails = (
            <Text style={{ color: "#fff" }}>Loading...</Text>
        )
        if (this.props.userData !== null) {
            displayUserDetails = (
                <React.Fragment>
                    <Image source={{ uri: this.props.userData.photoURL }} style={{ width: 60, height: 60, marginRight: 10, borderRadius: 50 }} />
                    <Text style={{ color: "#fff" }}>{this.props.userData.displayName}</Text>
                </React.Fragment>
            )
        }

        return (
            <View style={[styles.drawerContainer]}>
                <View style={styles.topLinks}>
                    {displayUserDetails}
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: "white", paddingTop: 10, }}>
                    {this.displayLinks("Home", "Home")}
                    {this.displayLinks("Links", "Links")}
                    {this.displayLinks("Settings", "Settings")}
                    {this.displayLinks("Logout", "Logout")}
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={{ color: "black", fontSize: 15, textAlign: 'left' }}>Menu</Text>
                    <Text style={{ color: "black", fontSize: 15, textAlign: 'right' }}>V.1.0</Text>
                </View>
            </View>
        )
    }
};

const mapStateToProps = state => ({
    userData: state.Auth.currentUser
});

export default connect(mapStateToProps)(MenuDrawer);

const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: "lightgray",
        flex: 1
    },
    bottomLinks: {
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        alignItems: 'flex-start',
        fontSize: 15,
        color: 'black'
    },
    topLinks: {
        backgroundColor: "black",
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        width: "100%",
        padding: 10,
    }
})