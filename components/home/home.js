app.controller('HomeController', ['$scope', function ($scope) {
  this.name = 'Friend';
  $scope.$on('emitEvent', function (event,obj) {
    console.log(obj);
  });
}]);