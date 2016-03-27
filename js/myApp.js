var app = angular.module('myApp', [])

app.service('earningsService', function () {
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
            earningsData.tipTotal += meal.tip;
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
});

app.controller('detailsController', function ($scope, earningsService) {
    $scope.mealCount = 1;

    $scope.getMealCount = function () {
        var meals = earningsService.getMeals();
        console.log(meals);
        if (typeof meals != "undefined" && meals !== null && meals.length > 0) {
            $scope.mealCount = meals.length + 1;
        }
    };

    $scope.getMealCount();

    //clear meal details
    $scope.cancelMeal = function () {
        $scope.price = "";
        $scope.tax = "";
        $scope.tip = "";
    };

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

            var meal = {
                subtotal: $scope.customerSubtotal,
                tip: $scope.customerTip,
                total: $scope.customerTotal
            };
            earningsService.addMeal(meal);

            //clear user input from form
            $scope.cancelMeal();
        };
    };
});


app.controller('chargesController', function ($scope, earningsService) {
    console.log(earningsService);
    $scope.getMeals = function () {
        var meals = earningsService.getMeals();
        $scope.meals = meals;
        console.log($scope.meals);
    };

    $scope.getMeals();

    $scope.mealCount = $scope.meals.length;

    $scope.avoidZero = function () {
        if ($scope.mealCount === 0) {
            $scope.mealCount = 1;
        }
    };

    $scope.avoidZero();

});


app.controller('earningsController', function ($scope, earningsService) {
    $scope.mealCount = earningsService.getEarningsData().mealCount;
    $scope.tipTotal = earningsService.getEarningsData().tipTotal;
    $scope.tipAverage = earningsService.getEarningsData().tipAverage;

});


//rest entire calculator
app.controller('resetController', function ($scope, earningsService) {
    $scope.clearAll = function () {
        earningsService.clearAll();
    };
});
