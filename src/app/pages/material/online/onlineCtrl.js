(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager')
        .controller('onlineCtrl', onlineCtrl);

    /** @ngInject */
    function onlineCtrl($scope, portal2,$sce,$uibModal,toastr,msgbox) {


        function init() {
            portal2.get("/material/list", {type:1}, function (result) {
                if (result.code = 10000) {

                    $scope.materials = [];

                    console.log(result);
                    result.data.forEach(function (value) {
                        var date = new Date(value.createTime);
                        var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.updateTime);
                        var updateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                        var script = {
                            id: value.id,
                            summary:value.summary,
                            url:value.url,

                        };
                        $scope.materials.push(script);
                    });
                    $scope.rowMaterials = $scope.materials;
                }

            });

        };

        $scope.open = function(url){
            window.open($sce.trustAsResourceUrl(url));
        }

        init();

        $scope.delete = function (item) {
            msgbox.confirm("确认","确定要删除资料\""+item.summary+"\"",function () {
                portal2.get("/material/delete", {
                    id: item.id
                }, function (result) {
                    if (result.code == 10000) {
                        toastr.success('删除资料成功', '执行成功', {
                            "positionClass": "toast-bottom-right",
                        });
                        init();
                    } else {

                    }
                });
            },function () {

            });

        }

        $scope.add = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/material/online/addOnline.html',
                size: 'md',//sm,lg
                controller: addOnlineController

            });
        }

        var addOnlineController = function ($scope) {
            $scope.ok = function () {
                portal2.post("/material/online/add",{url:$scope.url,summary:$scope.summary},function (reasult) {
                    if(reasult.code==10000){
                        toastr.success('新增在线文档成功！', '执行成功', {
                            "positionClass": "toast-bottom-right",
                        });
                        init();
                    }
                    $scope.$dismiss();
                });
            }
        };

    }
})();

