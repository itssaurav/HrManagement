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
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'
let LoginAdmin =
    {
        'username':'admin@gmail.com',
        'password':'admin'
    }
    let snapdata
    let listcount
    let userprofiledata
    let storeuid
class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5,
            username:'',
            password:'',
            validationText:'',
            userprofile: ''
        }
    }
    componentWillMount(){
        let listcount =  firebase.database().ref('userlist').child(this.props.usersuid)
        listcount.on('value', snap=>{
            snapdata = snap.val()
            console.log(snapdata)
           this.setState({
            userprofile: snapdata             
           })       
           storeuid = this.props.usersuid
           console.log("madeit", storeuid)
           AsyncStorage.setItem('storeuid', storeuid);

            // firebase.database().ref('project').child(snapdata.p_id).on('value', snapgot=>{
            //     console.log("snapgot", snapgot.val())
            // })
        })
       

        console.log("calledcomponent")
        console.log(this.props.usersuid)
    }
    render() {
     
        console.log("userprofile", this.state.userprofile)
       
      return (
            //   <View style={{flex:1,padding:10}}>
                 
            //      <Text>Name : {this.state.userprofile.username}</Text>
            //      <Text>Email : {this.state.userprofile.email}</Text>
            //      <Text>Project name: {this.state.userprofile.projectname}</Text>
            //      <Text>Designation: {this.state.userprofile.Designation}</Text>
            //      <Text>Availablity: {this.state.userprofile.p_id !=="" ? "not available": "available"}</Text>
            //      <TouchableOpacity onPress = {()=>Actions.userleaveform({keyiddata: this.state.userprofile.keydata})}><Text>Apply Leave</Text></TouchableOpacity>
            //     <TouchableOpacity onPress= {()=>Actions.leavelist()}><Text>USerlist</Text></TouchableOpacity>
            //  </View>
            <ScrollView style = {{
                backgroundColor: '#fff',
            }}>
            <View style = {{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#fff',
            }}>
                <View style = {{
                    flex: 5,
                    backgroundColor: '#3ec9e7',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 40
                }}>
                <View style = {{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    // backgroundColor: 'red',
                    overflow: 'hidden'
                }}>
                             <Image
           style={{ flexShrink: 1, flex: 1, width: null}}
          source={{uri: this.state.userprofile.urlprofile}}
        />
                </View>
                <View style = {{
                    marginTop: 10
                }}>
                    <Text style = {{color: '#fff', fontSize: 23, fontFamily: "gotham-black",}}>{this.state.userprofile.username}</Text>
                </View>
                </View>
                <View style = {{
                    flex: 2,
                    flexDirection: 'row',
                    padding: 20
                }}>
                    <View style = {{
                        flex: 0.3,
                        alignItems: 'flex-end'
                    }}><MaterialIcons name="email" size={30} color="#3ec9e7" /></View>
                    <View style = {{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginTop: 8,
                        marginLeft: 10,
                        fontFamily: "gotham-black"
                    }}>
                        <Text>{this.state.userprofile.email}</Text>
                    </View>
                </View>
                <View style = {{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20
                }}>
                    <View style = {{
                        flex: 0.3,
                        alignItems: 'flex-end'
                    }}><MaterialIcons name="view-list" size={30} color="#3ec9e7" /></View>
                    <View style = {{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginTop: 8,
                        marginLeft: 10,
                        fontFamily: "gotham-black"
                    }}>
                        <Text>{this.state.userprofile.projectname}</Text>
                    </View>
                </View>
                <View style = {{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20
                }}>
                    <View style = {{
                        flex: 0.3,
                        alignItems: 'flex-end'
                    }}><MaterialCommunityIcons name="certificate" size={30} color="#3ec9e7" /></View>
                    <View style = {{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginTop: 8,
                        marginLeft: 10,
                        fontFamily: "gotham-black"
                    }}>
                        <Text>{this.state.userprofile.Designation}</Text>
                    </View>
                </View>
                <View style = {{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20
                }}>
                    <View style = {{
                        flex: 0.3,
                        alignItems: 'flex-end'
                    }}><MaterialIcons name="event-available" size={30} color="#3ec9e7" /></View>
                    <View style = {{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginTop: 8,
                        marginLeft: 10,
                        fontFamily: "gotham-black"
                    }}>
                        <Text>{this.state.userprofile.p_id !=="" ? "Not Available": "Available"}</Text>
                    </View>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    marginTop: 25
                }}>
                    <View style = {{
                        flex: 1,
                       
                    }}>
                    <TouchableOpacity 
                    onPress = {()=>Actions.userleaveform({keyiddata: this.state.userprofile.keydata})}
                    style = {{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <LinearGradient colors={['#3abed3', '#3abed3', '#36a8aa', '#36a8aa']} style = {{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 14,
                        width: 150,
                        borderRadius: 25
                    }}>
                        <Text style = {{color: '#fff'}}>Apply Leave</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    <View style = {{
                        flex: 1
                    }}>
                          <TouchableOpacity 
                          onPress= {()=>Actions.leavelist()}
                          style = {{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <LinearGradient colors={['#3abed3', '#3abed3', '#36a8aa', '#36a8aa']} style = {{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 14,
                        width: 150,
                        borderRadius: 25
                    }}>
                        <Text style = {{color: '#fff'}}>Leave List</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}


export default UserDashboard;


