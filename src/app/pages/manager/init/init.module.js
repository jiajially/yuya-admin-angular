/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager.init', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manager.init', {
                url: '/init',
                templateUrl: 'app/pages/manager/init/init.html',
                title: '系统初始化',
                controller: 'initCtrl',
                sidebarMeta: {
                    order: 1000,
                },
            });
    }

})();
