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
//////////////////////////////////////////////////////////////
  this.postLinks = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/links',
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
      url: 'http://localhost:3000/links'
    }).then(function(response){
        console.log("links retrieved: ",response.data);
        controller.allLinks=response.data;
    }).catch(error=>console.log(error));
  };

  this.updateLinks = function(){
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/links/' + this.thelink.id,
      data:{
        link:{
          url:controller.linkName,
          media_type:controller.linkMediaType,
          genre:controller.linkGenre
        }
      }
    }).then(function(response){
        console.log("link posted: ",response.data);
    }).catch(error=>console.log(error));
  };

  this.deleteTask = function(){
  console.log("delete this? ",this.theRequesterTask);
    $http({
      method: 'DELETE',
      url: 'https://elderhelperappapi.herokuapp.com/tasks/' + this.thelink.id,
    }).then(function(response){
      console.log(response);

    }, function(error){
      console.log('error');
    });
};
//////////////////////////////////////////////////////////////////////////
////////////////: END LINK CRUD




}]); //end rtController
