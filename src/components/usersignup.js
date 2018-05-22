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
    AsyncStorage,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
let useriddata
class userSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            project:'',
            designation:'',
            useriddata: ''
        }
        this.registeruser = this.registeruser.bind(this)
        this.rendefunction = this.rendefunction.bind(this)
    }
    rendefunction(dataids){
        console.log("caleedthefunction")
        console.log("daya", dataids)
        firebase.database().ref().child('userlist').child(dataids).set({
            username: this.state.username,
            email: this.state.email,
            projectname: this.state.project,
            Designation: this.state.designation,
            keydata: dataids
          });
    }
    registeruser(){
        console.log(this.state.email);
        
        // console.log("function called")
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
         .then((response)=>{
                console.log(response.user.uid)
                this.rendefunction(response.user.uid)
                    // useriddata = response.user.uid
         })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
          });
        //  if(this.state.email !== ""){
     
        // }
        // else{
        //     console.log("falsedatat")
        // }
        //   if(this.state.email !== "" && this.state.useriddata !==""){
        //     firebase.database().ref().child('notes').push().set({
        //         username: this.state.username,
        //         email: this.state.email,
        //         useriddata : useriddata
        //       });
        //   }
        //   else{
        //       console.log("erroe")
        //   }
       
     
    }
    render() {
      return (
              <View style={{flex:1,padding:10}}>
                
                  <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                     <TextField
                          label='UserName'
                          value={this.state.username}
                          onChangeText={ (text) => this.setState({ username:text}) }
                      />
                      <TextField
                          label='Email'
                          value={this.state.email}
                          onChangeText={ (text) => this.setState({ email:text}) }
                      />
                      <TextField
                          label='Password'
                          value={this.state.password}
                          onChangeText={ (text) => this.setState({ password:text}) }
                      />
                      <TextField
                          label='Project Name'
                          value={this.state.project}
                          onChangeText={ (text) => this.setState({ project:text}) }
                      />
                     <TextField
                          label='Designation'
                          value={this.state.designation}
                          onChangeText={ (text) => this.setState({ designation:text}) }
                      />
                      <TouchableOpacity onPress = {()=> this.registeruser()} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30}}>
                          <Text style={{color:'#fff'}}>Register</Text>
                      </TouchableOpacity>
                  </View>
             </View>
        );
    }
}


export default userSignup;


