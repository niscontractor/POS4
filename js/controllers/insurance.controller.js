(function () {
    var companiesController = function ($scope, location, InsuranceDAO, EstimatedRateDAO, $routeParams, InsurancePurchaseDAO, PaymentDetailsDAO) {
        this.welcomeMessage = "hello this is just a test";
        this.startYear = new Date().getFullYear();
        this.plRate = 40;
        this.glRate = 40;
        this.propertyRate = 40;
        this.estimatedRate = 71;
        this.insuranceRate = 65;

        this.policyStartDate = new Date();
        this.types = [{id: "Individual/Sole Proprietor", name: "Individual/Sole Proprietor"}, {id: "Joint Venture", name: "Joint Venture"}, {id: "Limited Liability Company", name: "Limited Liability Company"}, {id: "Partnership", name: "Partnership"},
            {id: "Trust", name: "Trust"}, {id: "Corporation", name: "Corporation"}, {id: "Other Organisation", name: "Other Organisation"}];
        this.currentInsuranceList = [{id: "State Farm Group", name: "State Farm Group"}, {id: "Allstate Insurance Group", name: "Allstate Insurance Group"},
            {id: "Liberty Mutual Insurance Cos.", name: "Liberty Mutual Insurance Cos."}, {id: "Berkshire Hathaway Insurance (includes Geico)", name: "Berkshire Hathaway Insurance (includes Geico)"},
            {id: "Travelers Group", name: "Travelers Group"}, {id: "American International Group", name: "American International Group"}, {id: "Nationwide Group", name: "Nationwide Group"},
            {id: "Progressive Insurance Group", name: "Progressive Insurance Group"}, {id: "Farmers Insurance Group", name: "Farmers Insurance Group"}, {id: "USAA Group", name: "USAA Group"},
            {id: "Hartford Insurance Group", name: "Hartford Insurance Group"}, {id: "Chubb Group of Insurance Cos.", name: "Chubb Group of Insurance Cos."}, {id: "CNA Insurance Cos.", name: "CNA Insurance Cos."},
            {id: "American Familiy Insurance Group", name: "American Familiy Insurance Group"}, {id: "Aliianz of America Auto-Owners Insurance Group", name: "Aliianz of America Auto-Owners Insurance Group"}, {id: "Munich-American Holding Corp.", name: "Munich-American Holding Corp."},
            {id: "Zurich Finanical Services NA Group", name: "Zurich Finanical Services NA Group"}, {id: "Erie Insurance Group", name: "Erie Insurance Group"}, {id: "Ace INA Group", name: "Ace INA Group"},
            {id: "Transatlantic Holdings Inc. Group", name: "Transatlantic Holdings Inc. Group"}, {id: "W.R. Berkley Group", name: "W.R. Berkley Group"}, {id: "The Hanover Insurance Group", name: "The Hanover Insurance Group"},
            {id: "Property & Casualty Cos.", name: "Property & Casualty Cos."}, {id: "MetLife Auto and Home Group", name: "MetLife Auto and Home Group"}, {id: "Cincinnati Insurance Cos.", name: "Cincinnati Insurance Cos."}, {id: "Other", name: "Other"}];

        this.otherLocationOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "More then 10"];
        this.employeesList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10-100", "More then 100"];
        this.equipmentValueList = ["Less then $10k", "$10-20K", "$20-50K", "$50-100K", "More then $100K"];
        this.next12mSalesList = ["Less then $100k", "$100-200K", "$200-500K", "$500-1M", "More then $1M"];
        this.next12mpayrollList = ["Less then $100k", "$100-200K", "$200-500K", "$500-1M", "More then $1M"];
        this.biggestCustomerList = ["Less then $100k", "$100-200K", "$200-500K", "$500-1M", "More then $1M"];

//        this.equipmentValueList = [{id: "1",name:"Less then $10k"},{id: "2",name: "$10-20K"}, {id: "3",name:"$20-50K"},{id: "4",name: "$50-100K"}, {id: "5",name:"More then $100K"}];
//        this.next12mSalesList = [{id: "1",name: "Less then $100k"},{id: "2",name:  "$100-200K"},{id: "3",name:  "$200-500K"},{id: "4",name: "$500-1M"},{id: "5",name:  "More then $1M"}];
//        this.next12mpayrollList = [{id: "1",name: "Less then $100k"},{id: "2",name:  "$100-200K"},{id: "3",name:  "$200-500K"},{id: "4",name: "$500-1M"},{id: "5",name:  "More then $1M"}];
//        this.biggestCustomerList = [{id: "1",name: "Less then $100k"},{id: "2",name:  "$100-200K"},{id: "3",name:  "$200-500K"},{id: "4",name: "$500-1M"},{id: "5",name:  "More then $1M"}];
//        

        this.arrayYears = [];
        this.mindate = new Date();
        var d = new Date();
        this.maxdate = d.setYear(this.mindate.getYear() + 1);
        var ctrl = this;
        ctrl.location = true;
        this.insuranceObject = {startYear: this.startYear, policyStartDate: this.policyStartDate, location: true, claimIn5Years: true, currentlyInsured: true, activityConducted: false, insuranceRate: 70};
        this.estimatedRateObject = {rate: 70, coveragePl: 40, coverageGl: 50, coverageProperty: 70, coveragePlFlag: false, coverageGlFlag: false, coveragePropertyFlag: false};

        this.initializePage = function () {
            if ($routeParams.id != null) {
                InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                    ctrl.insuranceObject = res;
                    if (ctrl.insuranceObject.otherLocation != null) {
                        if (ctrl.insuranceObject.otherLocation == 11) {
                            ctrl.otherLocation = "More then 10";
                        } else {
                            ctrl.otherLocation = ctrl.insuranceObject.otherLocation.toString();
                        }
                    }
                    if (ctrl.insuranceObject.location == "Office") {
                        ctrl.location = true;
                    } else {
                        ctrl.location = false;
                    }
                    EstimatedRateDAO.get({insurance_details_id: ctrl.insuranceObject.id}).then(function (res1) {
                        ctrl.estimatedRateObject = res1;
                    }).catch(function (e) {
                        console.log("Failed to save estimated Rate");
                    });
                }).catch(function (e) {
                    console.log("Failed to save Insurance");
                });

            }
        }

        this.navigateToHomePage = function () {
            //Get Resource for the insurance....
            InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insuranceObject = res;
                if (ctrl.insuranceObject.location == "Office") {
                    ctrl.location = true;
                } else {
                    ctrl.location = false;
                }
                if (ctrl.insuranceObject.otherLocation != null) {
                    if (ctrl.insuranceObject.otherLocation == 11) {
                        ctrl.otherLocation = "More then 10";
                    } else {
                        ctrl.otherLocation = ctrl.insuranceObject.otherLocation.toString();
                    }
                }
                EstimatedRateDAO.get({insurance_details_id: $routeParams.id}).then(function (res1) {
                    ctrl.estimatedRateObject = res1;
                }).catch(function (e) {
                    console.log("Failed to save estimated Rate");
                });
                location.path("/home/" + ctrl.insuranceObject.id);
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
//            ctrl.insuranceObject = {startyear: ctrl.startYear};
            if (ctrl.estimatedRateObject == undefined) {
                ctrl.estimatedRateObject = {rate: 70, coveragePl: 40, coverageGl: 50, coverageProperty: 70};
            }
        }

        this.backButtonForHomePage = function () {
            if (ctrl.biggestCustomer != null) {
                ctrl.insuranceObject.biggestCustomer = ctrl.biggestCustomer.toString();
            }
            if (ctrl.employees != null) {
                ctrl.insuranceObject.employees = ctrl.employees.toString();
            }
            if (ctrl.equipmentValue != null) {
                ctrl.insuranceObject.equipmentValue = ctrl.equipmentValue.toString();
            }
            if (ctrl.next12MSales != null) {
                ctrl.insuranceObject.next12MSales = ctrl.next12MSales.toString();
            }
            if (ctrl.next12MPayroll != null) {
                ctrl.insuranceObject.next12MPayroll = ctrl.next12MPayroll.toString();
            }
            if (ctrl.insuranceObject.policyStartDate != null) {
//                ctrl.insuranceObject.policyStartDate=ctrl.insuranceObject.policyStartDate.getTime();
            }
            if (ctrl.location == true) {
                ctrl.insuranceObject.location = "Office";
            } else {
                ctrl.insuranceObject.location = "Home";
            }
//            ctrl.insuranceObject.insuranceRate = 70;
            ctrl.insuranceObject.id = $routeParams.id;

            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });

            ctrl.estimatedRateObject.insuranceDetails = ctrl.insuranceObject;
//            if ($routeParams.id == null) {
            EstimatedRateDAO.save(ctrl.estimatedRateObject).then(function (res) {
                ctrl.estimatedRateObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save estimated Rate");
            });
//            }
            location.path("/home/" + $routeParams.id);

        }

        this.backButtonForNextPage = function () {
            ctrl.insuranceObject.id = $routeParams.id;
            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });

            location.path("/nextPage/" + $routeParams.id);
        }

        this.backButtonForRatePage = function () {
            ctrl.insuranceObject.id = $routeParams.id;
            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });

            location.path("/ratePage/" + $routeParams.id);
        }

        this.backButtonForPurchaseInsurance = function () {
            InsurancePurchaseDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insurancePurchaseObj = res;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
            location.path("/purchaseInsurance/" + $routeParams.id);
        }
        this.backButtonForreviewInsurance = function () {
            InsurancePurchaseDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insurancePurchaseObj = res;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
            location.path("/reviewInsurance/" + $routeParams.id);
        }
        this.backButtonForPaymentPage = function () {
            InsurancePurchaseDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insurancePurchaseObj = res;
                PaymentDetailsDAO.get({insurance_purchase_details_id: ctrl.insurancePurchaseObj.id}).then(function (res) {
                    ctrl.insurancePurchaseObj = res;
                }).catch(function (e) {
                    console.log("Failed to save Insurance");
                });
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
            location.path("/payment/" + $routeParams.id);
        }

        this.navigateToDetails = function () {
            console.log(ctrl.estimatedRateObject);
            //POST resource for saving the first page object
            if (ctrl.location == true) {
                ctrl.insuranceObject.location = "Office";
            } else {
                ctrl.insuranceObject.location = "Home";
            }
            if (ctrl.otherLocation != null) {
                if (ctrl.otherLocation == "More then 10") {
                    ctrl.insuranceObject.otherLocation = 11;
                } else {
                    ctrl.insuranceObject.otherLocation = parseInt(ctrl.otherLocation);
                }
            }
            ctrl.insuranceObject.insuranceRate = 70;
            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
//                if ($routeParams.id == null) {

                ctrl.estimatedRateObject.insuranceDetails = ctrl.insuranceObject;
                EstimatedRateDAO.save(ctrl.estimatedRateObject).then(function (res) {

                }).catch(function (e) {
                    console.log("Failed to save estimated Rate");
                });
//                }
                location.path("/nextPage/" + ctrl.insuranceObject.id);
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
        }

        this.initPage2 = function () {
            InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insuranceObject = res;
                if (ctrl.insuranceObject.location == "Office") {
                    ctrl.insuranceObject.location = true;
                } else {
                    ctrl.insuranceObject.location = false;
                }
                if (ctrl.insuranceObject.biggestCustomer != null) {
                    ctrl.biggestCustomer = ctrl.setSliderValues1Reverse(ctrl.insuranceObject.biggestCustomer);
                    var select = $("#minbeds2");
                    var slider = $("#slider2");
                    select[ 0 ].selectedIndex = ctrl.setSliderValues1(ctrl.insuranceObject.biggestCustomer);
                    slider.slider("value", ctrl.setSliderValues1(ctrl.insuranceObject.biggestCustomer));
                }
                if (ctrl.insuranceObject.employees != null) {
                    ctrl.employees = (ctrl.insuranceObject.employees);
                    var select = $("#minbeds4");
                    var slider = $("#slider4");
                    select[ 0 ].selectedIndex = ctrl.setSliderValues3(ctrl.insuranceObject.employees);
                    slider.slider("value", ctrl.setSliderValues3(ctrl.insuranceObject.employees));
                }
                if (ctrl.insuranceObject.equipmentValue != null) {
                    ctrl.equipmentValue = ctrl.setSliderValues2Reverse(ctrl.insuranceObject.equipmentValue);
                    var select = $("#minbeds3");
                    var slider = $("#slider3");
                    select[ 0 ].selectedIndex = ctrl.setSliderValues2(ctrl.insuranceObject.equipmentValue);
                    slider.slider("value", ctrl.setSliderValues2(ctrl.insuranceObject.equipmentValue));
                }
                if (ctrl.insuranceObject.next12MSales != null) {
                    ctrl.next12MSales = ctrl.setSliderValues1Reverse(ctrl.insuranceObject.next12MSales);
                    var select = $("#minbeds");
                    var slider = $("#slider");
                    select[ 0 ].selectedIndex = ctrl.setSliderValues1(ctrl.insuranceObject.next12MSales);
                    slider.slider("value", ctrl.setSliderValues1(ctrl.insuranceObject.next12MSales));
                }
                if (ctrl.insuranceObject.next12MPayroll != null) {
                    ctrl.next12MPayroll = ctrl.setSliderValues1Reverse(ctrl.insuranceObject.next12MPayroll);
                    var select = $("#minbeds1");
                    var slider = $("#slider1");
                    select[ 0 ].selectedIndex = ctrl.setSliderValues1(ctrl.insuranceObject.next12MPayroll);
                    slider.slider("value", ctrl.setSliderValues1(ctrl.insuranceObject.next12MPayroll));
                }

                EstimatedRateDAO.get({insurance_details_id: $routeParams.id}).then(function (res1) {
                    ctrl.estimatedRateObject = res1;
                }).catch(function (e) {
                    console.log("Failed to save estimated Rate");
                });
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
        }

        this.setSliderValues1 = function (val) {
            if (val == "Less then $100k") {
                return 1;
            } else if (val == "$100-200K") {
                return 2;
            } else if (val == "$200-500K") {
                return 3;
            } else if (val == "$500-1M") {
                return 4;
            } else if (val == "More then $1M") {
                return 5;
            } else {
                return parseInt(val);
            }
        }

        this.setSliderValues1Reverse = function (val) {
            if (val == 1) {
                return "Less then $100k";
            } else if (val == 2) {
                return "$100-200K";
            } else if (val == 3) {
                return "$200-500K";
            } else if (val == 4) {
                return "$500-1M";
            } else if (val == 5) {
                return "More then $1M";
            } else {
                return val;
            }
        }

        this.setSliderValues2 = function (val) {
            if (val == "Less then $10k") {
                return "1";
            } else if (val == "$10-20K") {
                return  "2";
            } else if (val == "$20-50K") {
                return  "3";
            } else if (val == "$50-100K") {
                return  "4";
            } else if (val == "More then $100K") {
                return  "5";
            } else {
                return parseInt(val);
            }

        }
        
        this.setSliderValues2Reverse = function (val) {
            console.log(val);
            if (val == 1) {
                return "Less then $10k";
            } else if (val == 2) {
                return "$10-20K";
            } else if (val == 3) {
                return "$20-50K";
            } else if (val == 4) {
                return "$50-100K";
            } else if (val == 5) {
                return "More then $100K";
            } else {
                return val;
            }
        }
        
        this.setSliderValues3 = function (val) {
            if (val == "More then 100") {
                return "11";
            } else if (val == "10-100") {
                return  "10";
            } else {
                return  val;
            }

        }

        this.navigateToRatePage = function () {
            //POST resource for saving the secind page object
            if (ctrl.biggestCustomer != null) {
                ctrl.insuranceObject.biggestCustomer = ctrl.biggestCustomer.toString();
            }
            if (ctrl.employees != null) {
                ctrl.insuranceObject.employees = ctrl.employees.toString();
            }
            if (ctrl.equipmentValue != null) {
                ctrl.insuranceObject.equipmentValue = ctrl.equipmentValue.toString();
            }
            if (ctrl.next12MSales != null) {
                ctrl.insuranceObject.next12MSales = ctrl.next12MSales.toString();
            }
            if (ctrl.next12MPayroll != null) {
                ctrl.insuranceObject.next12MPayroll = ctrl.next12MPayroll.toString();
            }
            if (ctrl.insuranceObject.policyStartDate != null) {
//                ctrl.insuranceObject.policyStartDate=ctrl.insuranceObject.policyStartDate.getTime();
            }
            if (ctrl.insuranceObject.location == true) {
                ctrl.insuranceObject.location = "Office";
            } else {
                ctrl.insuranceObject.location = "Home";
            }
//            ctrl.insuranceObject.insuranceRate = 70;
            ctrl.insuranceObject.id = $routeParams.id;

            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });

            ctrl.estimatedRateObject.insuranceDetails = ctrl.insuranceObject;
//            if ($routeParams.id == null) {
            EstimatedRateDAO.save(ctrl.estimatedRateObject).then(function (res) {
                ctrl.estimatedRateObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save estimated Rate");
            });
//            }
            //then move to the needed page
            location.path("/ratePage/" + $routeParams.id);

        }

        this.initRatePage = function () {
            InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insuranceObject = res;
            }).catch(function (e) {
                console.log("Failed to get Insurance");
            });

        }

        this.navigatetoInsurancePurchasePage = function () {
            ctrl.insuranceObject.id = $routeParams.id;
            InsuranceDAO.save(ctrl.insuranceObject).then(function (res) {
                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });

            location.path("/purchaseInsurance/" + $routeParams.id);
        }

        this.initPurchaseInsurance = function () {
            InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insuranceObject = res;
            }).catch(function (e) {
                console.log("Failed to get Insurance");
            });
            InsurancePurchaseDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insurancePurchaseObj = res;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
        }

        this.navigateToReviewBuyPage = function () {
            InsuranceDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insuranceObject = res;
            }).catch(function (e) {
                console.log("Failed to get Insurance");
            });
            ctrl.insurancePurchaseObj.insuranceDetails = ctrl.insuranceObject;
            InsurancePurchaseDAO.save(ctrl.insurancePurchaseObj).then(function (res) {
                ctrl.insurancePurchaseObj.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
            location.path("/reviewInsurance/" + $routeParams.id);
        }

        this.initPaymentPage = function () {
            InsurancePurchaseDAO.get({id: $routeParams.id}).then(function (res) {
                ctrl.insurancePurchaseObj = res;
                EstimatedRateDAO.get({insurance_details_id: $routeParams.id}).then(function (res1) {
                    ctrl.estimatedRateObject = res1;
                }).catch(function (e) {
                    console.log("Failed to save estimated Rate");
                });
                PaymentDetailsDAO.get({insurance_purchase_details_id: ctrl.insurancePurchaseObj.id}).then(function (res) {
                    ctrl.paymentObj = res;
                }).catch(function (e) {
                    console.log("Failed to save Insurance");
                });
            }).catch(function (e) {
                console.log("Failed to save Insurance");
            });
        }

        this.navigateToPaymentPage = function () {
            ctrl.paymentObj = {};
            EstimatedRateDAO.get({insurance_details_id: $routeParams.id}).then(function (res1) {
                ctrl.estimatedRateObject = res1;
            }).catch(function (e) {
                console.log("Failed to save estimated Rate");
            });
            location.path("/payment/" + $routeParams.id);
        }

        this.navigateToThankyouPage = function () {
            ctrl.paymentObj.insurancePurchaseDetails = ctrl.insurancePurchaseObj;
            if (ctrl.paymentObj.cardExpiryMonth != null) {
                ctrl.paymentObj.cardExpiryMonth = parseInt(ctrl.paymentObj.cardExpiryMonth);
            }
            if (ctrl.paymentObj.cardSecurityCode != null) {
                ctrl.paymentObj.cardSecurityCode = parseInt(ctrl.paymentObj.cardSecurityCode);
            }
            EstimatedRateDAO.get({insurance_details_id: $routeParams.id}).then(function (res1) {
                ctrl.estimatedRateObject.id = res1.id;
//                ctrl.estimatedRateObject = res1;
            }).catch(function (e) {
                console.log("Failed to save estimated Rate");
            });
            EstimatedRateDAO.save(ctrl.estimatedRateObject).then(function (res) {
                ctrl.estimatedRateObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save estimated Rate");
            });
            PaymentDetailsDAO.save(ctrl.paymentObj).then(function (res) {
//                ctrl.insuranceObject.id = res.id;
            }).catch(function (e) {
                console.log("Failed to save Payment Details");
            });
            location.path("/finalPage/" + $routeParams.id);
        }

        $scope.auto = {
            clearFlag: true,
            select: function (event, ui) {
                $scope.companies.insuranceObject.startYear = ui.item.label;
                $scope.auto.selected = ui.item;
                $scope.$apply();
            },
            source: function (request, response) {
                var results = [];
                angular.forEach(ctrl.arrayYears, function (value) {
                    if (value.startsWith($scope.companies.insuranceObject.startYear)) {
                        results.push(value);
                    }
                });
                response(results);
            }
        };

        this.calculateYears = function (startYear) {

            var startYearString = "";
            if (startYear == null) {
                startYearString = new Date().getFullYear().toString();
                startYear = new Date().getFullYear().toString();
            }
            while (startYearString != "1989") {
                ctrl.arrayYears.push(startYearString);
                startYear -= 1;
                startYearString = startYear.toString();
            }
            ctrl.arrayYears.push("before 1990");
        }
        this.calculateYears();
    };
    angular.module('insurance.controllers').controller('CompaniesController', ['$scope', '$location', 'InsuranceDAO', 'EstimatedRateDAO', '$routeParams', 'InsurancePurchaseDAO', 'PaymentDetailsDAO', companiesController]);
})();