export default function (state=null, action) {

    switch (action.type) {
        case 'TEST-BUTTON-CLICKED' :
            console.log('}}}}} }}}}} }}}}} LoadReducer :  TEST-BUTTON-CLICKED action.payload = ', action.payload)
            return action.payload
            break;
    }
    return state
}