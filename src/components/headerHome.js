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
import {Actions} from 'react-native-router-flux';


class HeaderHome extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            goBack:false
        }
    }

    render() {
        return (
            <View style={{flex:1,flexDirection:'row',maxHeight:'10%',elevation:3,backgroundColor:'#fff'}}>
                <TouchableOpacity onPress={()=>Actions.drawer({key:'drawer',open:'ture'})} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Saurav</Text>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Saurav</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Saurav</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Saurav</Text>
                </View>
            </View>

        );
    }
}



export default HeaderHome;


