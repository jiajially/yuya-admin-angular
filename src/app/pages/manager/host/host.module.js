/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager.host', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manager.host', {
                url: '/host',
                templateUrl: 'app/pages/manager/host/host.html',
                title: '主机管理',
                controller: 'hostCtrl',
                controllerAs: 'host',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();
