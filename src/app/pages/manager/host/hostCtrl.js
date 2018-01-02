/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager.host')
        .controller('hostCtrl', hostCtrl);

    /** @ngInject */
    function hostCtrl($scope, portal2, baProgressModal, toastr, msgbox) {

        var host = this;

        $scope.valid = function () {
            console.log(host);
        }

        $scope.save = function () {

            console.log(host);
        }






        var load = false;
        $scope.smartTablePageSize = 10;
        function init() {
            portal2.get("/manager/host", {}, function (result) {
                if (result.code = 10000) {

                    $scope.reports = [];
                    $scope.initReports = [];

                    result.data.forEach(function (value) {

                        var date = new Date(value.createTime);
                        var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.updateTime);
                        var updateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                        var host = {
                            id: value.id,
                            summary: value.summary,
                            hostPort: value.host + ":" + value.port,
                            loginName: value.username,
                            isValid: value.valid,
                            isEnable: value.enable,
                            createTime: createTime,
                            updateTime: updateTime,
                        };
                        var initHost = {
                            id: value.id,
                            summary: value.summary,
                            hostPort: value.host + ":" + value.port,
                            loginName: value.username,
                            isValid: value.valid,
                            isEnable: value.enable,
                            createTime: createTime,
                            updateTime: updateTime,

                        };
                        $scope.reports.push(host);
                        $scope.initReports.push(initHost);
                    });
                    $scope.rowReports = $scope.reports;
                    load = false;
                }

            });

        }

        function initLocal() {
            $scope.reports = [];
            $scope.initReports.forEach(function (value) {
                var host = {
                    id: value.id,
                    summary: value.summary,
                    hostPort: value.hostPort,
                    loginName: value.loginName,
                    isValid: value.isValid,
                    isEnable: value.isEnable,
                    createTime: value.createTime,
                    updateTime: value.updateTime,
                };
                $scope.reports.push(host);
            });
            $scope.rowReports = $scope.reports;
            load = false;
        }

        $scope.enableHost = function (item) {
            if (item != null) {
                $scope.initReports.forEach(function (value) {
                    if (item.id === value.id && item.isEnable != value.isEnable) {

                        if (item.isValid) {
                            var tmp = item.isEnable ? "启用" : "禁用";
                            msgbox.confirm("操作确认", "是否要" + tmp + " " + item.summary + " 主机？", function () {
                                portal2.get("/manager/host/enable", {
                                    id: item.id,
                                    isEnable: item.isEnable
                                }, function (result) {
                                    if (result.code == 10000) {
                                        init();
                                    }
                                });
                            }, function () {
                                initLocal();
                            });
                            //console.log(item.id + ":" + item.isEnable + ":" + value.isEnable);

                        } else {
                            toastr.error('主机验证状态不可知，无法启用，请先验证主机信息！', '无法执行', {
                                "positionClass": "toast-bottom-right",
                            });
                            initLocal();
                        }


                    }
                });
            }
        };

        $scope.validHost = function (item) {
            if (item != null) {
                baProgressModal.open();
                portal2.get("/manager/host/valid", {
                    id: item.id,
                    isEnable: item.isEnable
                }, function (result) {
                    init();
                });

            }

        };

        init();

    }
})();