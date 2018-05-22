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
    BackHandler,
    ToastAndroid,
    FlatList
} from 'react-native';
import {List, ListItem} from 'react-native-elements'


import firebase from '../firebaseConfig'
import { Actions } from 'react-native-router-flux'
let listeddata
let snapdata
let dataarray 
class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // seconds: 0,
            // username:'',
            // password:'',
            // listuser: [
            listeduser : ''
            // ]
        }

    }
    componentWillMount(){
          listeddata = this.state.listuser
          let resultarray = []
      let listcount =  firebase.database().ref().child('userlist')
      listcount.once('value', snap=>{
            // console.log("snapdata",snap.val())
             snapdata = snap.val()
            console.log("snddddata", snapdata)
            resultarray =   Object.keys(snapdata).map(function(a){
                return snapdata[a]
                })
                console.log("dataarray", resultarray)
                this.setState({
                    listeduser: resultarray
                })
            // listeddata.push(snap.val())
            // console.log("notesdata", listeddata)
        //    let dataobject =  Object.keys(listeddata).map(function(key){
        //        return [Number(key), obj[key]]
        //    });
        //    console.log("objectsdata", dataobject)
        })
        // firebase.database().on('child_added', snap=>{
        //     listeddata.push({
        //         listeddata: snap.val().userlist
        //     })
        // })
        // console.log("notesdata", listeddata)
    }
    // addUser()
    // {
    //     let addData = {
    //         'userId':3,
    //         'name':'saurav',
    //         'type':'user'
    //     }
    //     firebase.database().ref('users/' + addData.userId).set(addData);

    // }
    render() {
        // console.log("listeduser",this.state.listeduser)
        return (
            <View style={{flex:1,padding:10}}>
              <TouchableOpacity 
            onPress = {()=>Actions.userSignup()}
            style = {{
                  padding: 10,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4971ff'
            }}><Text style = {{color: '#fff',}}>Add user</Text></TouchableOpacity>
                <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                    {/* <Text>Admin User</Text> */}

                        <FlatList 
                        data= {this.state.listeduser}
                        renderItem={({item})=>(
                        <View>
                         <Text>{item.username}</Text>
                         <Text>{item.email}</Text>
                         <Text>{item.projectname}</Text>
                         <Text>{item.Designation}</Text>
                         </View>
                        )}
                        />
                   
                </View>

            </View>
        );
    }
}
export default AdminUsers;


