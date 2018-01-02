/**
 * Created by liugang on 2017/11/17.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .directive('hasPermission', hasPermission);

    function hasPermission(permissions) {
        return {
            link: function(scope, element, attrs) {
                //console.log(attrs.hasPermission.trim());

                if(!_.isString(attrs.hasPermission))
                    throw "hasPermission value must be a string";

                var value = attrs.hasPermission.trim();
                var notPermissionFlag = value[0] === '!';
                if(notPermissionFlag) {
                    value = value.slice(1).trim();
                }

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = permissions.hasPermission(value);

                    if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
                        element.show();
                    else
                        element.hide();
                }
                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
        };
    }




})();