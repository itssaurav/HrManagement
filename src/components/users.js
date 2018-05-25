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
    FlatList,
    Image
} from 'react-native';

import {Bars} from 'react-native-loader'


import firebase from '../firebaseConfig'
import { Actions } from 'react-native-router-flux'
let listeddata

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
             listeduser : ''

        }
}
   componentWillMount(){
          listeddata = this.state.listuser
          let resultarray = [];
          let listcount =  firebase.database().ref().child('userlist');
          listcount.on('value', snap=>{
          resultarray =   Object.keys(snap.val()).map((key)=>{
                    return snap.val()[key]
                    })
          this.setState({
              listeduser: resultarray
          })
      })
   }

    render() {
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
                <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
                   {this.state.listeduser?<FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data= {this.state.listeduser}
                        renderItem={({item})=>(

                        <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRadius:4,marginBottom:10,padding:5,elevation:1}}>
                           <View style={{flexDirection:'row',flex:1}}>
                                <View style={{flex:1}}>
                                    <Image source={require('../assets/project.jpg')} style={{width:70,height:70}}/>
                                </View>
                                <View style={{flex:2}}>
                                   <Text>Name : {item.username}</Text>
                                   <Text>Designation : {item.Designation}</Text>
                                   <Text>Email : {item.email}</Text>
                                   <Text>Currently on : {item.p_id?item.p_name:'none'}</Text>
                                </View>
                            </View>
                            {item.hasOwnProperty('leave')?<View style={{flex:1,justifyContent:'center',alignItems:'flex-end',alignSelf:'stretch',marginTop:10}}>
                                <TouchableOpacity onPress={()=>Actions.leavePanel({leaveData:item.leave,title:'Leave Applied by '+item.username,keyItem:item.keydata})} style={{backgroundColor:'#4971ff',padding:4,borderRadius:4}}><Text style={{color:'#fff'}}>Applied Leaves</Text></TouchableOpacity>
                            </View>:null}
                        </View>
                        )}
                        />:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Bars size={10} color="#FDAAFF" /></View>}
                   
                </View>

            </View>
        );
    }
}
export default AdminUsers;


