/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.routine.ecc')
        .controller('eccBackupCtrl', backupCtrl);

    /** @ngInject */
    function backupCtrl($scope) {
        $scope.smartTablePageSize = 5;
        $scope.reports = [
            {id: "1", createTime: "2017-11-11 12:33:45", creator: "老刘", name: "ECC系统巡检报告20171111", summary: "各巡检正常"},
            {id: "2", createTime: "2017-11-12 12:33:45", creator: "老张", name: "ECC系统巡检报告20171112", summary: "不正常"},
            {id: "3", createTime: "2017-11-13 12:33:45", creator: "老胡", name: "ECC系统巡检报告20171113", summary: "不正常"},
            {id: "4", createTime: "2017-11-14 12:33:45", creator: "老李", name: "ECC系统巡检报告20171114", summary: "各巡检正常"},
            {id: "5", createTime: "2017-11-15 12:33:45", creator: "老孟", name: "ECC系统巡检报告20171115", summary: "各巡检正常"},
            {id: "6", createTime: "2017-11-16 12:33:45", creator: "老秦", name: "ECC系统巡检报告20171116", summary: "各巡检正常"},
            {id: "7", createTime: "2017-11-17 12:33:45", creator: "老赵", name: "ECC系统巡检报告20171117", summary: "各巡检正常"},
        ];


    }
})();