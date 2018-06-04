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
class cameraroll extends Component {

    constructor(props){
        super(props)
        this.state = {
            avatarSource: ''
        }
        this.getimage = this.getimage.bind(this)
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
            const imageRef = firebase.storage().ref('posts').child("test.jpg")
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
    render() {
      return (
              <View style={{flex:1,padding:10}}>
                
                      <View style={styles.gallery}>
                      <Text style={styles.welcome}>
                        Image Gallery
                        </Text>    
                      {/* <CameraRollPicker selected={[]} maximum={30}/> */}
                      <TouchableOpacity onPress = {()=>this.getimage()}><Text>Click me</Text></TouchableOpacity>
                     </View>
                     <Image source={this.state.avatarSource}  style = {{width: 200, height: 200}}/>
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

export default cameraroll;


