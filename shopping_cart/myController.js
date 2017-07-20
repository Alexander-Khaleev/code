myApp.controller('myController', function($scope, $http){

  $scope.counter = 0;
  $scope.summa = 0;
  
     $http({method: 'GET', url: 'goods.json'}).
            then(function success(response) {
                $scope.products=response.data.goods;
        });

  $scope.plus = function(index) {
    $scope.products[index].count++;
    $scope.counter++;
    var result = $scope.products[index].zakaz * $scope.products[index].count;
    $scope.products[index].price = result;
    var btn = document.getElementsByClassName('minus');
    btn[index].removeAttribute('disabled', false);
    var zakaz = document.getElementsByClassName('zakaz');
    zakaz[index].style.display='block';
  };

  $scope.minus = function(index) {
    $scope.products[index].count--;
    $scope.counter--;
    var result = $scope.products[index].zakaz * $scope.products[index].count;
    $scope.products[index].price = result;
    if($scope.products[index].count == 0) {
      var btn = document.getElementsByClassName('minus');
      btn[index].setAttribute('disabled', true);
    }
  };

  $scope.total = function() {
   for(i=0; i < $scope.products.length; i++) {
     $scope.summa += $scope.products[i].price;
   }
    var subtotal = angular.element(document.querySelector('#subtotal'));
    var order = angular.element(document.querySelector('#order'));
    subtotal.html($scope.summa);
    order.html($scope.summa);
  };
});
