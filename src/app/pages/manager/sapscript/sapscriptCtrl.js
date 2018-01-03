(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager')
        .controller('sapscriptCtrl', sapscriptCtrl);

    /** @ngInject */
    function sapscriptCtrl($scope, portal2,toastr,$uibModal) {


        var sap = this;
        sap.sapguiInfo = {
            summary:"test",host:"192.168.1.5",sid:"ecc",
            instanceNo:"00",client:"800",language:"zh",
            username:"basis",
        };
        sap.maintainInfo = {timeout:500};
        sap.docInfo = {};
        sap.sapguiInfo.connTypeItems = [
            {label: "自定义应用程序服务器", value: "0"}
        ];
        sap.sapguiInfo.connTypeSelected = sap.sapguiInfo.connTypeItems[0];
        sap.docInfo.formateTypeItems = [
            {label: ".doc", value: "0"}
        ];

        sap.docInfo.formateSelected = sap.docInfo.formateTypeItems[0];


        sap.arePersonalInfoPasswordsEqual = function () {
            return sap.sapguiInfo.confirmPassword && sap.sapguiInfo.password == sap.sapguiInfo.confirmPassword;
        };


        sap.isMaintainChecked = function () {
            var length = $("input[name='t-code']").length;
            for (var i = 0; i < length; i++) {
                if ($("input[name='t-code']")[i].checked) return true;
            }
            return false;
        };

        sap.getMaintainChecked = function () {

            var length = $("input[name='t-code']").length;
            sap.maintainInfo.tcode = [];
            for (var i = 0; i < length; i++) {
                var item = {
                    tcode: $("input[name='t-code']")[i].value,
                    checked: $("input[name='t-code']")[i].checked
                }
                sap.maintainInfo.tcode.push(item);

            }
            ;
        };

        sap.test = function () {
            console.log(sap);
            sap.save();
            sap.generate();
        };

        sap.save = function () {
            sap.getMaintainChecked();
            var tcode;
            sap.maintainInfo.tcode.forEach(function (value) {
                if (value.checked) {

                    if (tcode == null) tcode = value.tcode;
                    else tcode += "*" + value.tcode;
                }
            });
            portal2.post("/manager/sapscript/save", {
                tcode: tcode,
                summary:sap.sapguiInfo.summary,
                host:sap.sapguiInfo.host,
                sid:sap.sapguiInfo.sid,
                instanceNo:sap.sapguiInfo.instanceNo,
                client:sap.sapguiInfo.client,
                language:sap.sapguiInfo.language,
                username:sap.sapguiInfo.username,
                password:sap.sapguiInfo.password,
                router:sap.sapguiInfo.sapRouter,
                connType:sap.sapguiInfo.connTypeSelected.value,
                timeout:sap.maintainInfo.timeout,
                title:sap.docInfo.title,
                formate:sap.docInfo.formateSelected.value,

            },function (result) {
                if(result.code==10000){
                    toastr.success('SAP 运维脚本已成功保存！', '执行成功', {
                        "positionClass": "toast-bottom-right",
                    });
                    init();
                }else{
                    toastr.error(result.msg+",可能该条目已存在!", '错误', {
                        "positionClass": "toast-bottom-right",
                    });
                }

            });
            console.log("save");

        };

        sap.generate = function () {
            sap.getMaintainChecked();
            var tcode;
            sap.maintainInfo.tcode.forEach(function (value) {
                if (value.checked) {

                    if (tcode == null) tcode = value.tcode;
                    else tcode += "*" + value.tcode;
                }
            });

            portal2.download("/manager/sapscript/generator", {
                tcode: tcode,
                summary:sap.sapguiInfo.summary,
                host:sap.sapguiInfo.host,
                sid:sap.sapguiInfo.sid,
                instanceNo:sap.sapguiInfo.instanceNo,
                client:sap.sapguiInfo.client,
                language:sap.sapguiInfo.language,
                username:sap.sapguiInfo.username,
                password:sap.sapguiInfo.password,
                router:sap.sapguiInfo.sapRouter,
                connType:sap.sapguiInfo.connTypeSelected.value,
                timeout:sap.maintainInfo.timeout,
                title:sap.docInfo.title,
                formate:sap.docInfo.formateSelected.value,

            });
            console.log("generate");
        };

        sap.generateById = function (id) {
            portal2.download("/manager/sapscript/generateById", {
                id: id,
            });
        };

        sap.execById = function (id) {
            portal2.get("/manager/sapscript/execById", {
                id: id,
            },function (result) {
                if(result.code==10000){
                    toastr.success('提交任务成功，请等待后台执行，稍后刷新。', '执行成功', {
                        "positionClass": "toast-bottom-right",
                    });
                }
            });
        };




        function init() {
            portal2.get("/manager/sapscript", {}, function (result) {
                if (result.code = 10000) {

                    $scope.scripts = [];
                    $scope.initScripts = [];

                    result.data.forEach(function (value) {

                        var date = new Date(value.createTime);
                        var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.updateTime);
                        var updateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                        var script = {
                            id: value.id,
                            summary: value.summary,
                            host: value.host,
                            sid: value.sid,
                            tcode: value.tcode.split('*').join(','),
                            createTime: createTime,
                        };
                        var initScript = {
                            id: value.id,
                            summary: value.summary,
                            host: value.host,
                            sid: value.sid,
                            tcode: value.tcode.split('*').join(','),
                            createTime: createTime,

                        };
                        $scope.scripts.push(script);
                        $scope.initScripts.push(initScript);
                    });
                    $scope.rowScripts = $scope.scripts;
                }

            });

        };

        init();


        sap.openFileList = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/manager/sapscript/filelist.html',
                size: 'md',//sm,lg
                controller:openFileListController

            });
        }



        var openFileListController = function ($scope) {
            function load() {
                portal2.get("/manager/sapscript/filelist", {}, function (result) {
                    if (result.code == 10000) {
                        $scope.filelist = result.data;
                        $scope.rowFilelist = result.data;
                    }
                })
            }
            load();
            $scope.reload = function () {
                load();
            }
            $scope.open = function (filename) {
                portal2.download("/manager/sapscript/file/download",{filename:filename})
            }

        };



    }

})();

