var app = angular.module('myApp', [])

app.service('earnings', function () {
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
            console.log(earningsData)
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

app.controller('detailsController', function ($scope, earnings) {
    $scope.mealCount = 1;

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
            earnings.addMeal(meal);

            //clear user input from form
            $scope.cancelMeal();
        };
    };
});


app.controller('chargesController', function ($scope, earnings) {
    $scope.getMeals = function () {
        var meals = earnings.getMeals();
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


app.controller('earningsController', function ($scope, earnings) {
    $scope.mealCount = earningsData.mealCount;
    $scope.tipTotal = earningsData.getEarningsData().tipTotal;
    $scope.tipAverage = earningsData.getEarningsData().tipAverage;

});


//rest entire calculator
app.controller('resetController', function ($scope, earnings) {
    $scope.clearAll = function () {
        earnings.clearAll();
    };
});
