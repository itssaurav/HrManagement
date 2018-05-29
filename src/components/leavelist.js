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
    ScrollView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
    let listcountleave
    let storeuiddata
    let diffdays
class Leavelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leavelist: '',
            storeuiddata: ''
        }
        this.userlistrender= this.userlistrender.bind(this)
    }
    userlistrender(useridmain){
        console.log("useridmain", useridmain)
           let resultleavearray = []
        let listcountleave =  firebase.database().ref('userlist').child(useridmain).child('leave')
        listcountleave.on('value', snap=>{
            snapdata = snap.val()
            resultleavearray = Object.keys(snapdata).map(function(a){
                return snapdata[a]
                })
                console.log("gotuserlistdata",resultleavearray)
                this.setState({
                    leavelist : resultleavearray
                })
        })
    }
    componentWillMount(){
        AsyncStorage.getItem('storeuid').then((storeuid) => {
            console.log("adskd", storeuid)
            this.setState({
                storeuiddata: storeuid
            })
            this.userlistrender(this.state.storeuiddata)
            console.log("maindata", this.state.storeuiddata)
           });
    }
    render() {
       console.log("gotprops", this.props.useridlist)
       console.log("gotuserlist",this.state.leavelist)
      return (
          <ScrollView>
              <View style={{flex:1,padding:10}}>
              {
                  this.state.leavelist !==""?  this.state.leavelist.map((items,i)=>{
                    console.log("gotitems",items)
                    let ts = new Date(items.fromdate);
                    console.log("datestring", ts.toDateString().substr(4, 12))
                    let fromconvert = ts.toDateString().substr(4, 12)
                    let fd = new Date (items.fromdateto)
                    console.log('todatestring', fd.toDateString().substr(4, 12))
                    let toconvert = fd.toDateString().substr(4, 12)
                    let oneday = 24*60*60*1000;
                    let firstdate = new Date(items.fromdate)
                    let seconddate = new Date (items.fromdateto)
                    diffdays = Math.round(Math.abs((firstdate.getTime() - seconddate.getTime())/(oneday)) + 1)
                    console.log("differnceindate", diffdays)
                    return(
                      <View key = {i} style = {{marginTop: 20}}>
                          <Text>Subject: {items.subject}</Text>
                          <Text>Message: {items.message}</Text>
                          <Text>From{fromconvert}</Text>
                          <Text>To{toconvert}</Text>
                          <Text>Status of leave: {items.status}</Text>
                          <Text>No of Days applied: {diffdays}</Text>
                      </View> 
                    )
                })
                : null
              }
             </View>
             </ScrollView>
        );
    }
}


export default Leavelist;


