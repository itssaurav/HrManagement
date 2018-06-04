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
    ScrollView,
    StyleSheet,
    CameraRoll,
    Image,
    Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
import RNFetchBlob from 'react-native-fetch-blob'
import * as ImagePicker from 'react-native-image-picker'

let useriddata;
let resultArray = [];
let designation = [{
    id:0,
    post:'Developer'
},
    {
        id:1,
        post:'Manager'
    }];
var options = {
    title: 'Select Avatar',
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
            modal:false,
            projectList:[],
            selected:'',
            selectedName:'',
            modal2:false,
            selectedDesignationId:'',
            profileurl: '',
            avatarSource: ''
        }
        this.registeruser = this.registeruser.bind(this)
        this.rendefunction = this.rendefunction.bind(this)
        this.getimage = this.getimage.bind(this)
    }
    componentDidMount()
    {
        firebase.database().ref('project').on('value',(projectData)=>{
            if(projectData.val()!==null){
                resultArray=Object.keys(projectData.val()).map(function(key) {
                    return projectData.val()[key]
                });
                console.log('result',resultArray);
                this.setState({projectList:resultArray});
            }
        });
    }
    rendefunction(dataids){
        console.log("caleedthefunction")
        console.log("daya", dataids)
        console.log("urlprofile", this.state.profileurl)
        firebase.database().ref().child('userlist').child(dataids).set({
            username: this.state.username,
            email: this.state.email,
            projectname: this.state.selected,
            Designation: this.state.selectedDesignation,
            p_id:'',
            p_name:this.state.selectedName,
            keydata: dataids,
            projectname: this.state.project,
            Designation: this.state.designation,
            keydata: dataids,
            urlprofile: this.state.profileurl

          });
        Actions.pop();
    }
    _showDateTimePickerModal()
    {

      this.setState({
          modal:true
      })
    }
    _showDateTimePickerModal2()
    {
        this.setState({
            modal2:true
        })
    }
    getimage(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            // console.log("uridata", Platform.OS === 'ios' ? response.origURL: response.uri)
            let image = Platform.OS === 'ios' ? response.origURL : response.uri
            // const image= response.origURL
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
   }
    render() {
      return (
              <ScrollView style={{flex:1,padding:10}}>
                
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
                          value={this.state.selectedDesignation}
                          onFocus={this._showDateTimePickerModal2.bind(this)}
                      />

                      <TouchableOpacity onPress = {()=> this.registeruser()} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30,minHeight:50}}>
                          <Text style={{color:'#fff'}}>Register</Text>
                      </TouchableOpacity>
                  </View>

                  <Modal isVisible={this.state.modal2}>
                      <View style={{flex:1,padding:10,backgroundColor:'#fff',maxHeight:150,borderRadius:4}}>
                          <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',maxHeight:30}}>
                              <TouchableOpacity onPress={()=>this.setState({modal2:false})}><Entypo name="cross" size={20}/></TouchableOpacity>
                          </View>

                          {designation.map((item)=>{
                              return(
                              <TouchableOpacity onPress={()=>this.setState({selectedDesignation:item.post,selectedDesignationId:item.id,modal2:false})} style={{flex: 1, flexDirection: 'row'}}>
                                      <View style={{
                                          flex: 1,
                                          justifyContent: 'center',
                                          alignItems: 'flex-start',
                                          padding: 10
                                      }}>
                                          {this.state.selectedDesignationId!==item.id?<Ionicons name="md-radio-button-off" size={15} color="orange"/> :<Ionicons name="md-radio-button-on" size={15} color="orange"/>}
                                      </View>
                                      <View style={{flex: 5, justifyContent: 'center', alignItems: 'flex-start'}}>
                                          <Text>{item.post}</Text>
                                      </View>
                                  </TouchableOpacity>)})}
                      </View>

                  </Modal>
             </ScrollView>
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


