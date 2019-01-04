import axios from 'axios';
import config from './config';

//this class will have all the methods that we need to connect to the API
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

    logout(data){

    }
    addUser(data){
        let url = config.api_add_user

        return axios.post(url, {
            email: data.email,
            password: data.password
        })
    }
    getUser(data){

    }
    getUsers(data){

    }
    updateUser(data){

    }
    deleteUser(data){

    }
    getAdverts(pageLength, pageNumber, callback){
        
        let url = config.api_get_adverts;
        return axios.get(url,{ 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json'        
            }
        }).then(res => {
            callback(res.data);
        }).catch( (error) => {
            console.log("the following error has occured:" + error);
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
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json'        
            }

        }
        )
      
    }

    getBlog(id){

    }
    addAdvert(data){
        let url = config.api_add_advert

        return axios.post(url, data)
    }
    sendMessage(data){
        let url = config.api_send_message

        axios.post(url, data)
        .then(res => {
            console.log(res);
        }).catch( (error) => {
            console.log("the following error has occured:" + error);
        });
    }
    updateBlog(data){

    }
    deleteBlog(data){

    }
    addFavourite(data){

    }
    deleteFavourite(data){

    }
    getFavourites(data){
        
    }
    
}

export default CallAPI;

