(function () {
    var autocompDir = function ($parse, $timeout) {

        return {
            restrict: 'A',
            require: '^?form',
            link: function (scope, element, attrs, formCtrl) {
                scope.dirVar = scope.$eval(attrs.esgAutoComplete) || {};
                if (angular.isUndefined(scope.dirVar.select)) {
                    scope.dirVar.select = function (event, ui) {
                        scope.$apply(function (scope) {
                            $parse(attrs.ngModel).assign(scope, ui.item.value);
                            if (angular.isDefined(attrs.ngEnter)) {
                                $timeout(function () {
                                    scope.$eval(attrs.ngEnter);
                                });
                            }
                        });
                        if (angular.isDefined(attrs.ngBlur)) {
                            $(element).blur();
                        }
                    };
                }

                $(element).on("autocompletechange", function (event, ui) {
                    if (scope.$eval(attrs.esgAutoComplete).clearFlag) {
                        if (ui.item) {
                            return;
                        }
                        if ($(element).data("uiAutocomplete").widget().children(".ui-menu-item").length === 0) {
                            scope.$apply(function (scope) {
                                $parse(attrs.ngModel).assign(scope, "");
                            });
                        } else if (ui.item != null) {
                            selectItem();
                        } else {
                            if ($(element).data("uiAutocomplete").widget().children(".ui-menu-item").length == 1) {
                                selectItem();
                            } else {
                                $parse(attrs.ngModel).assign(scope, "");
                            }
                        }
                    }
                });

                function selectItem() {
                    $(element).data("uiAutocomplete").widget().children(".ui-menu-item").each(function () {

                        var item = $(this).data("uiAutocompleteItem");
                        var opt;
                        scope.$apply(function (scope) {
                            opt = $parse(attrs.ngModel)(scope);
                        });
                        if (item && item.label) {

                            if (item.label.toLowerCase().indexOf(opt.toLowerCase()) < 0) {
                                scope.$apply(function (scope) {
                                    $parse(attrs.ngModel).assign(scope, '');
                                });
                                return false;
                            }
                            else {
                                $(element).data("uiAutocomplete")._trigger("select", event, {item: item});
                                scope.$apply(function (scope) {
                                    $parse(attrs.ngModel).assign(scope, item.label);
                                });
                                return false;
                            }
                        } else {
                            $parse(attrs.ngModel).assign(scope, "");
                        }
                    });
                }
//                scope.dirVar.autoFocus = true;
                scope.dirVar.minLength = 0;
                $(element).autocomplete(scope.dirVar);
                $(element).click(function () {
                    if (angular.isDefined(formCtrl)) {
                        formCtrl.$dirty = true;
                    }
                    if ($parse(attrs.ngModel)(scope) == null) {
                        $(element).autocomplete("search", "");
                    }
                    else {
                        $(element).autocomplete("search", $parse(attrs.ngModel)(scope));
                    }
                });
            }
        };
    };
    angular.module('insurance.directives', []).directive('esgAutoComplete', ['$parse', '$timeout', autocompDir]);
})();