class config  {
    static cors_proxy_url = 'https://cors-anywhere.herokuapp.com/'
    static api_host = config.cors_proxy_url + 'https://mystuff-api.herokuapp.com';
    static api_path = '/api/v1.0';
    
    static api_add_user = config.api_host + config.api_path + '/users'
    static api_login = config.api_host + config.api_path + '/login'
    static api_get_adverts = config.api_host + config.api_path + '/adverts'
    static api_add_advert = config.api_host + config.api_path + '/adverts'
    static api_del_advert_by_id = config.api_host + config.api_path + '/adverts/'
    static api_send_message = config.api_host + config.api_path + '/messages'
    static api_get_message_by_recipient = config.api_host + config.api_path + '/messages/'
}

export default config;