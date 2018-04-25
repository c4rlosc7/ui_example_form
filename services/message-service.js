(function(){  
  var app = angular.module('message-service', ['mocks.util']);        
  
  /* Init service to message */
  app.service('srvMessage', function($http,utilMockFactory){

    /* Get to message list */
  	this.getMessageList = function(){
      try{
        if(USE_MOCKS_DATASOURCE){
          console.log(messageList)
          return utilMockFactory.objectToPromise(messageList);
        } 
      } 
      catch(err){
        console.log(err);
        return utilMockFactory.objectToPromiseError("Ha ocurrido un error.");
      }
  	}

    /* Init to add new message using mocks */
    this.saveMessage = function(data){
      try{
         if(USE_MOCKS_DATASOURCE){
            messageList.push(validatedData(data));            
            return utilMockFactory.objectToPromise(null);
          }else{
            /* API */ 
          }
      }
      catch(err){
        console.log(err);
        return utilMockFactory.objectToPromiseError("Ha ocurrido un error.");
      }
    }

    /* Update to message object */
    this.updatedMessage = function(data){ 
      //data = undefined;
      try {
        if(USE_MOCKS_DATASOURCE){
          var index = findIndex(data.id, messageList);
          if (index != -1) {
            messageList[index].descripcion = data.descripcion;
            return utilMockFactory.objectToPromise(null);
          }else{
            return utilMockFactory.objectToPromiseError("No se encuentra el objeto a actualizar.");
          }
        }else{
          /*******/
          /* API */
          /*******/
        }
      }
      catch(err) {
        console.log(err);
        return utilMockFactory.objectToPromiseError("Ha ocurrido un error.");
      }      
    };

    /* Delete to message object */
    this.deleteMessage = function(data){
      try {
        if(USE_MOCKS_DATASOURCE){        
          messageList.splice(findIndex(data, messageList),1);
          return utilMockFactory.objectToPromise(null);
        }else{
          /*******/
          /* API */
          /*******/
        }
      }
      catch(err){
        console.log(err);
        return utilMockFactory.objectToPromiseError("Ha ocurrido un error.");
      }
    }    

  });

})(); 
