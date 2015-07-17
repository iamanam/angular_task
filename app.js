tasklist = new Mongo.Collection("tasks");



if (Meteor.isClient) {


angular.module('task',['angular-meteor', 'ui.router']);

 

    angular.module("task").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'client/template/taskView.ng.html',
        controller: 'taskView'
      })
      .state('taskDetails', {
        url: '/tasks/:taskId',
        templateUrl: 'client/template/taskDetails.ng.html',
        controller: 'taskDetails'
      });

      $urlRouterProvider.otherwise("/tasks");
}]);

}