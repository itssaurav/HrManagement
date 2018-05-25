import React from 'react'
import {
    Text,
    View,
    Image,
    Dimensions, AsyncStorage,
    Platform, NetInfo,
    TouchableOpacity,

} from 'react-native';
import {Actions,Animations} from 'react-native-router-flux';
const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');


class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            online: true
        }
    }
    componentWillUnmount()
    {
        clearTimeout();
    }
    componentDidMount()
    {
       let flag = '';
        AsyncStorage.getItem('username').then((value)=>{
            flag = value
        });

        setTimeout(()=>{
            if(flag)
            {
                Actions.adminHome();
            }
            else
            {
                Actions.home();
            }
        },2000);


    }
    render() {
        return (
             <View style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems:'center'
                }}>
                    <Image source={require('../assets/appiness-logo.png')}/>
             </View>
         )
    }
}


export default Splash;
