angular.module('starter.controllers', [])

.controller('StackExchangeEventsCtrl', function($scope, $http, $ionicLoading) {
  $scope.update = function() {
  $ionicLoading.show({template: 'Loading...'});
  $http({
    method: 'GET',
    url: 'https://api.stackexchange.com/2.2/search?pagesize=10&order=desc&sort=activity&tagged=scrapy&site=stackoverflow'
    }).then(function successCallback(response) {
    $scope.stackExchangeEvents = response.data;
    $ionicLoading.hide();
    window.localStorage.setItem("stackExchangeEvents", JSON.stringify(response.data));
    }, function errorCallback(response) {
    $ionicLoading.hide();
  });
}
$scope.stackExchangeEvents = []
  var localStackExchangeEvents = window.localStorage.getItem("stackExchangeEvents")
  if(localStackExchangeEvents == undefined) {
     $scope.update();
   } else {
     $scope.stackExchangeEvents = JSON.parse(localStackExchangeEvents);
   }
})
.controller('GithubUserRepositoriesCtrl', function($scope, $http, $stateParams, $ionicLoading) {
$scope.githubUserRepositories = [];
$ionicLoading.show({template: 'Loading...'});
$scope.title = "Repos for user:" + $stateParams.githubUserLogin;
$http({
  method: 'GET',
  url: 'https://api.github.com/users/'+$stateParams.githubUserLogin+'/repos?sort:created'
  }).then(function successCallback(response) {
  $scope.githubUserRepositories = response.data;
  $ionicLoading.hide();
  }, function errorCallback(response) {
    $ionicLoading.hide();
});
})
.controller('GithubNewRepositoriesCtrl', function($scope, $http, $ionicLoading) {
$scope.githubNewRepositories = [];
$scope.title = "New Repositories";
$scope.update = function() {
  $ionicLoading.show({template: 'Loading...'});
  $http({
    method: 'GET',
    url: 'https://api.github.com/search/repositories?sort:updated&q=scrapy in:readme created:>='+
    "" + (new Date(new Date().getTime()-60*60*24*1000).toISOString().slice(0,10))
    }).then(function successCallback(response) {
    $scope.githubNewRepositories = response.data['items'];
    window.localStorage.setItem("githubNewRepositories", JSON.stringify(response.data['items']));
    $ionicLoading.hide();
    }, function errorCallback(response) {
      $ionicLoading.hide();
  });
}
var localNewRepositories = window.localStorage.getItem("githubNewRepositories")
if(localNewRepositories == undefined) {
   $scope.update();
 } else {
   $scope.githubNewRepositories = JSON.parse(localNewRepositories);
 }
})
.controller('GithubEventsCtrl', function($scope, $http, $ionicLoading) {

  $scope.githubEvents = [];
  $scope.update = function() {
    $ionicLoading.show({template: 'Loading...'});
    $http({
      method: 'GET',
      url: 'https://api.github.com/orgs/scrapy/events'
      }).then(function successCallback(response) {
      $scope.githubEvents = response.data;
      $ionicLoading.hide();
      window.localStorage.setItem("githubEvents", JSON.stringify(response.data));
      }, function errorCallback(response) {
        $ionicLoading.hide();
    });
  }
  var localGithubEvents = window.localStorage.getItem("githubEvents")
  if(localGithubEvents == undefined) {
     $scope.update();
   } else {
     $scope.githubEvents = JSON.parse(localGithubEvents);
   }
})

.controller('HomeCtrl', function($scope, $sce, $http, $ionicActionSheet, $ionicLoading) {
  $scope.triggerActionSheet = function() {
      // Show the action sheet
      var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: 'Edit 1' },
            { text: 'Edit 2' }
         ],
         destructiveText: 'Delete',
         titleText: 'Action Sheet',
         cancelText: 'Cancel',
         cancel: function() {
            // add cancel code...
         },
         buttonClicked: function(index) {
            if(index === 0) {
               // add edit 1 code
            }

            if(index === 1) {
               // add edit 2 code
            }
         },

         destructiveButtonClicked: function() {
            // add delete code..
         }
      });
   };
})

.controller('GithubUserCtrl', function($scope,$http, $stateParams, $ionicLoading) {
  $scope.githubUser = {}
  $ionicLoading.show({template: 'Loading...'});
  $http({
    method: 'GET',
    url: 'https://api.github.com/users/'+$stateParams.githubUserLogin
    }).then(function successCallback(response) {
      $ionicLoading.hide();
    $scope.githubUser = response.data;
    }, function errorCallback(response) {
      $ionicLoading.hide();
  });
})

.controller('StackExchangeUserCtrl', function($scope,$http, $sce, $stateParams, $ionicLoading) {
  $scope.seUser = {}
  $ionicLoading.show({template: 'Loading...'});
  $http({
    method: 'GET',
    url: 'https://api.stackexchange.com/2.2/users/'+$stateParams.seUserId+'?key=ycaG1qbY77)*Y6XMufrHUQ((&order=desc&sort=reputation&site=stackoverflow&filter=!9YdnSBVWp'
    }).then(function successCallback(response) {
    $ionicLoading.hide();
    $scope.seUser = response.data['items'][0];
    }, function errorCallback(response) {
      $ionicLoading.hide();
  });


})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
