/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .run(themeRun);


    /** @ngInject */
    function themeRun($cookieStore, $location, $timeout, portal, portal2, $interval, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings) {

        //若服务器没有该loginCode信息，则退出
        portal.get("/user/loginStatus", 'GET', {}).then(function (result) {

            if (result.code == 10000) {
                $cookieStore.put('currentUser', result.data);
            }else {
                $cookieStore.remove('loginCode');
            }

        }, function (data) {
            //console.log(data) ;
        })

        $interval(function () {
            var loginCode = $cookieStore.get('loginCode');
            var permissionChanged = $cookieStore.get('permissionChanged');
            //console.log($cookieStore.get('permissionChanged'));
            if (loginCode == null) {
                $cookieStore.put('permissionChanged', 'true');
                var host = $location.host();
                var port = $location.port();
                location.href = 'http://' + host + ':' + port + "/auth.html";
            } else {
                var permissionChanged = $cookieStore.get('permissionChanged');
                if (permissionChanged != null && permissionChanged == "true") {
                    portal.get("/user/loginStatus", 'GET', {}).then(function (result) {
                        console.log(result);
                        if (result.code == 10000) {
                            $cookieStore.put('currentUser', result.data);
                            $cookieStore.put('permissionChanged', 'false');
                        }
                    }, function (data) {
                        //console.log(data) ;
                    })


                }

            }
        }, 1000);

        var whatToWait = [
            preloader.loadAmCharts(),
            //$timeout(3000)
        ];

        var theme = themeLayoutSettings;
        if (theme.blur) {
            if (theme.mobile) {
                whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
            } else {
                whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
                whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
            }
        }

        $q.all(whatToWait).then(function () {
            $rootScope.$pageFinishedLoading = true;
        });

        $timeout(function () {
            if (!$rootScope.$pageFinishedLoading) {
                $rootScope.$pageFinishedLoading = true;
            }
            //}, 7000);
        }, 3000);


        $rootScope.$baSidebarService = baSidebarService;
    }

})();