(function() {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('pageTopCtrl', pageTopCtrl);

  /** @ngInject */
  function pageTopCtrl($scope,$cookieStore,portal) {

    $scope.signOut = function () {
        $cookieStore.remove('loginCode');
    }

    portal.loadImg($scope);
  }
})();

