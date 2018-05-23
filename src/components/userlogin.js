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
class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5,
            username:'',
            password:'',
            validationText:'',
        }

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
    loginModal()
    {
        console.log("called")
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
        .then((response)=>{
            console.log("responsserver",response)
            Actions.userDashboard({usersuid: response.user.uid})
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
          });
    }
    // {
    //   if(this.state.username==='' || this.state.password==='')
    //   {
    //     this.setState({
    //         validationText:'Please fill all the fields'
    //     })
    //   }
    //   else
    //   {
    //       if(this.state.username===LoginAdmin.username && this.state.password===LoginAdmin.password)
    //       {
    //           Actions.adminHome();
    //       }
    //       else
    //       {
    //           this.setState({
    //               validationText:'Wrong username and password'
    //           })
    //       }

    //   }
    //     AsyncStorage.setItem('user','2');
    // }
    render() {
      return (
              <View style={{flex:1,padding:10}}>
                  {this.state.validationText?<Text style={{color:'red',marginBottom:10}}>{this.state.validationText}</Text>:null}
                  <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                     <TextField
                          label='UserName'
                          value={this.state.username}
                          onChangeText={ (text) => this.setState({ username:text}) }
                      />
                      <TextField
                          label='Paswword'
                          value={this.state.password}
                          onChangeText={ (text) => this.setState({ password:text}) }
                      />
                      <TouchableOpacity onPress={this.loginModal.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30}}>
                          <Text style={{color:'#fff'}}>Login</Text>
                      </TouchableOpacity>
                  </View>


             </View>
        );
    }
}


export default UserLogin;


