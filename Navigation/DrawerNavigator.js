import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, Dimensions } from 'react-native';
import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import LinkScreen from '../Screens/LinksScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import MenuDrawer from '../Components/MenuDrawer/MenuDrawer';
import SignUp from '../Screens/Auth/SignUp';
import WelcomeScreen from '../Screens/WelcomeScreen';
import Logout from '../Screens/Logout'

const width = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: width * 0.60,
    contentComponent: ({ navigation }) => {
        return (
            <MenuDrawer navigation={navigation} />
        )
    }
};

const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    Links: {
        screen: LinkScreen
    },
    Settings: {
        screen: SettingsScreen
    },
    Logout: {
        screen: Logout
    }
},
    DrawerConfig
);

const AppContainer = createSwitchNavigator({
    Home: AppDrawerNavigator,
    SignUp: SignUp,
    WelcomeScreen:WelcomeScreen
},
    {
        initialRouteName: "WelcomeScreen"
    }
);

export default createAppContainer(AppContainer)