const app = angular.module("AppJS",[]);

app.controller("appjsController", ['$http', function($http){
  const controller = this;
  this.test="test good";
  this.pageShowing='includes/dynamic_createMedia.html';


}]); //end rtController
