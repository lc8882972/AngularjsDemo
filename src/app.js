var app = angular.module('app', ['ui.router']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state({
      name: 'home',
      url: "/home",
      templateUrl: "components/home/home.html",
      controller: 'HomeController'
    })
    .state({
      name: 'detail',
      url: "/detail/:id",
      parent: 'home',
      templateUrl: "components/detail/detail.html",
      controller: 'DetailController'
    });
}).run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // event.preventDefault();
    console.log(toState);
    // transitionTo() promise will be rejected with
    // a 'transition prevented' error
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    event.preventDefault();
    // console.log("$stateChangeSuccess");
    // transitionTo() promise will be rejected with
    // a 'transition prevented' error
  });

  $rootScope.$on('$stateNotFound', function (event, toState, toParams, fromState, fromParams) {
    event.preventDefault();
    console.log(toState);
    // transitionTo() promise will be rejected with
    // a 'transition prevented' error
  });

});

// http://www.cnblogs.com/Kavlez/p/4288885.html
/* 自定义指令 */
app.directive("e2eCustom", function () {
  return {
    restrict: 'E',
    scope: {
      name: '@'  // name 值传递 （字符串，单向绑定）   
    },
    template: "<div>" +
    "{{name}}" +
    "<p ng-transclude></p>" +
    "</div>",
    templateNamespace: 'html',
    repalce: true,
    transclude: true,
    controller: function ($scope) {
      console.log($scope);
    },
    link: function (scope, element, attrs) {
      console.log("initial value for name:" + scope.name);
    },
    compile: function (tElement, tAttrs, transclude) {
      return {
        pre: function (scope, iElement, iAttrs, controller) {
          console.log("pre()");
        },
        post: function (scope, iElement, iAttrs, controller) {
          console.log("post()");
        }
      }
    }
  }
});

/* 自定义组件 */
app.directive("e2eComponent", function () {
  return {
    scope: {
      say: '@'  // name 值传递 （字符串，单向绑定）   
    },
    template: "<div>" +
    "<input type='file' name='upfile' e2e-File-Change='upLoadFile($event)'/>" +
    "<img src='' id='show' />" +
    "</div>",
    templateNamespace: 'html',
    // repalce: true,
    // transclude: false,
    controller: function ($scope) {
      $scope.upLoadFile = function (e) {
        console.log("upLoadFile()");
        console.log(this.files.length);
        var reader = new FileReader();

        reader.readAsDataURL(this.files[0]);
        reader.onload = function (e) {
          var elm = document.querySelector('#show');
          elm.src = this.result;
        }

      }
    },
    link: function (scope, element, attrs) {
      console.log("initial value for name:" + scope.name);
    },
    compile: function (tElement, tAttrs, transclude) {
      return {
        pre: function (scope, iElement, iAttrs, controller) {
          console.log("pre()");
        },
        post: function (scope, iElement, iAttrs, controller) {
          console.log("post()");
        }
      }
    }
  }
});

/* 自定义指令 */
app.directive('e2eFileChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      // var onChangeHandler = scope.$eval(attrs.e2eFileChange);
      element.bind('change', scope.upLoadFile);
    }
  };
});

app.controller('AppController', ['$scope', AppController]);
function AppController($scope) {
  $scope.msg = 'ui-roter';
  $scope.name = 'Joker';
  $scope.say = 'Hello';
  console.log($scope.name);
}