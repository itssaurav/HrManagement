/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router,Scene,Modal} from 'react-native-router-flux'
import Home from './src/components/home'
import {Provider} from "react-redux";
import Store from './src/redux/store';
import AdminHome from './src/components/adminHome';
import AdminUser from './src/components/users'
import AdminProject from './src/components/project'
import userSignup from './src/components/usersignup'
import {View} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AddProject from './src/components/Addproject'
import UserListing from './src/components/userListing'
import UserLogin from './src/components/userlogin'
import UserDashboard from './src/components/userdashboard'
import userleave from './src/components/userleaveform'

export default class App extends Component<Props> {
   render() {
        const scenes = ()=>{return (<Router>

               <Scene key="root">

                 <Scene key="home"  tabs={true} default="tab1" lazy="true" tabBarPosition="top">
                      <Scene key="userlogin" component={UserLogin} tabBarStyle={{flex:1,justifyContent:'center',alignItems:'center'}} title="User" hideNavBar/>
                      <Scene key="Loginadmin" component={Home} tabBarStyle={{flex:1,justifyContent:'center',alignItems:'center'}} title="Admin" hideNavBar/>
                 </Scene>
                 <Scene key="userDashboard" component={UserDashboard} title="User Dashboard"/>
                 <Scene key="userleaveform" component={userleave} title="Apply leave"/>
                   <Scene key="adminHome" tabs={true} default="tab1" lazy="true" tabBarPosition="top">
                 {/* <Scene key="home" component={Home}  titleStyle={{marginLeft:'40%'}} title="Login"/> */}

                   {/*<Scene key="adminHome" component={AdminHome} tabs={true} renderBackButton={()=><View/>}  title="Admin DashBoard">*/}
                       <Scene key="AdminUser" component={AdminUser} tabBarStyle={{flex:1,justifyContent:'center',alignItems:'center'}} title="User" hideNavBar/>
                       <Scene key="AdminProject" component={AdminProject} tabBarStyle={{flex:1,justifyContent:'center',alignItems:'center'}} title="Project" hideNavBar/>
                   </Scene>
                   <Scene key="addproject" component={AddProject} title="Add Project"/>
                   <Scene key="userListing" component={UserListing} modal title="User Listing"/>
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


