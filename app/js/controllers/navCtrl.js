four51.app.controller('NavCtrl', ['$routeParams', '$sce', '$scope', '$451', '$location', '$route', 'User', 'Security', 'Category', 'Product',
function ($routeParams, $sce, $scope, $451, $location, $route, User, Security, Category, Product) {
    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login();
        }
    };

	$scope.refreshUser = function() {
		store.clear();
	}

    // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
    };
    // extension of above isActive in path
    $scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };

	$scope.Clear = function() {
		localStorage.clear();
	}

	$scope.$on('event:orderUpdate', function(event, order) {
		$scope.cartCount = order ? (order.Status == 'Unsubmitted') ? order.LineItems.length : null : null;
	});

    $scope.searchType = 'Product Search';

    $scope.customSearch = function(term, type) {
        if(type == 'Product Search') {
            $location.path('/search/' + term);
        }
    };

    $scope.AuthToken = Security.auth();


    /*category ctrl stuff*/

    $scope.$watch('settings.currentPage', function(n, o) {
        if (n != o || (n == 1 && o == 1))
            _search();
    });

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
}]);