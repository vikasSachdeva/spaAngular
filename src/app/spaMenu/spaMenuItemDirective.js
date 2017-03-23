"use strict";

angular.module('spaMenuModule')
.directive('spaMenuItem',spaMenuItem);

function spaMenuItem() {
    var directive = {
        require: '^spaMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'    
        },
        templateUrl: 'app/spaMenu/spaMenuItemTemplate.html',
        link: function(scope, el, attr, ctrl) {
            el.on('click',function(evt){
                
                scope.isActive = function() {
                    return el === ctrl.getActiveElement(); //no access to acope on ctrl but access to ctrl itself
                }
                
                scope.isVerticals = function() {
                    return ctrl.isVertical() || (el.parents('group-items-indentation').length>0);
                }
                //below two line lines gives us exclusive access to click event
                evt.stopPropagation();
                evt.preventDefault();
                //wrappin in scope.$apply , since handling events using
                //jquery, angular have no idea that scope is gonna be changing
                //so using below
                scope.$apply(function(){
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                })
            });
        }
    };
    return directive;
}