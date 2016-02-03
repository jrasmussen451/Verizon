angular.module('OrderCloud-CategoryDropdown', []);

angular.module('OrderCloud-CategoryDropdown')
    .directive('categorydropdown', categorydropdown)
    .controller('CategoryDropdownCtrl', CategoryDropdownCtrl)
;

function categorydropdown() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'CategoryDropdownCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.fa-caret-up:first-of-type { color: #FFF; top: -25px;}',
            '.fa-caret-up { color: #fff; left: 10px; position: absolute;top: -23px;z-index: 20;}',
            '</style>',
            '<a class="dropdown-toggle" data-toggle="dropdown">',
            '<i class="fa fa-shopping-bag"></i>',
            '<span class="hidden-xs">{{\'Categories\' | r | xlat}}</span>',
            '</a>',
            '<ul class="dropdown-menu">',
            '<div>',
            '<i class="fa fa-caret-up fa-2x"></i>',
            '<i class="fa fa-caret-up fa-2x"></i>',
            '</div>',
            '<li ng-repeat="category in tree">',
            '<a ng-href="catalog/{{category.InteropID}}">',
            '<span>{{category.Name}}</span>',
            '</a>',
            '</li>',
            '</ul>'
        ].join('');
    }
}

CategoryDropdownCtrl.$inject = ['$scope', '$routeParams', 'Category'];
function CategoryDropdownCtrl($scope, $routeParams, Category) {

    if ($routeParams.categoryInteropID) {
        $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
            $scope.categoryLoadingIndicator = false;
        });
    }
    else if($scope.tree){
        $scope.currentCategory ={SubCategories:$scope.tree};
    }


    $scope.$on("treeComplete", function(data){
        if (!$routeParams.categoryInteropID) {
            $scope.currentCategory ={SubCategories:$scope.tree};
        }
    });
}