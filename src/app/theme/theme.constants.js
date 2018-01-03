/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
  'use strict';

  var IMAGES_ROOT = 'assets/img/';

    //angular.module('BlurAdmin.theme').constant('portalWebservice', 'http://localhost:8081/webservice');
    angular.module('BlurAdmin.theme').constant('portalWebservice', 'http://172.16.166.172:8081/webservice');

    /*

     success(10000, "操作成功"),
     error(20000, "服务器错误"),
     unknown_account(20001, "账户不存在"),
     forbidden_account(20002, "账户已禁用"),
     password_incorrect(20003, "用户不存在或密码错误"),
     verify_captcha_error(20004, "验证码错误,请重新刷新并滑动验证码!"),
     unauthorized(20005, "无操作权限"),
     can_not_edit(20006, "该条记录无法编辑"),
     unauthenticated(20007, "未登录"),
     forbidden_ip(20008, "非法请求"),
     not_found_url(20009, "url不存在"),
     param_format_error(30001, "参数格式错误"),
     missing_parameter(30002, "缺少参数"),
     name_already_exist(30003, "该名称已存在"),
     data_not_exist(30004, "该记录不存在"),
     login_name_already_exist(30005, "该登录名已存在"),
     code_already_exist(30006, "该编码已存在"),
     fullname_already_exist(30007, "该全称已存在"),

     host_valid_fail(40001, "主机验证失败"),
     host_already_exist(40002, "主机信息已存在"),
     host_valid_enable_fail(40003, "主机信息尚未验证，不能启用"),

     file_exist(50001, "文件已存在"),
     file_not_exist(50002, "文件不存在"),
     file_upload_faild(50003, "文件上传失败"),

     */
    angular.module('BlurAdmin.theme').constant('responseCode',[
        {code:10000,msg:"操作成功",level:"success"},

        {code:20000,msg:"服务器错误",level:"danger"},
        {code:20001,msg:"账户不存在",level:"danger"},
        {code:20002,msg:"账户已禁用",level:"danger"},
        {code:20003,msg:"用户不存在或密码错误",level:"danger"},
        {code:20004,msg:"验证码错误,请重新刷新并滑动验证码",level:"danger"},
        {code:20005,msg:"无操作权限",level:"danger"},
        {code:20006,msg:"该条记录无法编辑",level:"danger"},
        {code:20007,msg:"未登录",level:"danger"},
        {code:20008,msg:"非法请求",level:"danger"},
        {code:20009,msg:"url不存在",level:"danger"},

        {code:30001,msg:"参数格式错误",level:"danger"},
        {code:30002,msg:"缺少参数",level:"danger"},
        {code:30003,msg:"该名称已存在",level:"danger"},
        {code:30004,msg:"该记录不存在",level:"danger"},
        {code:30005,msg:"该登录名已存在",level:"danger"},
        {code:30006,msg:"该编码已存在",level:"danger"},
        {code:30007,msg:"该全称已存在",level:"danger"},

        {code:40001,msg:"主机验证失败",level:"danger"},
        {code:40002,msg:"主机信息已存在",level:"danger"},
        {code:40003,msg:"主机信息尚未验证，不能启用",level:"danger"},

        {code:50001,msg:"文件已存在",level:"danger"},
        {code:50002,msg:"文件不存在",level:"danger"},
        {code:50003,msg:"文件上传失败",level:"danger"},

    ]);





  angular.module('BlurAdmin.theme')
    .constant('layoutSizes', {
      resWidthCollapseSidebar: 1200,
      resWidthHideSidebar: 500
    })
    .constant('layoutPaths', {
      images: {
        root: IMAGES_ROOT,
        profile: IMAGES_ROOT + 'app/profile/',
        amMap: 'assets/img/theme/vendor/ammap//dist/ammap/images/',
        amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
      }
    })
    .constant('colorHelper', {
      tint: function(color, weight) {
        return mix('#ffffff', color, weight);
      },
      shade: function(color, weight) {
        return mix('#000000', color, weight);
      },
    });

  function shade(color, weight) {
    return mix('#000000', color, weight);
  }

  function tint(color, weight) {
    return mix('#ffffff', color, weight);
  }

  //SASS mix function
  function mix(color1, color2, weight) {
    // convert a decimal value to hex
    function d2h(d) {
      return d.toString(16);
    }
    // convert a hex value to decimal
    function h2d(h) {
      return parseInt(h, 16);
    }

    var result = "#";
    for(var i = 1; i < 7; i += 2) {
      var color1Part = h2d(color1.substr(i, 2));
      var color2Part = h2d(color2.substr(i, 2));
      var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
      result += ('0' + resultPart).slice(-2);
    }
    return result;
  }
})();
