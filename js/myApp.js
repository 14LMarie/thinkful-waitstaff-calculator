angular.module('myApp', [])
    .controller('calculations', ['$scope', function ($scope) {
        $scope.mealCount = 1;

        $scope.submit = function () {
            if ($scope.myForm.$valid) {
                $scope.mealCount++;

                var price = parseFloat($scope.price);
                var tax = parseFloat($scope.tax);
                var tip = parseFloat($scope.tip);

                //customer-charges
                $scope.customerSubtotal = price + (price * (tax / 100));
                $scope.customerTip = $scope.customerSubtotal * (tip / 100);
                $scope.customerTotal = $scope.customerSubtotal + $scope.customerTip;

                //clear user input from form
                $scope.cancelMeal();
            }
        };

        //clear meal details
        $scope.cancelMeal = function () {
            $scope.price = "";
            $scope.tax = "";
            $scope.tip = "";
        };
    }])

.controller('earnings', ['$scope', function ($scope) {
        var meals = [];

        var earningsData = {
            mealCount: 0,
            tipTotal: 0,
            tipAverage: 0
        };

        return {
            addMeal: function (meal) {
                meals.push(meal);
                earningsData.mealCount++;
                earningsData.tipTotal += meal.customerTip;
                earningsData.tipAverage = (earningsData.tipTotal / earningsData.mealCount);
            },
            getMeals: function () {
                return meals;
            },
            getEarningsData: function () {
                return earningsData;
            },
            clearAll: function () {
                meals.length = 0;
                earningsData = {
                    mealCount: 0,
                    tipTotal: 0,
                    tipAverage: 0
                };
            }
        };
    }])
    //define meal count
    //define tip total
    //define tip average
