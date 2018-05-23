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
    AsyncStorage
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux'
import firebase from '../firebaseConfig'

class userleave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            message: "",
            isDateTimePickerVisible: false,
            isDateTimePickerVisibleto: false,
            fromdate: '',
            changeddate: '',
            fromdateto: '',
            changeddateto: ''
        }
        this.leaveapply = this.leaveapply.bind(this)
    }  
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    _showDateTimePickerto = () => this.setState({ isDateTimePickerVisibleto: true });
    _hideDateTimePickerto = () => this.setState({ isDateTimePickerVisibleto: false });
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        let mydate = date.getTime()
        // let myDatesplit = mydate.toString().split(" ")
        // console.log("mydate", myDatesplit)
        // console.log("timestamdate",mydate)
        this.setState({
            changeddate: date,
            fromdate: mydate
        })
        this._hideDateTimePicker();
      };
      _handleDatePickedto = (dateto) => {
        console.log('A date has been pickedto: ', dateto);
        let mydateto = dateto.getTime()
        // let myDatesplit = mydate.toString().split(" ")
        // console.log("mydate", myDatesplit)
        console.log("timestamdate",mydateto)
        this.setState({
            changeddateto: dateto,
            fromdateto: mydateto
        })
        this._hideDateTimePickerto();
      };
    leaveapply(){
        console.log(this.props.keyiddata)
        console.log('calleddatata')
        firebase.database().ref().child('userlist').child(this.props.keyiddata).child('leave').push().set({
            subject: this.state.subject,
            message: this.state.message,
            fromdate: this.state.fromdate,
            fromdateto: this.state.fromdateto,
            status: 'pending'
            // todate: 
          });
    }
    render() {
        console.log(this.state.subject)
        console.log(this.state.message)
        console.log(this.props.keyiddata)
        console.log("formdatae", this.state.fromdate)
        console.log("changeddate", this.state.changeddate)
      return (
              <View style={{flex:1,padding:10}}>
                  {this.state.validationText?<Text style={{color:'red',marginBottom:10}}>{this.state.validationText}</Text>:null}
                  <View style={{flex:1,backgroundColor:'#fff',padding:20}}>
                     <TextField
                          label='Subject'
                          value={this.state.subject}
                          onChangeText={ (text) => this.setState({ subject:text}) }
                      />
                      <TextField
                          label='Message'
                          value={this.state.message}
                          onChangeText={ (text) => this.setState({ message:text}) }
                      />
                       <View style={{ flex: 1 }}>
                        {/* <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text>Show DatePicker</Text>
                        </TouchableOpacity> */}
                         <TextField
                          label='From data'
                          value={this.state.changeddate.toString().substr(4, 11)}
                          onFocus = {this._showDateTimePicker}
                      />
                          <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        />
                         <TextField
                          label='to data'
                          value={this.state.changeddateto.toString().substr(4, 11)}
                          onFocus = {this._showDateTimePickerto}
                      />
                          <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisibleto}
                        onConfirm={this._handleDatePickedto}
                        onCancel={this._hideDateTimePickerto}
                        />
                    </View>
                      <TouchableOpacity onPress= {()=>this.leaveapply()} style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue',maxHeight:50,marginTop:30}}>
                          <Text style={{color:'#fff'}}>Apply</Text>
                      </TouchableOpacity>
                  </View>


             </View>
        );
    }
}


export default userleave;


