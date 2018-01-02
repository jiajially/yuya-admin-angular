(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager')
        .controller('initCtrl', initCtrl);

    /** @ngInject */
    function initCtrl($scope, portal2,toastr) {

        $scope.start = function () {
            portal2.get("/manager/init",{},function (result) {
                if(result.code==10000){
                    toastr.success('初始化成功', '执行成功', {
                        "positionClass": "toast-bottom-right",
                    });
                }else{
                    toastr.error(result.msg, '错误', {
                        "positionClass": "toast-bottom-right",
                    });
                }
            });

        }

    }

})();

