/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.routine.ecc')
        .controller('eccReportCtrl', reportCtrl);

    /** @ngInject */
    function reportCtrl($scope, portal2, $uibModal, toastr,currentUser) {
        $scope.smartTablePageSize = 5;
        $scope.currentScript = "";
        $scope.currentScriptID = null;

        function init() {
            $scope.currentScriptID = null;
            $scope.currentScript = "";
            portal2.get("/routine/report/sapscript", {system: "ecc"}, function (result) {
                if (result.code = 10000) {
                    result.data.forEach(function (value) {
                        $scope.currentScript = $scope.currentScript + value.summary + ",";
                        if ($scope.currentScriptID == null) $scope.currentScriptID = value.id;
                    });

                }
            });
            portal2.get("/routine/report", {system: "ecc"}, function (result) {
                if (result.code = 10000) {
                    $scope.reports = result.data;
                    $scope.rowReports = result.data;
                }
            });
        }

        init();

        $scope.exec = function () {
            portal2.get("/routine/report/exec", {system: "ecc", id: $scope.currentScriptID}, function (result) {
                if (result.code == 10000) {
                    toastr.success('提交任务成功，请等待后台执行，稍后刷新。', '执行成功', {
                        "positionClass": "toast-bottom-right",
                    });
                }
            });
        }

        $scope.reload = function () {
            init();
        }

        $scope.open = function (item) {
            if (!item.check) {
                portal2.download("/routine/report/download", {filename: name, ofilename:name,});
            }else {
                portal2.download("/routine/report/download", {filename: item.id + ".file", ofilename: item.name + "." + item.suffix,});
            }
        }


        $scope.script = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/routine/ecc/report/script.html',
                size: 'md',//sm,lg
                controller: scriptController

            });
        }

        var scriptController = function ($scope) {
            $scope.ok = function () {
                portal2.get("/routine/report/setscript", {
                    sapscript: $scope.sapscript,
                    system: "ecc"
                }, function (result) {
                    if (result.code == 10000) {
                        toastr.success('设置脚本成功！', '执行成功', {
                            "positionClass": "toast-bottom-right",
                        });
                        init();
                    }
                    $scope.$dismiss();
                });
            }
        };

        $scope.check = function (item) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/routine/ecc/report/check.html',
                size: 'md',//sm,lg
                controller: checkController,
                resolve:{
                    item:function () {
                        return item;
                    }
                }

            });
        }

        var checkController = function ($scope,item) {
            function init() {
                if(item.check) {
                    $scope.name = item.name;
                    $scope.suffix = item.suffix;
                    $scope.summary = item.summary;
                }else {
                    $scope.name = item.name.split(".")[0];
                    $scope.suffix = item.name.split(".")[1];
                    $scope.summary = item.summary;
                }
            };
            init();
            $scope.ok = function () {
                var filename = item.check?item.id:item.name;
                portal2.get("/routine/report/check", {
                    filename: filename,
                    summary: $scope.summary,
                    name:$scope.name,
                    creator:currentUser.getOriginal().zhName,
                    system: "ecc",
                    suffix: $scope.suffix,
                    check:item.check
                }, function (result) {
                    if (result.code == 10000) {
                        toastr.success('提交成功！', '执行成功', {
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