/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.manager.sshscript', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manager.sshscript', {
                url: '/sshscript',
                templateUrl: 'app/pages/manager/sshscript/sshscript.html',
                title: 'SSH脚本配置',
                controller: 'sshscriptCtrl',
                controllerAs: 'ssh',
                sidebarMeta: {
                    order: 500,
                },
            });
    }

})();
