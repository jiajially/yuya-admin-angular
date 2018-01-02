/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.material')
        .controller('localCtrl', localCtrl);


    /** @ngInject */
    function localCtrl($scope, $uibModal, portal2, Upload, portalWebservice, $cookieStore,toastr,msgbox) {
        function init() {
            portal2.get("/material/list", {type: 2}, function (result) {
                if (result.code = 10000) {

                    $scope.materials = [];

                    console.log(result);
                    result.data.forEach(function (value) {


                        var date = new Date(value.createTime);
                        var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                        date = new Date(value.updateTime);
                        var updateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                        var material = {
                            id: value.id,
                            summary: value.summary,
                            suffix: value.suffix,
                            tag: value.url,

                        };
                        $scope.materials.push(material);
                    });
                    $scope.rowMaterials = $scope.materials;
                }

            });

        };

        init();


        $scope.download = function (id) {
            portal2.download("/material/download", {
                id: id
            });
        }
        $scope.delete = function (item) {
            msgbox.confirm("确认","确定要删除文件\""+item.summary+"\"",function () {
                portal2.get("/material/delete", {
                    id: item.id
                }, function (result) {
                    if (result.code == 10000) {
                        toastr.success('删除文件成功', '执行成功', {
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
                templateUrl: 'app/pages/material/local/addLocal.html',
                size: 'md',//sm,lg
                controller: addLocalController

            });
        }

        var addLocalController = function ($scope) {
            $scope.fileInputClick = function () {
                var fileInput = document.getElementById("localFile");
                fileInput.click();
            }
            $scope.upload = function () {
                var file = document.getElementById("localFile").files[0];
                if (file != null) {
                    Upload.upload(
                        {
                            url: portalWebservice + '/material/local/add',
                            fields: {'loginCode': $cookieStore.get('loginCode')}, file: file
                        })
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(progressPercentage);
                            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        })
                        .success(function (data, status, headers, config) {
                            //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                            init();
                        })
                        .error(function (data, status, headers, config) {
                            //console.log('error status: ' + status);
                        })
                    $scope.$dismiss();

                }
            };

        };


    }


})();