(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager')
        .controller('sshscriptCtrl', sshscriptCtrl);

    /** @ngInject */
    function sshscriptCtrl($scope, portal2,$uibModal) {

        var ssh = this;

        $scope.addScript=function () {

            portal2.post("/manager/sshscript/add", {
                name:ssh.name,
                host:ssh.hostSelectItem.value,
                cmd:ssh.cmd,
                startTime:ssh.start,
                endTime:ssh.end,
                rate:ssh.cycle,
            }, function (result) {
                if (result.code==10000){
                    init();
                    initSelectHost();
                }
            });
        }

        function init() {
            portal2.get("/manager/sshscript", {}, function (result) {
                if (result.code = 10000) {

                    $scope.scripts = [];
                    $scope.initScripts = [];

                    result.data.forEach(function (value) {

                        var date = new Date(value.createTime);
                        var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.startTime);
                        var startTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.endTime);
                        var endTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                        var script = {
                            id: value.id,
                            name: value.name,
                            hostname: value.hostname,
                            cmd: value.cmd,
                            status: value.status,
                            rate: value.rate,
                            createTime: createTime,
                            startTime: startTime,
                            endTime: endTime,
                        };
                        var initScript = {
                            id: value.id,
                            name: value.name,
                            hostname: value.hostname,
                            cmd: value.cmd,
                            status: value.status,
                            rate: value.rate,
                            createTime: createTime,
                            startTime: startTime,
                            endTime: endTime,

                        };
                        $scope.scripts.push(script);
                        $scope.initScripts.push(initScript);
                    });
                    $scope.rowScripts = $scope.scripts;
                }

            });

        }

        init();
        initSelectHost();
        function initSelectHost() {

            portal2.get("/manager/hostselect", {}, function (result) {
                if (result.code = 10000) {
                    ssh.hostSelectItem={};
                    ssh.hostSelectItems=[];
                    result.data.forEach(function (value) {
                        var hostSelect={
                            value:value.id,
                            label:value.text,
                        };
                        ssh.hostSelectItems.push(hostSelect);
                    });
                }
            });
        }

        $scope.log = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manager/sshscript/sshscriptLog.html',
                size: 'lg',//sm,lg
                controller: sshscriptLogController

            });
        }

        var sshscriptLogController = function ($scope) {


        };

    }

})();

