/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.overview')
      .controller('sysInfoCtrl', sysInfoCtrl);

  /** @ngInject */
  function sysInfoCtrl($scope,$sce) {
    $scope.systems = [
        {name:"SRM",cpu:30,disk:77,cpusuccess:50,cpuwarning:80,cpuerror:90},
        {name:"ECC",cpu:37,disk:46,cpusuccess:50,cpuwarning:80,cpuerror:90},
        {name:"SLT",cpu:68,disk:84,cpusuccess:50,cpuwarning:80,cpuerror:90},
        {name:"BW",cpu:89,disk:69,cpusuccess:50,cpuwarning:80,cpuerror:90},
        {name:"Portal",cpu:94,disk:93,cpusuccess:50,cpuwarning:80,cpuerror:90},
    ];
  }
})();