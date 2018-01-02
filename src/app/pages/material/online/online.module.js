/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.material.online', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('material.online', {
                url: '/online',
                templateUrl: 'app/pages/material/online/online.html',
                controller: 'onlineCtrl',
                controllerAs: 'ssh',
                title: '在线资料',
                sidebarMeta: {
                    order: 500,
                },
            });
    }

})();
