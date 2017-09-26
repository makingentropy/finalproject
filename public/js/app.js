const app = angular.module("AppJS",[]);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});

app.controller("appjsController", ['$http', function($http){
  const controller = this;
  this.test="test good";
  this.pageShowing='includes/dynamic_createMedia.html';
  this.theLinkSelected={};
  this.theUserSelected={};
  this.userPass={};
  this.userReg={};
  this.loggedIn=false;
  this.showRegisterForm=false;


  this.userSelected=function(theUser){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_updateUser.html';
    console.log("theUser: ",theUser);
    this.theUserSelected=theUser;
  };
  this.linkSelected=function(theLink){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_updateLink.html';
    console.log("theLink: ",theLink);
    this.theLinkSelected=theLink;
  };
  /////////////////////////////////////////////////////////////
  ///////////////AUTHENTICATION:
//////////////////////////////////////////////////////////////
this.user = {};

this.login=function(userPass){
  console.log("in login function");
  console.log("userPass: ",userPass);
  $http({
     method: 'POST',
     url: 'https://flowtracker-backend.herokuapp.com/users/login',
      // url: 'http://localhost:3000/users/login',
     data: {
       user: {
         username: userPass.username,
         password: userPass.password
       }
     }
   }).then(function(response) {
     console.log(response);
     controller.user=response.data.user;
     console.log("USERNAME: ",controller.user.username);
   }.bind(this));
}
this.registration=function(userReg){
  console.log("userReg: ",userReg);
  $http({
    method: 'POST',
    url: 'https://flowtracker-backend.herokuapp.com/users',
    data:{
      user:{
        // name:controller.elderName,
        email:controller.elderEmail,
        username:userReg.username,
        password:userReg.password
      }
    }
  }).then(function(response){
    console.log("Account created");
    console.log(response.data);
    controller.loggedIn=true;
    self.user=userReg.username;
  }), function(error){console.log("ERROR: ",error); }
};
//////////////////////////////////////////////////////////////////////////
////////////////: END AUTHENTICATION

  /////////////////////////////////////////////////////////////
  ///////////////USER CRUD:
//////////////////////////////////////////////////////////////
  // this.postUsers = function(){
  //   $http({
  //     method: 'POST',
  //     url: 'http://flowtracker-backend.herokuapp.com/users',
  //     data:{
  //       user:{
  //         username:controller.user_username,
  //         email:controller.user_email
  //       }
  //     }
  //   }).then(function(response){
  //     console.log("user posted: ",response.data);
  //   }).catch(error=>console.log(error));
  // };

    this.getUsers = function(){
      $http({
        method: 'GET',
        url: 'https://flowtracker-backend.herokuapp.com/users'
      }).then(function(response){
          console.log("users retrieved: ",response.data);
          controller.allUsers=response.data;
      }).catch(error=>console.log(error));
    };

    this.updateUser = function(){
      console.log("userName: ",controller.userName);
      console.log("userEmail: ",controller.userEmail);

      $http({
        method: 'PUT',
        url: 'https://flowtracker-backend.herokuapp.com/users/' + this.theUserSelected.id,
        data:{
          user:{
            username:controller.userName,
            email:controller.userEmail
          }
        }
      }).then(function(response){
          console.log("user updated: ",response.data);
          controller.ReadOneSubShowing="0";
          controller.pageShowing='includes/dynamic_getAllUsers.html';
      }).catch(error=>console.log(error));
    };

    this.deleteUser = function(){
    console.log("delete this? ",this.theUserSelected);
      $http({
        method: 'DELETE',
        url: 'https://flowtracker-backend.herokuapp.com/users/' + this.theUserSelected.id,
      }).then(function(response){
        console.log(response);
        controller.ReadOneSubShowing="0";
        controller.pageShowing='includes/dynamic_getAllUsers.html';
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
      url: 'https://flowtracker-backend.herokuapp.com/links',
      data:{
        link:{
          url:controller.link_url,
          media_type:controller.link_type,
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
      url: 'https://flowtracker-backend.herokuapp.com/links'
    }).then(function(response){
        console.log("links retrieved: ",response.data);
        controller.allLinks=response.data;
    }).catch(error=>console.log(error));
  };

  this.updateLink = function(){
    $http({
      method: 'PUT',
      url: 'https://flowtracker-backend.herokuapp.com/links/' + this.theLinkSelected.id,
      data:{
        link:{
          url:controller.linkName,
          media_type:controller.linkMediaType,
          genre:controller.linkGenre
        }
      }
    }).then(function(response){
        console.log("link updated: ",response.data);
        controller.ReadOneSubShowing="0";
        controller.pageShowing='includes/dynamic_getAllLinks.html'
    }).catch(error=>console.log(error));
  };

  this.deleteLink = function(){
  console.log("delete this? ",this.theLinkSelected);
    $http({
      method: 'DELETE',
      url: 'https://flowtracker-backend.herokuapp.com/links/' + this.theLinkSelected.id,
    }).then(function(response){
      console.log("response: ",response);
      controller.ReadOneSubShowing="0";
      controller.pageShowing='includes/dynamic_getAllLinks.html';
    }, function(error){
      console.log('error');
    });
};
//////////////////////////////////////////////////////////////////////////
////////////////: END LINK CRUD




}]); //end rtController
