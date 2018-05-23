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
    Image,
    YellowBox
} from 'react-native';
import {Bars} from 'react-native-loader'
import {Actions} from 'react-native-router-flux'
import firebase from '../../src/firebaseConfig'

class AdminProject extends Component {
    constructor(props) {
        YellowBox.ignoreWarnings(

            ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'

            ]);
        super(props);
        this.state = {
            seconds: 0,
            username:'',
            password:'',
            projectList:''
        }
        // this.userSignup = this.userSignup.bind(this)
    }
    componentWillMount()
    {
        let resultArray = [];
        firebase.database().ref('project').on('value',(projectData)=>{
            resultArray= Object.keys(projectData.val()).map(function(key) {
                   return projectData.val()[key]
                });
         this.setState({projectList:resultArray});
        });
    }

    render() {
        // console.ignoredYellowBox = [
        //     'Setting a timer'
        // ]
        return (
            <View style={{flex:1,padding:10}}>
                <View style={{flex:1,backgroundColor:'#fff',padding:5,position:'relative'}}>
                    <TouchableOpacity onPress={()=>Actions.addproject()} style={{flex:1,justifyContent:'center',alignItems:'center',maxHeight:'8%',backgroundColor:'#6164c1',borderRadius:4}}>
                        <Text style={{color:'#fff'}}>ADD PROJECT</Text>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        {this.state.projectList!==''?<FlatList
                            data={this.state.projectList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <View style={{flex:1,marginTop:20,borderWidth:1,borderColor:'#6164c1',borderRadius:4,padding:4,backgroundColor:'#cecece'}}>
                                    <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:5}}>
                                       <Text style={{fontSize:16}}>{item.p_name.toUpperCase()}</Text>
                                    </View>
                                    <View style={{flex:0.5,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                            <Image source={require('../assets/project.jpg')} style={{width:70,height:70}}/>
                                        </View>
                                    <View style={{flex:3,justifyContent:'flex-start',alignItems:'flex-start',paddingLeft:10}}>
                                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                           <Text> Start Date : {item.p_startDate}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text> End Date : {item.p_endDate}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text> Team Member Req : {item.p_total_member}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text> Included Members : {item.p_member_included}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text> Members Left : {item.p_member_left}</Text>
                                        </View>
                                    </View>

                                    </View>
                                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',padding:10,backgroundColor:'#6164c1',marginTop:10}} onPress={()=>{Actions.userListing({'p_id':item.p_id,'p_name':item.p_name})}}>
                                        <Text style={{color:'#fff'}}>Add Members</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                        />:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Bars size={10} color="#FDAAFF" /></View>}

                    </View>

                </View>
          </View>
        );
    }
}
export default AdminProject;


