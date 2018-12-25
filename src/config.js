class config  {
    
    static api_host = 'http://localhost:8080';
    static api_path = '/api/v1.0';
    static api_add_user = config.api_host + config.api_path + '/users'
    static api_login = config.api_host + config.api_path + '/login'
    static api_get_adverts = config.api_host + config.api_path + '/adverts'
    static api_add_advert = config.api_host + config.api_path + '/adverts'
}

export default config;