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
    ToastAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from '../../src/firebaseConfig'
import {Actions} from 'react-native-router-flux'
import DateTimePicker from 'react-native-modal-datetime-picker';


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
            enddate:''

        }

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

          </View>
        );
    }
}
export default AddProject;


