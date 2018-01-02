/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.overview')
      .controller('customScriptCtrl', customScriptCtrl);

  /** @ngInject */
  function customScriptCtrl($scope,portal2,toastr) {
      var vm = this;
      $scope.script={};
      function init() {
          portal2.get("/customscript",{},function (result) {
              $scope.cunstomScripts = [];
              console.log(result);
              if(result.code==10000){
                  result.data.forEach(function (value) {
                      var date = new Date(value.updateTime);
                      var updateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

                      var cunstomScript = {
                          id:value.id,
                          title:value.title,
                          desciption:"指令（"+value.cmd+"）,"+"单位（"+value.unit+"），"+value.description,
                          content:value.result,
                          status:value.status,
                          updateTime:updateTime
                      };
                      $scope.cunstomScripts.push(cunstomScript);
                  });

              }
          });
      }
      function initSelectHost() {

          portal2.get("/manager/hostselect", {}, function (result) {
              if (result.code = 10000) {
                  vm.hostSelectItem={};
                  vm.hostSelectItems=[];
                  result.data.forEach(function (value) {
                      var hostSelect={
                          value:value.id,
                          label:value.text,
                      };
                      vm.hostSelectItems.push(hostSelect);
                  });
              }
          });
      }

      $scope.addScript = function () {
          console.log(vm);
          portal2.post("/customscript/add",{
              host:vm.hostSelectItem.value,
              title:$scope.script.title,
              description:$scope.script.description,
              unit:$scope.script.unit,
              cmd:$scope.script.cmd,
          },function (result) {
              if(result.code=10000){
                  toastr.success('自定义脚本执行成功', '执行成功', {
                      "positionClass": "toast-bottom-right",
                  });
                  init();
                  initSelectHost();
                  $scope.script={};
              }
          });
      }
      $scope.deleteScriptById = function (id) {
          portal2.get("/customscript/toolbox",{
              id:id,
              type:1
          },function (result) {
              if(result.code=10000){
                  toastr.success('自定义脚本删除成功', '执行成功', {
                      "positionClass": "toast-bottom-right",
                  });
                  init();
                  initSelectHost();
                  $scope.script={};
              }
          });
      }
      $scope.refreshScriptById = function (id) {
          portal2.get("/customscript/toolbox",{
              id:id,
              type:2
          },function (result) {
              if(result.code=10000){
                  toastr.success('自定义脚本刷新成功', '执行成功', {
                      "positionClass": "toast-bottom-right",
                  });
                  init();
                  initSelectHost();
                  $scope.script={};
              }
          });
      }
      init();
      initSelectHost();
  }
})();