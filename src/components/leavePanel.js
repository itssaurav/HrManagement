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
    AsyncStorage,
    ToastAndroid,
    FlatList
} from 'react-native';
import moment from 'moment';
import firebase from "../firebaseConfig";

class LeavePanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            userListing:[]
        }
        this.approveLeave=this.approveLeave.bind(this);
        this.disApproveLeave=this.disApproveLeave.bind(this);
    }
    componentDidMount()
    {
        console.log('Leave Panel',this.props.keyItem);
        let userListing=[];
        firebase.database().ref('userlist/' + this.props.keyItem + '/leave').on('value',(projectData)=>{
            console.log('I m Not ready',projectData.val());
            userListing = Object.keys(projectData.val()).map(key=> {
                return projectData.val()[key]
            });
            this.setState({
                userListing:userListing
            })
       });


    }
    approve(data,key)
    {
       console.log('i m data',key);
        firebase.database().ref('userlist/' + this.props.keyItem + '/leave/' + key).update({
            'status':data
        }, function (error) {
            if (error) {
                // The write failed...
            } else {
                // Data saved successfully!
            }
        });
    }
    approveLeave(key)
    {
        console.log('i m data');
        this.approve('Approved',key);
    }
    disApproveLeave(key)
    {
        console.log('i m data');
        this.approve('Pending',key);
    }
  render() {
        console.log('Data in the house',this.state.userListing);
        return (

            <View style={{flex:1,padding:10}}>
                <FlatList
                    data={this.state.userListing}
                    renderItem={({item}) =>
                         <View key={item} style={{flex: 1, backgroundColor:'#fff', padding: 20,elevation:3,marginBottom:10}}>
                             <View style={{position:'absolute',right:'5%',top:'10%'}}>
                                 {<Text style={{color:item.status==='Pending'?'red':'green'}}>{item.status}</Text>}
                             </View>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{flex:1}}>
                                        <Text>Subject </Text>
                                        <Text>Reason   </Text>
                                        <Text>From  </Text>
                                        <Text>To  </Text>
                                    </View>

                                    <View style={{flex:3}}>
                                        <Text>{item.subject}</Text>
                                        <Text>{item.message}</Text>
                                        <Text>{moment(item.fromdate).format("DD/MM/YYYY")}</Text>
                                        <Text>{moment(item.fromdateto).format("DD/MM/YYYY")}</Text>
                                    </View>

                                </View>
                                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                    <TouchableOpacity onPress={()=>{item.status==='Pending'?this.approveLeave(item.keyvalue):this.disApproveLeave(item.keyvalue)}} style={{padding:4,backgroundColor:'#6164c1',borderRadius:4}}>
                                        <Text style={{color:'#fff'}}>{item.status==='Pending'?'Approve':'Disapprove'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                     }
                />
           </View>
        );
    }
}
export default LeavePanel;


