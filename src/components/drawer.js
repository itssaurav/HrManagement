
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
import SideBar from './sideMenuHome'
import { Drawer } from 'native-base';


class DrawerInfo extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            goBack:false
        }
    }

    render() {
        const state = this.props.navigation;
        console.log('Drawer',this.props);
        const children = state.children;

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar/>}
                onClose={() => this.closeDrawer()} >
                {children}
            </Drawer>

        );
    }
}
export default DrawerInfo;


