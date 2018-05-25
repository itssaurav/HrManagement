/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    AsyncStorage,
    ToastAndroid
} from 'react-native';


import firebase from '../../src/firebaseConfig'
let LoginAdmin =
    {
        'username':'admin@gmail.com',
        'password':'admin'
    }
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            username:'',
            password:'',
      }

    }
    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.bachButtonhandler.bind(this));
    }

    bachButtonhandler()
    {
            BackHandler.exitApp();
            return true;
    }
    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.bachButtonhandler.bind(this));
    }
    addUser()
    {
        let addData = {
            'userId':3,
            'name':'saurav',
            'type':'user'
        }
        firebase.database().ref('users/' + addData.userId).set(addData);

    }
    render() {
        return (
            <View style={{flex:1,padding:10}}>
                <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                   <Text>Admin DashBoard</Text>
                </View>
            </View>
        );
    }
}
export default AdminHome;


