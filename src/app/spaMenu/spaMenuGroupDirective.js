"use strict"

angular.module('spaMenuModule')
.directive('spaMenuGroup',spaMenuGroup);

function spaMenuGroup() {
    var directive = {
        require: '^spaMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'app/spaMenu/spaMenuGroupTemplate.html',
        link: function (scope, el, attrs, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function() {
                scope.isOpen = false;
            }
            scope.clicked = function() {
                scope.isOpen = !scope.isOpen;
            }
        }
    };
    
    return directive;
}