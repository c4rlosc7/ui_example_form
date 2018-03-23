
const TRANSLATE_ES = "es";
const TRANSLATE_EN = "en";

var translateMod = angular.module('jtt.translate.i18n', []);
	
translateMod.service('jttTranslateSrv', function($http){

    /* Default language when is not locale is not available */
    this.defaultLanguage = TRANSLATE_EN;
    this.defaultNotificationDictionary = notificationLangDictionary_EN;
    this.defaultDictionary = viewTagsDictionary_EN;

    //Gets a notification message
    this.getNotificationMessage = function(key){
        var dictionary = undefined;

        if(this.getLocaleLanguage().substring(0,2) == TRANSLATE_ES){
            dictionary = notificationLangDictionary_ES;
        }else{
            dictionary = this.defaultNotificationDictionary;
        }
        return this.getMessage(dictionary, key);
    }

    //Gets a view label
    this.getViewLabel = function(key){
        var dictionary = undefined;
        if(this.getLocaleLanguage().substring(0,2) == TRANSLATE_ES){
            dictionary = viewTagsDictionary_ES;
        }else{
            dictionary = this.defaultDictionary;
        }
        return this.getMessage(dictionary, key);
    }

    //Gets a string message from a dictionary with the key
    this.getMessage = function(dictionary, key){
        var message = 'Can not find string message';
        try {
            if(dictionary != undefined && dictionary != null){
                message = dictionary[key];
            }
        } catch (e) {
            message = 'Error, Can not find string message';
        }
        return message;
    }

    // Gets the locale language
    this.getLocaleLanguage = function(){
    	return this.locale;
    }
    
    // Sets locale language
    this.setLocaleLanguage = function(locale){
        try {
            this.locale = navigator.language || navigator.userLanguage;

            if(this.locale == undefined){
                this.locale = this.defaultLanguage;
            }
        } catch (e) {
            this.locale = this.defaultLanguage;
        }
    }

    this.setLocaleLanguage();
});

translateMod.filter('translate',  function(jttTranslateSrv){
    var locale = jttTranslateSrv.getLocaleLanguage();
    var dictionary = undefined;

    if(locale.substring(0,2) == TRANSLATE_EN){
        dictionary = viewTagsDictionary_EN;

    }else{
        dictionary = viewTagsDictionary_ES;
    }
    
    return function(key){
        return jttTranslateSrv.getMessage(dictionary, key);
    };
});
