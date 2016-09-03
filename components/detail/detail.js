
app.controller('DetailController', ['$scope', '$stateParams', DetailController]);


function DetailController($scope, $stateParams) {
    console.log($stateParams);
    // console.log($scope);
    $scope.$emit('emitEvent', { source: 'DetailController' });
    //this.id = $routeParams.id;
}