"use strict";

angular.module('spaFrameworkModule')
.directive('spaFramework',spaFramework);
 function spaFramework() {
     var directive={
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        templateUrl: 'app/spaFramework/spaFrameworkTemplate.html',
        controller: SpaFrameworkController,
        controllerAs: 'vm'
    };
    return directive;
    function SpaFrameworkController($scope, $window, $timeout, $rootScope) {
        var vm=this;
        vm.myName = "avinash";
        vm.isMenuVisible = true;
        vm.isMenuButtonVisible = true;
        vm.isMenuVertical = true;
        
        $scope.$on('spa-meu-orientation-changed-event',function(evt, data){
            vm.isMenuVertical = data.isMenuVertical;
        });
        
        angular.element($window).on('resize.spaFramework', function() { //resize event with namespace attached to it
            $scope.$apply(function(){
                checkWidth();  
                broadcastMenuState();  
            });
        });
        
        $scope.$on('$destroy', function() {
            angular.element($window).off('resize.spaFramework'); //release the handler from the window when scope recieves the destroy msg
        });                                        // this way we wont interefere with anything else that might be on the resize event of the window
        
        var checkWidth = function(){
            var width = angular.element($window).innerWidth();
            vm.isMenuVisible = (width>768);
            vm.isMenuButtonVisible = !vm.isMenuVisible;
        };
        
        vm.menuButtonClicked = function() {
            vm.isMenuVisible = !vm.isMenuVisible; // scope is changed here
            broadcastMenuState();  //cant wrap this in $apply as this have its own & this fxn is likely to change scope, therefore $scope.$apply
            // $scope.$apply();
        };
        
        var broadcastMenuState = function() {
            $rootScope.$broadcast('spa-menu-show',{show: vm.isMenuVisible});
        };
        
        $timeout(function(){
            checkWidth();
        },0);
        //listen to message and on recieving it, call a fxn that gets
        // passed the event and the data
        $scope.$on('spa-menu-item-selected-event',function(evt, data){
            vm.routeString = data.route;
            checkWidth();
            broadcastMenuState();
        });
    }
 }   
    
    
