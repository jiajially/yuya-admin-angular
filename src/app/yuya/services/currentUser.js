/**
 * @author v.liug
 * created on 19.11.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.yuya')
      .service('currentUser', currentUser);

  /** @ngInject */
  function currentUser($cookieStore){
      this.initProfile = function ($scope) {
          var user = $cookieStore.get('currentUser');
          $scope.enName =user.enName;
          $scope.zhName =user.zhName;
          $scope.selectedDepartment ="r";
          $scope.email =user.email;
          $scope.phone =user.phone;
          $scope.selectedLocation = user.address;
          console.log(user);

      };

      this.getOriginal = function () {
          return $cookieStore.get('currentUser');
      };

      this.getUserId = function(){
          return $cookieStore.get('currentUser').id;
      }



  }

})();
