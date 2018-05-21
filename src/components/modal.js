/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    WebView,
    ToastAndroid,
    FlatList,
    Image,
    TouchableOpacity

} from 'react-native';

import {getCricInfo} from '../redux/actions/cricInfoAction'
import moment from 'moment'
import {connect} from "react-redux";
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
class AppModal extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            goBack:false
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',maxHeight:'10%',elevation:3,backgroundColor:'#fff'}}>
               <Text>This is LightBox</Text>
            </View>

        );
    }
}



export default AppModal;


