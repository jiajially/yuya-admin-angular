/**
 * @author v.liug
 * created on 19.11.2017
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.yuya')
        .service('msgbox', msgbox)
        .controller('msgboxCtrl',msgboxCtrl);

  /** @ngInject */
  function msgbox($uibModal) {
      var factory={};
      factory.confirm = function (title,content,ok,cancel) {
          $uibModal.open({
              animation: true,
              templateUrl:'app/yuya/services/bootboxtmp/confirmModal.html',
              size: 'sm',//sm,lg
              controller:'msgboxCtrl',
              resolve: {
                  title: function () {
                      return title;
                  },
                  content: function () {
                      return content;
                  },
                  ok:function () {
                      return ok;
                  },
                  cancel:function () {
                      return cancel;
                  }
              }
          });
      };
      return factory;
  }

    function msgboxCtrl($scope,title,content,ok,cancel){
        $scope.title = title;
        $scope.content = content;
        $scope.ok = function () {
            ok();
            $scope.$dismiss();
        };
        $scope.cancel = function () {
            $scope.$dismiss();
            cancel();
        };
    }
})();
