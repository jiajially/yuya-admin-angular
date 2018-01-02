/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader,currentUser, $filter, $uibModal, Upload, portal,portalWebservice) {
        $scope.picture;
        currentUser.initProfile($scope);

        $scope.$watch('file', function (file) {
            if (file) {
                $scope.upload($scope.file);
            }
        });
        $scope.upload = function (file) {
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                    console.log(result);
                });
            console.log(file);
            Upload.upload(
                {
                    url: portalWebservice + '/user/upload',
                    fields: {'username': $scope.username,id:currentUser.getUserId}, file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                })
                .error(function (data, status, headers, config) {
                    //console.log('error status: ' + status);
                })
        };

        //加载图片
        portal.loadImg($scope);

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {

            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        };


        $scope.unconnect = function (item) {
            item.href = undefined;
        };

        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/profileModal.html'
            }).result.then(function (link) {
                item.href = link;
            });
        };

        $scope.getFile = function () {
            //fileReader.readAsDataUrl($scope.file, $scope)
            //   .then(function (result) {
            //   $scope.picture = result;
            // });
        };

        $scope.switches = [true, true, false, true, true, false];
        $scope.departments=
            [
                {name:"开发", value:"d"},
                {name:"销售", value:"s"},
                {name:"产品", value:"p"},
                {name:"运维", value:"m"},
                {name:"管理", value:"r"}
            ];
        $scope.locations=
            [
                {name:"江苏", value:"js"},
                {name:"上海", value:"sh"},
                {name:"浙江", value:"zj"},
                {name:"北京", value:"bj"}
            ];

        $scope.departments.forEach(function(item, index){
            if (item.value==$scope.selectedDepartment)
            {
                $scope.selectedDepartment=$scope.departments[index];
            }
        });
        $scope.locations.forEach(function(item, index){
            if (item.value==$scope.selectedLocation)
            {
                $scope.selectedLocation=$scope.locations[index];
            }
        });

    }

})();
