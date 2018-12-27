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
            
            console.log(res.data);
            callback(res.data);

        }).catch( (error) => {
            console.log("the following error has occured:" + error);
        });
    }
    getBlog(id){

    }
    addAdvert(data){
        let url = config.api_add_advert

        axios.post(url, data)
        .then(res => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
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

