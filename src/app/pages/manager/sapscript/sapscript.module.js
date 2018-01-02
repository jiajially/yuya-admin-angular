/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager.sapscript', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manager.sapscript', {
                url: '/sapscript',
                templateUrl: 'app/pages/manager/sapscript/sapscript.html',
                title: 'SAP脚本配置',
                controller: 'sapscriptCtrl',
                controllerAs: 'sap',
                sidebarMeta: {
                    order: 500,
                },
            });
    }

})();
