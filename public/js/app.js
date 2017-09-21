const app = angular.module("AppJS",[]);

app.controller("appjsController", ['$http', function($http){
  const controller = this;
  this.test="test good";
  this.pageShowing='includes/dynamic_createMedia.html';
  this.theLinkSelected={};

  this.linkSelected=function(theLink){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_updateLink.html';
    console.log("theLink: ",theLink);
    this.theLinkSelected=theLink;
  };
  /////////////////////////////////////////////////////////////
  ///////////////USER CRUD:
//////////////////////////////////////////////////////////////
  this.postUsers = function(){
    $http({
      method: 'POST',
      url: 'http://flowtracker-backend/users',
      data:{
        user:{
          username:controller.user_username,
          email:controller.user_email
        }
      }
    }).then(function(response){
      console.log("user posted: ",response.data);
    }).catch(error=>console.log(error));
  };

    this.getUsers = function(){
      $http({
        method: 'GET',
        url: 'http://flowtracker-backend/users'
      }).then(function(response){
          console.log("users retrieved: ",response.data);
          controller.allusers=response.data;
      }).catch(error=>console.log(error));
    };

    this.updateUsers = function(){
      $http({
        method: 'PUT',
        url: 'http://flowtracker-backend/links/' + this.theuser.id,
        data:{
          user:{
            username:controller.user_username,
            email:controller.user_email
          }
        }
      }).then(function(response){
          console.log("user updated: ",response.data);
      }).catch(error=>console.log(error));
    };

    this.deleteUser = function(){
    console.log("delete this? ",this.theRequesterUser);
      $http({
        method: 'DELETE',
        url: 'http://flowtracker-backend/users/' + this.theuser.id,
      }).then(function(response){
        console.log(response);

      }, function(error){
        console.log('error');
      });
  };
  //////////////////////////////////////////////////////////////////////////
  ////////////////: END USER CRUD

  /////////////////////////////////////////////////////
  ///////////////LINK CRUD:
//////////////////////////////////////////////////////////////
  this.postLinks = function(){
    $http({
      method: 'POST',
      url: 'http://flowtracker-backend/links',
      data:{
        link:{
          url:controller.link_url,
          media_type:controller.link_artist,
          genre:controller.link_genre
        }
      }
    }).then(function(response){
        console.log("link posted: ",response.data);
    }).catch(error=>console.log(error));
  };

  this.getLinks = function(){
    $http({
      method: 'GET',
      url: 'http://flowtracker-backend/links'
    }).then(function(response){
        console.log("links retrieved: ",response.data);
        controller.allLinks=response.data;
    }).catch(error=>console.log(error));
  };

  this.updateLinks = function(){
    $http({
      method: 'PUT',
      url: 'http://flowtracker-backend/links/' + this.thelink.id,
      data:{
        link:{
          url:controller.linkName,
          media_type:controller.linkMediaType,
          genre:controller.linkGenre
        }
      }
    }).then(function(response){
        console.log("link updated: ",response.data);
    }).catch(error=>console.log(error));
  };

  this.deleteTask = function(){
  console.log("delete this? ",this.thelink);
    $http({
      method: 'DELETE',
      url: 'http://flowtracker-backend/links/' + this.thelink.id,
    }).then(function(response){
      console.log(response);

    }, function(error){
      console.log('error');
    });
};
//////////////////////////////////////////////////////////////////////////
////////////////: END LINK CRUD




}]); //end rtController
