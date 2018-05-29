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
    Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
import Toast from 'react-native-simple-toast';
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
            passwordhide: false
        }
        this.eyehandle = this.eyehandle.bind(this)
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
    eyehandle(){
        this.setState({
            passwordhide: !this.state.passwordhide
        })
    }
    loginModal()
    {
        if(this.state.username == "" && this.state.password ==""){
            Toast.show('Please fill all the fields');
        }
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
            console.log(errorCode)
            if(errorCode == "auth/invalid-email"){
                Toast.show('Please enter a valid email');
            }
            if(errorCode == "auth/user-not-found"){
                Toast.show('User not found');
            }
            if(errorCode == "auth/wrong-password"){
                Toast.show('Password is incorrect ');
            }
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
                  {/* {this.state.validationText?<Text style={{color:'red',marginBottom:10}}>{this.state.validationText}</Text>:null} */}
                
                  <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                     <TextField
                          label='UserName'
                          value={this.state.username}
                          onChangeText={ (text) => this.setState({ username:text}) }
                      />
                      <View style = {{
                          flexDirection: 'row'
                      }}>
                          <View style = {{
                              flex: 11
                          }}>
                                <TextField
                                label='Password'
                                value={this.state.password}
                                secureTextEntry = {this.state.passwordhide == false? true: false}
                                onChangeText={ (text) => this.setState({ password:text}) }
                            />
                          </View>
                          <TouchableOpacity
                          onPress = {()=>this.eyehandle()}
                          disabled=  {this.state.password !==""? false: true}
                          style = {{flex: 0.5, justifyContent: 'center', alignItems: 'center', opacity: this.state.password !==""? 1: 0.6}}>
                          {
                              this.state.passwordhide == true? <Image style={{width: 20, height: 20}} source={require('../assets/eye-opens.png')}/>:  <Image style={{width: 20, height: 20}} source={require('../assets/eye-close.png')}/>
                          }
                           
                        </TouchableOpacity>
                        </View>
                      <TouchableOpacity disabled = {this.state.username !== "" && this.state.password !== ""? false: true} onPress={this.loginModal.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:this.state.username !== "" && this.state.password !== ""?"blue": "#0000000a",maxHeight:50,marginTop:30}}>
                          <Text style={{color:this.state.username !== "" && this.state.password !== ""?"#fff": "#000"}}>Login</Text>
                      </TouchableOpacity>
                  </View>


             </View>
        );
    }
}


export default UserLogin;


