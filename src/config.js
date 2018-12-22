//this config file will contain all the data that we need to configure our app
//such as the urls of the api server
class config  {
    
    static api_host = 'http://localhost:8080';
    static api_path = '/api/v1.0';
    static api_add_user = config.api_host + config.api_path + '/users'
    static api_login = config.api_host + config.api_path + '/login'
    static api_get_blogs = config.api_host + config.api_path + '/blogs';

}

export default config;