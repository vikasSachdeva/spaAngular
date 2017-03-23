"use strict";

angular.module('spaMenuModule')
.directive('spaMenu',spaMenu);

function spaMenu() {
    var directive = {
        transclude: true,
        scope: {
            
        },
        templateUrl: 'app/spaMenu/spaMenuTemplate.html',
        controller: SpaMenuController,
        controllerAs: 'vm',
        link: function(scope, el, attr) {
            
        }
    }
    
    return directive;
    
    function SpaMenuController($rootScope, $log, $scope) {
        var vm = this;
        
        vm.isVertical = true;
        
        this.getActiveElement = function () {
            return vm.activeElement;
        }
        this.getVertical = function() {
            return vm.isVertical;
        }
        
        this.setActiveElement = function(el) {
            vm.activeElement = el;
        }
        
        vm.setRoute = function(rout){
            // vm.route = rout;
            $rootScope.$broadcast('spa-menu-item-selected-event',{route: rout})
            $log.debug(rout);
        }
        
        $scope.$on('spa-menu-show',function(evt, data) {
            $log.debug(data.show);
            vm.showMenu = data.show;
        });
        
        vm.toggleMenuOrientation = function() {
            vm.isVertical = !vm.isVertical;
            $rootScope.$broadcast('spa-meu-orientation-changed-event',
            {isMenuVertical: vm.isVertical});
        };
    }
}