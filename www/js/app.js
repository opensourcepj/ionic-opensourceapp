// Ionic Starter App
//'ionic', 'ngResource', 'ngCordova'

angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($rootScope) {
    $rootScope.test = new Date();
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.stackexchange-events-detail', {
      url: '/stackexchange-user/:seUserId',
      views: {
        'menuContent': {
          templateUrl: 'templates/se-user.html',
          controller: 'StackExchangeUserCtrl'
        }
      }
    })
.state('app.github-user-repos', {
  url: '/github-user-repos/:githubUserLogin',
    views: {
      'menuContent': {
        templateUrl: 'templates/github-user-repositories.html',
        controller: 'GithubUserRepositoriesCtrl'
      }
    }
})
.state('app.github-user', {
  url: '/github-user/:githubUserLogin',
  views: {
  'menuContent': {
    templateUrl: 'templates/github-user.html',
    controller: 'GithubUserCtrl'
    }
  }
})

.state('app.github-events', {
url: '/github-events',
views: {
  'menuContent': {
    templateUrl: 'templates/github-events.html',
    controller: 'GithubEventsCtrl'
  }
}
})
.state('app.stackexchange-events', {
url: '/stackexchange-events',
views: {
  'menuContent': {
    templateUrl: 'templates/stackexchange-events.html',
    controller: 'StackExchangeEventsCtrl'
  }
}
})
.state('app.github-new-repositories', {
url: '/github-new-repositories',
views: {
  'menuContent': {
    templateUrl: 'templates/github-new-repositories.html',
    controller: 'GithubNewRepositoriesCtrl'
  }
}
})
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
