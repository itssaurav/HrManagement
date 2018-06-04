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
import firebase from '../firebaseConfig'
let selectedIds = [];
let selectedUI  = [];
class UserListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            username:'',
            password:'',
            userList:'',
            selectedUser:[],
            projectUser:[]
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
        firebase.database().ref('project').child(this.props.p_id).on('value',(projectData)=>{
            this.setState({projectUser:projectData.val()});
        });
    }
    selectedData(selectedUser,item) {
        if (this.state.userList.hasOwnProperty('p_id')) {

        }
        if (selectedIds.indexOf(selectedUser) >= 0) {
            if(item.p_id===this.props.p_id) {
                selectedIds.splice(selectedIds.indexOf(selectedUser), 1);
                firebase.database().ref('userlist/' + selectedUser).update({
                    'p_id': '',
                    'p_name': ''
                }, function (error) {
                    if (error) {
                        // The write failed...
                    } else {
                        // Data saved successfully!
                    }
                });
                firebase.database().ref('project/' + this.props.p_id).update({
                    'p_member_included': this.state.projectUser.p_member_included - 1,
                    'p_member_left': this.state.projectUser.p_member_left + 1,

                }, function (error) {
                    if (error) {
                        // The write failed...
                    } else {
                        // Data saved successfully!
                    }
                });

            }
            else
            {
                alert("Developer is not Free");
            }
        }
        else {

            if (this.state.projectUser.p_member_left > 0) {
                if(item.p_id==="") {
                    selectedIds.push(selectedUser);
                    firebase.database().ref('userlist/' + selectedUser).update({
                        'p_id': this.props.p_id,
                        'p_name': this.props.p_name

                    }, function (error) {
                        if (error) {
                            console.log('error', error);
                        } else {
                            console.log('successful');
                        }
                    });
                    firebase.database().ref('project/' + this.props.p_id).update({
                        'u_id': selectedIds,
                        'p_member_included': this.state.projectUser.p_member_included + 1,
                        'p_member_left': this.state.projectUser.p_member_left - 1,
                    }, function (error) {
                        if (error) {
                            // The write failed...
                        } else {
                            // Data saved successfully!
                        }
                    });
                }else
                {
                    alert('Developer is not Free');
                }
            }
            else {
                alert('Project is already full');

            }
        }
          firebase.database().ref('project/' + this.props.p_id).update({
                'u_id': selectedIds
            });

            this.setState({
                selectedUser: selectedIds
            })

    }
   render() {
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        return (
            <View style={{flex:1,padding:10}}>
                <View style={{flex:1,backgroundColor:'#fff',padding:5,position:'relative'}}>

                    <View style={{flex:1}}>

                        {this.state.userList!==''?<FlatList
                            data={this.state.userList}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={()=>this.selectedData(item.keydata,item)} style={{flex:1,marginTop:20,borderWidth:1,borderColor:'#6164c1',borderRadius:4,padding:4,backgroundColor:'#cecece'}}>

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
                                            <View style={{flex:1}}>
                                                <Text> AssignedTo : {item.p_id!==''? item.p_name:'None'}</Text>
                                            </View>

                                        </View>

                                    </View>
                                    {item.p_id===this.props.p_id?<View style={{flex:1,position:'absolute',right:'2%',top:'3%'}}>
                                        <FontAwesome name="check-circle" size={20} color='green'/>
                                    </View>:null}
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


