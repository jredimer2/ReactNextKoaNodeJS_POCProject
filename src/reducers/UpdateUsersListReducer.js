import config from 'config'
import { getToken } from 'getToken'
import axios from 'axios'


export default async function (state=null, action) {

    switch (action.type) {
        case 'UPDATE-USERS-LIST' :
            const token = getToken(null)
            const responseUsers = await axios.get(`${config.dbrootport}/users?merch_id=${config.merch_id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken(null)}`
                }
            }
            )

            return responseUsers.data 
            break;
    }
    return state
}