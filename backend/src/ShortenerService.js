const { v4: uuidv4 } = require('uuid');
var Shortener = require('./impl/Shortener');
const helpers = require('./impl/Helpers');

var ShortenerService = {
    shortenUrl: (url) => {
        if(!url) {
            return {
                isSuccessful: false,
                message: 'Url not supplied'
            };
        }

        if(!helpers.validateUrl(url)){
            return {
                isSuccessful: false,
                message: 'Invalid url'
            };
        }

        let uid = uuidv4();
        if(!uid){
            return {
                isSuccessful: false,
                message: 'An error occurred. Failed to generate a shortened url'
            };
        }

        uid = helpers.replaceAll(uid, '-', '');

        let sub = uid.substr(0, 4);

        let obj = {
            shortId: sub,
            original: url
        };

        Shortener.add(obj);
        return {
            isSuccessful: true,
            shortId: sub,
            message: 'Action successful'
        };
    },
    getUrl: (shortId) => {
        if(!shortId) {            
            return {
                isSuccessful: false,
                message: 'Short id is not supplied'
            };
        }

        let short = Shortener.get(shortId);
        if(short){
            return {
                isSuccessful: true,
                message: 'Url retrieved successfully',
                url: short.original
            };
        }
        
        return {
            isSuccessful: false,
            message: 'Url with id does not exist'
        };
    },
    remove: (shortId) => {
        if(!shortId) {            
            return {
                isSuccessful: false,
                message: 'Short id is not supplied'
            };
        }

        let result = Shortener.remove(shortId);
        if(result) {
            return {
                isSuccessful: true,
                message: 'Url deleted successfully'
            };
        }

        return {
            isSuccessful: false,
            message: 'Url with given id does not exist',
        };
    },
    getAll: () => {
        let list = Shortener.getAll();

        return {
            isSuccessful: true,
            message: 'All retrieved',
            result: list
        };
    }
};

module.exports = ShortenerService;