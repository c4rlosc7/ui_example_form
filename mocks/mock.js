(function () {
    'use strict'; 

    angular.module('mocks.util', [])
        .factory('utilMockFactory', function ($q) {

    	    var methods = {}; 

		    /** Transform a object to angular promise */
    	    methods.objectToPromise = function (object) {
    	    	var deferred = $q.defer();
    	    	var result = {};
                result.data   = {
    	    		'successful': true,
    	    		'exception': null,
    	    		'payload': object,
                    'message':''
    	    	};
    	    	deferred.resolve(result);
    		    return deferred.promise;
    	    };

            /** Transform a object to angular promise with error*/
            methods.objectToPromiseError = function (errorMessage) {
                var deferred = $q.defer();
                var result = {};
                result.data   = {
                    'successful': false,
                    'exception': null,
                    'payload': null,
                    'message': errorMessage
                };
                deferred.resolve(result);
                return deferred.promise;
            };
            return methods;
            
    });

})();
