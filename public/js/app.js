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
  this.pageShowing='';
  this.theLinkSelected={};
  this.theUserSelected={};
  this.userPass={};
  this.userReg={};
  this.loggedIn=false;
  this.showRegisterForm=false;

  this.toggleCreateLinkForm=function(){
    if(controller.pageShowing!='includes/dynamic_createLink.html'){
      controller.pageShowing='includes/dynamic_createLink.html'
    }else{
      controller.pageShowing='';
    }
    console.log("pageShowing: ",controller.pageShowing);
  };

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
     console.log("controller.user: ",controller.user);
      console.log("USERNAME: ",controller.user.username);
     localStorage.setItem('token', JSON.stringify(response.data.token));
     console.log(JSON.parse(localStorage.getItem('token')));
     controller.loggedIn=true;
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
    self.user=userReg.username; //I think I copied this from instructions but I don't get the purpose of this line
    controller.login(userReg);
  }), function(error){console.log("ERROR: ",error); }
};
//////////////////////////////////////////////////////////////////////////
////////////////: END AUTHENTICATION

  /////////////////////////////////////////////////////////////
  ///////////////Rest of USER CRUD:
//////////////////////////////////////////////////////////////
    this.logout=function(){
      localStorage.clear('token');
      location.reload();
      controller.loggedIn=false;
    }
    this.getUsers = function(){
      controller.pageShowing='includes/dynamic_showAllUsers.html';
      $http({
        method: 'GET',
        url: 'https://flowtracker-backend.herokuapp.com/users',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response){
          console.log("users retrieved: ",response.data);
          controller.allUsers=response.data;
          if (response.data.status == 401) {
            this.error = "Unauthorized";
          } else {
            this.users = response.data;
          }
      }.bind(this), function(error){
        console.log('error');
      });
    };

    this.updateUser = function(){
      console.log("username: ",controller.user.username);
      console.log("email: ",controller.user.email);
      console.log("id: ", controller.user.id);

      $http({
        method: 'PUT',
        url: 'https://flowtracker-backend.herokuapp.com/users/' + controller.user.id,
        data:{
          user:{
            username:controller.user.username,
            email:controller.user.email
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
        url: 'https://flowtracker-backend.herokuapp.com/users/' + controller.user.id,  
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
    controller.pageShowing='includes/dynamic_listOfLinks.html'
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
