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
import {Actions} from 'react-native-router-flux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '../../src/firebaseConfig'
let selectedIds = [];
class UserListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            username:'',
            password:'',
            userList:'',
            selectedUser:[]
        }
     this.selectedData=this.selectedData.bind(this);
    }
    componentDidMount()
    {
        let resultArray = [];
        firebase.database().ref('userlist').on('value',(projectData)=>{
            resultArray=Object.keys(projectData.val()).map(function(key) {
                 return projectData.val()[key]
            });
            console.log('result',resultArray);
            this.setState({userList:resultArray});
        });
    }
    selectedData(selectedUser)
    {

        if(selectedIds.indexOf(selectedUser)>=0)
        {
            selectedIds.splice(selectedIds.indexOf(selectedUser),1);
        }
        else {
            selectedIds.push(selectedUser);
        }
        this.setState({
            selectedUser:selectedIds
        })
    }
    render() {
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        console.log('selectedUser',this.state.selectedUser);
        return (
            <View style={{flex:1,padding:10}}>
                <View style={{flex:1,backgroundColor:'#fff',padding:5,position:'relative'}}>

                    <View style={{flex:1}}>
                        {this.state.userList!==''?<FlatList
                            data={this.state.userList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={()=>this.selectedData(item.keydata)} style={{flex:1,marginTop:20,borderWidth:1,borderColor:'#6164c1',borderRadius:4,padding:4,backgroundColor:'#cecece'}}>

                                    <View style={{flex:0.5,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                            <Image source={require('../assets/project.jpg')} style={{width:70,height:70}}/>
                                        </View>
                                        <View style={{flex:3,justifyContent:'flex-start',alignItems:'flex-start',paddingLeft:10}}>
                                            <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                                <Text> Name : {item.username}</Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text> Email : {item.email}</Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text> Designation : {item.Designation}</Text>
                                            </View>

                                        </View>

                                    </View>
                                    {this.state.selectedUser.length?this.state.selectedUser.map((itemData)=>{
                                        console.log(itemData);
                                        return (
                                        <View style={{flex:1,position:'absolute',right:'2%',top:'3%'}}>
                                            {itemData===item.keydata?<FontAwesome name="check-circle" size={20} color='green'/>:null}
                                        </View>)
                                    }):null
                                    }

                               </TouchableOpacity>
                            }
                        />:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Bars size={10} color="#FDAAFF" /></View>}

                    </View>

                </View>
            </View>
        );
    }
}
export default UserListing;


