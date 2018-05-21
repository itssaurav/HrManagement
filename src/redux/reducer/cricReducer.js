let auth = {
    cricfixers:'',
};
const homeReducer = (state = auth, action) => {
    switch (action.type) {
        case "GET_CRIC_INFO":
            state = {
                ...state,
                cricfixers: action.payload
            };
            break;

        default:
    }
    return state;
};

export default homeReducer;