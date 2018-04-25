/*
  authot: carlos andres martinez
  email: c4rlosc7@gmail.com
*/

(function(){ 
  var app = angular.module('app', ['message-service',
                                   'jtt.translate.i18n', 
                                   'ngMessages']);

  /* directive to use tooltip ng-repeat */
  app.directive('tooltip', function(){
      return {
          restrict: 'A',
          link: function(scope, element, attrs){
              $(element).hover(function(){
                  // on mouseenter
                  $(element).tooltip('show');
              }, function(){
                  // on mouseleave
                  $(element).tooltip('hide'); 
              });
          }
      }; 
  });  


  /* Init Controller */  
  app.controller('Ctrl', function($scope,
                                  $http,
                                  srvMessage,
                                  jttTranslateSrv){
    var idMessage = null;
    $scope.messageList = [];

    /* Load file */
    angular.element(document).ready(function(){
      $scope.loadMessageList(); 
    });
    
    /* Init to add new message */
    $scope.addMessage = function(){  
      idMessage = null;
      $scope.message = "";
      $scope.state = true;
    };

    /* Cancel add message */
    $scope.cancelMessage = function(){   
      $scope.state = false;
    };
 
    /* Load message list using mocks */
    $scope.loadMessageList = function(){
      try{
        srvMessage.getMessageList().then(function(result){ 
            if (result.data.successful) {
                if (result.data.payload) {
                    $scope.messageList = result.data.payload;
                };
            };
        }, function(error){
            debugFactory.error(error);
        });
      }
      catch(error){
        console.log(error);
      }
    };

    /* Generated object to message */
    var validateObject = function(index,data){
      return {
        'id': index,
        'message' : data
      }
    };

    /* Init to edit object message by id */
    $scope.initUpdated = function(itemMessage){
      $scope.state = true;
      $scope.message = itemMessage.message;
      idMessage = itemMessage.id;        
    };

    /* Save message */
    $scope.saveMessage = function(){        
      try{
        if(idMessage == null){
          srvMessage.saveMessage($scope.message) 
            .then(function(result){
              if(result.data.successful){
              }
            });
          $scope.message = ""; 
        }else{ 
          srvMessage.updatedMessage(validateObject(idMessage,$scope.message)) 
            .then(function(result){
              if(result.data.successful){ 
              }
          });  
          idMessage = null;
          $scope.message = ""; 
        }
      }catch(error){
        console.log(error);
      }
      $scope.loadMessageList();  
      $scope.state = false;
    };

    /* Show modal to confirm delete */
    $scope.modalShowConfirmDelete = function(message){
        $("#idModalConfirmDelete").modal();
        $scope.message = message;
    };

    /* Hide modal confirm delete */
    $scope.modalHideConfirmDelete = function(){
      $("#idModalConfirmDelete").modal("hide");
    };

    /* Delete objet message */
    $scope.deleteMessage = function(id){ 
      try{
        srvMessage.deleteMessage(id)
        .then(function(result){
          if(result.data.successful){  
            $scope.modalHideConfirmDelete();
          }
        });  
      }catch(error){
        console.log(error);
      }   
    };

  });

})(); 
