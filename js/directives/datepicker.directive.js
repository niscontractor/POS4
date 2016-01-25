(function() {
    var datePickerDir = function($filter, $timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: "=",
                dateObj: "=",
                maxDate: "=",
                minDate: "="
            },
            link: function(scope, element, attrs, ngModelCtrl) {
                $(function() {
                    element.datepicker({
                        dateFormat: 'dd/mm/yy',
                        onSelect: function(date) {
                            scope.$apply(function() {
                                scope.dateObj = element.datepicker("getDate").getTime();
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(date);
                                    element.blur();
                                });

                            });
                        }
                    });
                });

                if (ngModelCtrl) { // Don't do anything unless we have a model
                    ngModelCtrl.$formatters.push(function(value) {

                        return $filter('date')(value, 'dd/MM/yyyy');
                    });
                }
                scope.$watch("ngModel", function(value) {
                    if (value != null)
                    {
                        if (value == "") {
                            scope.dateObj = "";
                        } else {
                            scope.dateObj = element.datepicker("getDate").getTime();
                        }
                    }

                });
                var dateWatch = scope.$watch("dateObj", function(value) {

                    if (value !== undefined && value !== null) {
                        element.datepicker("setDate", new Date(value));
                        scope.ngModel = value;
                        dateWatch();
                    }
                });

                if (angular.isDefined(attrs.maxDate)) {
                    scope.$watch("maxDate", function(value) {
                        element.datepicker("option", "maxDate", value);
                    });
                }
                if (angular.isDefined(attrs.minDate)) {
                    scope.$watch("minDate", function(value) {
                        element.datepicker("option", "minDate", value);
                    });
                }
            }
        }
    };
    angular.module('insurance.directives').directive('datepicker', ['$filter', '$timeout', datePickerDir]);
})();

