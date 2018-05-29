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
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { TextField } from 'react-native-material-textfield';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from '../../src/firebaseConfig'
import {Actions} from 'react-native-router-flux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from "react-native-modal";
let resultArray = [];

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            name:'',
            members:'',
            date:'',
            isDateTimePickerVisible: false,
            isDateTimePickerVisible1: false,
            startdate:'',
            enddate:'',
            modal:false,
            selected:'',
            selectedName:'',
            projectList:[],

        }
    }
    componentDidMount()
    {
        firebase.database().ref('userlist').on('value',(projectData)=>{
            Object.keys(projectData.val()).filter(function(key) {
                console.log(projectData.val()[key]);
             if(projectData.val()[key].Designation==='Manager')
             {
                 resultArray.push(projectData.val()[key]);
             }
            });
            console.log('result',resultArray);
            this.setState({projectList:resultArray});
       });
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            startdate:date
        });
        this._hideDateTimePicker();
    };
    _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

    _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

    _handleDatePicked1 = (date) => {
        console.log('Date',new Date(date).getTime());
        this.setState({
            enddate:date
        });
        this._hideDateTimePicker1();
    };
    _showDateTimePickerModal()
    {
       this.setState({
            modal:true
        })
    }
    addProject()
    {
        let data = firebase.database().ref().child('project').push();
        data.set({
            'p_name':this.state.name,
            'p_total_member':parseInt(this.state.members,10),
            'p_startDate':new Date(this.state.startdate).getTime(),
            'p_endDate':new Date(this.state.enddate).getTime(),
            'p_id':data.key,
            'p_member_left':parseInt(this.state.members, 10),
            'p_member_included':0
        });
        this.setState({
            name:"",
            members:'',
            startdate:'',
            enddate:''
        });

        Actions.pop();

    }
    _showDateTimePicker2()
    {

    }
    render() {

        return (
            <View style={{flex:1,padding:10}}>
                <View style={{flex:1,backgroundColor:'#fff',padding:20,position:'relative'}}>
                    <TextField
                        label='Project Name'
                        value={this.state.name}
                        onChangeText={ (name) => this.setState({ name:name,validationText:'' }) }
                    />
                    <TextField
                        label='Team Required'
                        value={this.state.members}
                        onChangeText={ (members) => this.setState({ members:members,validationText:'' }) }
                    />

                    <TextField
                        label="Start Date"
                        value={this.state.startdate.toString().substring(4,15)}
                        onFocus={this._showDateTimePicker.bind(this)}
                    />
                    <TextField
                        label="End Date"
                        value={this.state.enddate.toString().substring(4,15)}
                        onFocus={this._showDateTimePicker1.bind(this)}
                    />

                    <TextField
                        label='Select Manager'
                        value={this.state.selectedName}
                        onFocus={this._showDateTimePickerModal.bind(this)}
                    />
                   <TouchableOpacity onPress={this.addProject.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30}}>
                        <Text style={{color:'#fff'}}>ADD</Text>
                    </TouchableOpacity>
               </View>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible1}
                    onConfirm={this._handleDatePicked1}
                    onCancel={this._hideDateTimePicker1}
                   />
                <Modal isVisible={this.state.modal}>
                    <ScrollView contentContainerStyle={{padding:10}}>
                        <View style={{backgroundColor:'#fff',borderRadius:4}}>
                        <View style={{justifyContent:'center',alignItems:'flex-end',maxHeight:30}}>
                            <TouchableOpacity onPress={()=>this.setState({modal:false})}><Entypo name="cross" size={20}/></TouchableOpacity>
                        </View>
                        {this.state.projectList.map((item,index)=>{
                            return(
                                <TouchableOpacity key={index} onPress={()=>this.setState({selected:item.keydata,selectedName:item.username,modal:false})} style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1}}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        padding: 10
                                    }}>
                                        {this.state.selected!==item.keydata?<Ionicons name="md-radio-button-off" size={15} color="orange"/>:<Ionicons name="md-radio-button-on" size={15} color="orange"/>}
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <Text>{item.username}</Text>
                                    </View>
                                </TouchableOpacity>)})
                        }
                        </View>
                    </ScrollView>

                </Modal>
          </View>
        );
    }
}
export default AddProject;


