angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $scope.person = {
      first_name: 'Stephen',
      last_name: 'Fiser',
      projects: [
        {title: "General Tasks", tasks: [
          {title: 'Take out the trash', difficulty: 4}, 
          {title: 'Eat breakfast', difficulty: 1} 
        ]},
        {title: "Other Tasks", tasks: [
          {title: 'Make Toast', difficulty: 2}, 
          {title: 'Go to outer space', difficulty: 10} 
        ]}
      ]
    };

    $scope.addTask = function() {
      console.log($scope.taskInput);
      $scope.person.projects.push({title:$scope.taskInput});
      
      $scope.taskInput = '';
    };



    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });