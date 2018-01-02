/**
 * @author v.liug
 * created on 19.11.2017
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.yuya')
        .service('portal', portal);
    angular.module('BlurAdmin.yuya')
        .service('portal2', portal2);

  /** @ngInject */
  function portal($http, $q,$cookieStore,$filter,portalWebservice){
      var root=portalWebservice;
      var headers = {'Content-Type': 'application/json'};
      var factory = {};
      factory.get = function(endpoint,method, params) {
          var defer = $q.defer();
          //设置用户登录验证信息
          params['loginCode'] = $cookieStore.get('loginCode');
          if (method == 'GET') {
              $http({
                  url: root + endpoint,
                  method: "GET",
                  headers: headers,
                  params: params,
              }).success(function (data) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  // defer.resolve(data);
                  defer.reject(data);
              });
          } else {
              $http({
                  url: endpoint,
                  method: method,
                  headers: headers,
                  data: params,
              }).success(function (data) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  // defer.resolve(data);
                  defer.reject(data);
              });
          }
          return defer.promise;
      };
      factory.loadImg = function($scope){

          var params={};
          $scope.picture = $filter('appImage')('theme/no-photo.png');
          params['loginCode'] = $cookieStore.get('loginCode');

          $.ajax({
              data: params,
              traditional: true,
              method: "GET",
              url: root + "/user/loginStatus",
              //async: true,
              dataType: 'json',
              success: function (result) {
                  console.log(result);
                  if(result.code ==10000) {
                      var filename = result.data.id+'.jpg';
                      $scope.picture = portalWebservice + '/user/download?fileName=' + filename;
                  }
              }
          });
      };

      return factory;
  }

    function portal2($cookieStore,Upload,portalWebservice,responseCode,toastr){
        var root=portalWebservice;
        //var headers = {'Content-Type': 'application/json'};
        var factory = {};
        factory.get = function(endpoint, params,callback) {
            params["loginCode"]=$cookieStore.get('loginCode');
            $.ajax({
                data: params,
                traditional: true,
                method: "get",
                url: root + endpoint,
                //async: true,
                dataType: 'json',
                success: callback
            });
        };
        factory.post = function(endpoint, params,callback) {
            params["loginCode"]=$cookieStore.get('loginCode');
            $.ajax({
                data: params,
                traditional: true,
                method: "post",
                url: root + endpoint,
                //async: true,
                dataType: 'json',
                success: callback
            });
        };
        factory.download = function(endpoint, params){
            params["loginCode"]=$cookieStore.get('loginCode');
            var paramStr = JSON.stringify(params);
            paramStr = paramStr.replace("{","").replace("}","");
            paramStr = paramStr.split('"').join('');
            paramStr = paramStr.split(':').join('=');
            paramStr = paramStr.split(',').join('&');
            window.open(root + endpoint+"?"+ paramStr);


        }
        factory.getWithNotification = function(endpoint, method, params,callback) {
            params["loginCode"]=$cookieStore.get('loginCode');
            $.ajax({
                data: params,
                traditional: true,
                method: method,
                url: root + endpoint,
                //async: true,
                dataType: 'json',
                success: function (result) {
                    var code = result.code;
                    if (code==10000){
                        toastr.success('Your information has been saved successfully!');
                        callback;
                    }else{
                        responseCode.forEach(function(item, index) {
                            if(code==item[index]){
                                switch(item.level)
                                {
                                    case "info":
                                        toastr.info(item.msg, 'Information',{"positionClass": "toast-bottom-right"});
                                        break;
                                    case "error":
                                        toastr.error(item.msg, 'Error',{"positionClass": "toast-bottom-right"});
                                        break;
                                    case "warning":
                                        toastr.warning(item.msg, 'Warning',{"positionClass": "toast-bottom-right"});
                                        break;
                                    default:
                                        toastr.success('Your information has been saved successfully!',{"positionClass": "toast-bottom-right"});
                                }

                            }
                        });
                    }

                }
            });
        };


        return factory;
    }

})();
