/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.pages.manager', [
        'BlurAdmin.pages.manager.host',
        'BlurAdmin.pages.manager.sshscript',
        'BlurAdmin.pages.manager.sapscript',
        'BlurAdmin.pages.manager.init',
        //'BlurAdmin.pages.manager.sshstatus',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manager', {
                url: '/manager',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: '管理工具',
                sidebarMeta: {
                    icon: 'ion-settings',
                    order: 3,
                },
            });
    }


})();
