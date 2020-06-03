import axios from 'axios';
import config from './config';

class CallAPI {

    login(data){
        let url = config.api_login
        const details = data.email + ':' + data.password
        const details64 = Buffer.from(details).toString('base64')

        return axios({
            method: 'post',
            url: url,
            headers: {
                'Authorization': 'Basic ' + details64
            }
        })
    }

    addUser(data){
        let url = config.api_add_user

        return axios.post(url, {
            email: data.email,
            password: data.password
        })
    }

    getAdverts(pageLength, pageNumber, callback){
        
        let url = config.api_get_adverts;
        return axios.get(url,{ 
            headers: {
                'Content-Type' : 'application/json'        
            }
        }).then(res => {
            callback(res.data);
        }).catch( (error) => {
            console.log("the following error has occured:" + error.stack);
        });
    }
    delAdvertById(id){
        let url = config.api_del_advert_by_id + id
        return axios.delete(url)
    }
    getMessagesByRecipient(callback){
        const recipient = localStorage.getItem("MyStuffLogin")
        
        let url = config.api_get_message_by_recipient + recipient

        return axios.get(url,{ 
            headers: {
                'Content-Type' : 'application/json'        
            }

        }
        )
    }

    addAdvert(data){
        let url = config.api_add_advert

        return axios.post(url, data)
    }
    sendMessage(data){
        let url = config.api_send_message

        return axios.post(url, data)
        
    }
    
}

export default CallAPI;

