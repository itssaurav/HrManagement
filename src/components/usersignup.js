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
    StyleSheet,
    CameraRoll,
    Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
import RNFetchBlob from 'react-native-fetch-blob'
import * as ImagePicker from 'react-native-image-picker'
let useriddata
var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };    
class userSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            project:'',
            designation:'',
            useriddata: '',
            profileurl: '',
            avatarSource: ''
        }
        this.registeruser = this.registeruser.bind(this)
        this.rendefunction = this.rendefunction.bind(this)
        this.getimage = this.getimage.bind(this)
    }
    rendefunction(dataids){
        console.log("caleedthefunction")
        console.log("daya", dataids)
        console.log("urlprofile", this.state.profileurl)
        firebase.database().ref().child('userlist').child(dataids).set({
            username: this.state.username,
            email: this.state.email,
            projectname: this.state.project,
            Designation: this.state.designation,
            keydata: dataids,
            urlprofile: this.state.profileurl
          });
    }
    getimage(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            console.log("uridata", response.origURL)
            const image = response.origURL
            const Blob = RNFetchBlob.polyfill.Blob
            const fs = RNFetchBlob.fs
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
            window.Blob = Blob
        
           
            let uploadBlob = null
            let timestamp = Number(new Date());
            const imageRef = firebase.storage().ref(timestamp.toString())
            // const imageRef = firebase.storage().ref('posts').child("test.jpg")
            let mime = 'image/jpg'
            fs.readFile(image, 'base64')
              .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
              })
              .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
              })
              .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);
                this.setState({
                    profileurl: url
                })
                
              })
              .catch((error) => {
                console.log(error);
        
              })  
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
                
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
    }
    // rendefunction(dataids){
    //     console.log("caleedthefunction")
    //     console.log("daya", dataids)
    //     firebase.database().ref().child('userlist').child(dataids).set({
    //         username: this.state.username,
    //         email: this.state.email,
    //         projectname: this.state.project,
    //         Designation: this.state.designation,
    //         keydata: dataids
    //       });
    // }
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
                      <View>
                      <TouchableOpacity onPress = {()=>this.getimage()}><Text>Upload profile</Text></TouchableOpacity> 
                            <Image source={this.state.avatarSource}  style = {{width: 100, height: 100, borderBottomLeftRadius: 50, borderBottomLeftRadius: 50, borderTopLeftRadius: 50, borderTopRightRadius: 50}}/>
                      </View>
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
                      <View>
                      </View>
                    
                    
                      <TouchableOpacity onPress = {()=> this.registeruser()} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30}}>
                          <Text style={{color:'#fff'}}>Register</Text>
                      </TouchableOpacity>
                  </View>
             </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    gallery: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });

export default userSignup;


