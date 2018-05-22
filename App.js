/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router,Scene} from 'react-native-router-flux'
import Home from './src/components/home'
import {Provider} from "react-redux";
import Store from './src/redux/store';
import AdminHome from './src/components/adminHome';
import AdminUser from './src/components/users'
import AdminProject from './src/components/project'
import userSignup from './src/components/usersignup'
import {View} from 'react-native'

export default class App extends Component<Props> {
   render() {
        const scenes = ()=>{return (<Router>
               <Scene key="root">
                 {/* <Scene key="home" component={Home}  titleStyle={{marginLeft:'40%'}} title="Login"/> */}
                   <Scene key="adminHome" tabs={true} default="tab1" title="Admin DashBoard" tabBarPosition="top">
                   {/*<Scene key="adminHome" component={AdminHome} tabs={true} renderBackButton={()=><View/>}  title="Admin DashBoard">*/}
                       <Scene key="AdminUser"  component={AdminUser} title="User" hideNavBar/>
                       <Scene key="AdminProject"  component={AdminProject} title="Project" hideNavBar/>
                   </Scene>
                   <Scene key="userSignup"  component={userSignup} title="usersignup"/>
              </Scene>

        </Router>)}

        return (

            <Provider store={Store} >
                <Router scenes={scenes}/>
            </Provider>
        );
    }
}


