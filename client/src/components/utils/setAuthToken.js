import axios from 'axios'

const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['access-token'] = token
    }else{
        delete axios.defaults.headers.common['access-token']
    }
}

export default setAuthToken