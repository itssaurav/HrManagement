const key='TF6FsEdbA4du73YzlKLbAO0cvJ23';
export function getCricInfo() {
    console.log( 'http://cricapi.com/api/matches/');
    return dispatch => fetch('http://cricapi.com/api/matches/', {
        headers: {
            'apikey': "TF6FsEdbA4du73YzlKLbAO0cvJ23",
         }
    }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        console.log('responseJsonproductList', responseJson.data);
        dispatch({
            payload:responseJson.matches,
            type: 'GET_CRIC_INFO'
        });
    },(error)=>{
        console.log(error);
    })
        .catch((error) => {
            console.error(error);
        });

}