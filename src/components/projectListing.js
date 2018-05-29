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
    ToastAndroid,
    FlatList,
    Image
} from 'react-native';

import {Bars} from 'react-native-loader'

import Entypo from 'react-native-vector-icons/Entypo'
import firebase from '../firebaseConfig'
import { Actions } from 'react-native-router-flux'
let listeddata

class ProjectListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listeduser : ''

        }
    }


    render() {
        return (
         <Text>Saurav</Text>
        );
    }
}
export default ProjectListing;


