angular.module('myApp', [])
    .controller('calculations', ['$scope', function ($scope) {



        $scope.submit = function () {
            console.log($scope.submit)
            var meals = [];
            var price = parseFloat($scope.price);
            var tax = parseFloat($scope.tax);
            var tip = parseFloat($scope.tip);
            //console.log(meal.price)

            if ($scope.myForm.$valid) {
                //customer-charges

                var subtotal = price + (price * (tax / 100));
                var tipTotal = subtotal * (tip / 100);
                var total = subtotal + tip;




                console.log()
                    //earnings-info
                    /*$scope.earnings.tipTotal =
                        $scope.earnings.mealCount =
                        $scope.earnings.average =*/
            }
        };


        //clear meal data
        /*var defaultForm = {
            price: "",
            tax: "",
            tip: ""
        }
        $scope.resetForm = function ()
        $scope.meal = defaultForm;
        $scope.myForm.$setPristine();
        $scope.myForm.$setValidity();
        $scope.myForm.$setUntouched(); */
        //reset all data


    }])
