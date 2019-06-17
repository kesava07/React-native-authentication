import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../firebase/Firebase';
import md5 from 'md5'

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        toggleButton: true,
        userName: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users"),
    };

    handleLogin = () => this.setState({ toggleButton: !this.state.toggleButton });

    handleRegister = () => {
        if (this.isFormVaild()) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName: this.state.userName,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            this.saveUserData(createdUser)
                                .then(() => {
                                    console.log("User saved successfully")
                                    this.setState({
                                        userName: "",
                                        email: "",
                                        password: "",
                                        toggleButton: !this.state.toggleButton
                                    })
                                })
                        })

                })
                .catch(err => {
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
        }
    };

    saveUserData = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    };

    isFormVaild = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: "Please fill all the details" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else if (!this.passwordMatch(this.state)) {
            error = { message: "Password is Invalid" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else {
            return true
        }
    }

    isFormEmpty = ({ userName, email, password }) => {
        return !userName.length || !email.length || !password.length
    }
    passwordMatch = ({ password }) => {
        if (password.length < 6) {
            return false
        }
        else {
            return true
        }
    };

    handleLoginUser = () => {
        let errors = [];
        let error;
        if (!this.state.email || !this.state.password) {
            error = { message: "Invalid credentials" }
            this.setState({ errors: errors.concat(error) })
        } else {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    this.props.navigation.navigate("Home")
                })
                .catch(err => {
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
        }
    }



    render() {
        const { userName, email, password } = this.state;

        let displayButton = (
            <TouchableOpacity style={[styles.buttonContainer, styles.shadow]} onPress={this.handleRegister} >
                <Text style={{ color: 'white' }}>SignUp
                    {/* <Icon name="rocket" size={20} color="white" /> */}
                </Text>
            </TouchableOpacity >
        );
        if (this.state.toggleButton) {
            displayButton = (
                <TouchableOpacity style={[styles.buttonContainer, styles.shadow]} onPress={this.handleLoginUser}>
                    <Text style={{ color: 'white' }}>Login
                    {/* <Icon name="rocket" size={20} color="white" /> */}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
                <Image source={require("../../Images/man.png")} style={[{ height: 70, width: 70, marginBottom: 20, borderRadius: 50 }]} />
                {!this.state.toggleButton && <View style={[styles.textContainer, styles.shadow]}>
                    {/* <Image source={require("../Images/user.png")} style={{ height: 20, width: 20, marginLeft: 15 }} /> */}
                    <Icon name='user-circle-o' size={20} color="#1a73e8" style={{ marginLeft: 15 }} />
                    <TextInput
                        placeholder="User Name"
                        onChangeText={(userName) => this.setState({ userName })}
                        value={this.state.userName}
                        style={styles.input}
                    />
                </View>}
                <View style={[styles.textContainer, styles.shadow]}>
                    {/* <Image source={require("../Images/user.png")} style={{ height: 20, width: 20, marginLeft: 15 }} /> */}
                    <Icon name='envelope' size={20} color="#1a73e8" style={{ marginLeft: 15 }} />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.textContainer, styles.shadow]}>
                    <Icon name='key' size={20} color="#1a73e8" style={{ marginLeft: 15 }} />
                    {/* <Image source={require("../Images/user.png")} style={{ height: 20, width: 20, marginLeft: 15 }} /> */}
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        style={styles.input}
                    />
                </View>
                {displayButton}
                <View>
                    {this.state.toggleButton ?
                        <React.Fragment>
                            <Text>Dont have an acoount <Text onPress={this.handleLogin} style={{ color: "#1a73e8" }}>SignUp</Text></Text>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Text> Have an acoount <Text onPress={this.handleLogin} style={{ color: "#1a73e8" }}>Login</Text></Text>
                        </React.Fragment>
                    }
                </View>
                {
                    this.state.errors && this.state.errors.map((error, i) => (
                        <View key={i} style={{ marginTop: 10 }}>
                            <Text style={{ color: "#dc3545" }}>{error.message}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        alignItems: "center"
    },
    textContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        width: 240,
        flexDirection: 'row',
        marginBottom: 20
    },
    buttonContainer: {
        backgroundColor: "#1a73e8",
        borderRadius: 20,
        width: 240,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    input: {
        height: 40,
        flex: 1
    },
    shadow: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    }
});