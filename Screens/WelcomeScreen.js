import React from 'react';
import { View } from 'react-native';
import firebase from '../firebase/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { setCurrentUser } from '../Store/Actions/Actions';

class WelcomeScreen extends React.Component {
    state = {
        loader: true
    };

    componentDidMount() {
        this.authenticateUser()
    };

    authenticateUser = () => {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.props.navigation.navigate("Home")
                    this.setState({ loader: false })
                    this.props.setCurrentUserData(user)

                } else {
                    this.props.navigation.navigate("SignUp")
                    this.setState({ loader: false })
                }
            })
    };
    componentWillUnmount() {
        this.authenticateUser();
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Icon name="spinner" color="red" size={30} />
            </View>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentUserData: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(WelcomeScreen);