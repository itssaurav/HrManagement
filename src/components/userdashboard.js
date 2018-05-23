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
    AsyncStorage
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
let LoginAdmin =
    {
        'username':'admin@gmail.com',
        'password':'admin'
    }
    let snapdata
    let listcount
    let userprofiledata
class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5,
            username:'',
            password:'',
            validationText:'',
            userprofile: ''
        }
    }
    componentWillMount(){
        let listcount =  firebase.database().ref('userlist').child(this.props.usersuid)
        listcount.on('value', snap=>{
            snapdata = snap.val()
            console.log(snapdata)
           this.setState({
            userprofile: snapdata             
           })       

            // firebase.database().ref('project').child(snapdata.p_id).on('value', snapgot=>{
            //     console.log("snapgot", snapgot.val())
            // })
        })
        console.log("calledcomponent")
        console.log(this.props.usersuid)
    }
    render() {
     
        console.log("userprofile", this.state.userprofile)
       
      return (
              <View style={{flex:1,padding:10}}>
                 
                 <Text>Name : {this.state.userprofile.username}</Text>
                 <Text>Email : {this.state.userprofile.email}</Text>
                 <Text>Project name: {this.state.userprofile.projectname}</Text>
                 <Text>Designation: {this.state.userprofile.Designation}</Text>
                 <Text>Availablity: {this.state.userprofile.p_id !=="" ? "not available": "available"}</Text>
                 <TouchableOpacity onPress = {()=>Actions.userleaveform({keyiddata: this.state.userprofile.keydata})}><Text>Apply Leave</Text></TouchableOpacity>
             </View>
        );
    }
}


export default UserDashboard;


