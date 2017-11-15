//var ppeApp = angular.module('ppeApp', ['ui.router', 'ngAnimate', 'oc.lazyLoad']);
ppeApp.controller("InspectionsDueCtrl", ['$rootScope', '$scope', '$state', '$location', 'commonFiltersService', 'appService',
function ($rootScope, $scope, $state, $location, commonFiltersService, appService, Flash) {
    $scope.pageName = "Inspections Due";
    $scope.pageURL = "inspectionsDue";

    commonFiltersService.getFiltersTableData($scope.pageURL).then(function(data) {
        data && populateInspectionDueTable(data);
    }, function(err) {
        debugger;
    });


    function populateInspectionDueTable(data) {
        
        var dataTable  = $("#table_inspectionsDue").DataTable({
                       "sPaginationType": "full_numbers",
                       "bSort": true,
                       "bFilter": true,
                       "bLengthChange": true,
                        dom: 'lfrtip',
                       /*"pageLength": 5,*/
                       "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All' ]],
                       "bAutoWidth" : false,
                       "oLanguage" : {
                            "sSearch": '<a class="custom-search-icon" id="searchBtn"><i class="fa fa-search"></i></a>'
                       },
                        buttons: [
                            {
                                extend:    'excelHtml5',
                                text:      '<i class="fa fa-file-excel-o"></i>',
                                titleAttr: 'Excel',
                                className: 'btn btn-flat btn-default'
                            },
                            {
                                extend:    'pdfHtml5',
                                text:      '<i class="fa fa-file-pdf-o"></i>',
                                titleAttr: 'PDF',
                                className: 'btn btn-flat btn-default'
                            }
                        ],
                        "aoColumns": [
                                    {
                                        class : 'details-control',
                                        sDefaultContent : '',
                                        bSortable: false,
                                        sWidth : '3%'
                                    },
                                   {
                                       mDataProp: 'srno',
                                       sDefaultContent: '-',
                                       "render": function(data, type, row, meta){
                                            var dataLink = '<a href="javascript:void(0)" class="achr-srno">' + data + '</a>';
                                            return dataLink;
                                        }
                                    },
                                   {
                                       mDataProp: 'product',
                                       sDefaultContent: '-',
                                       "render": function(data, type, row, meta){
                                            var productDiv = '<div class="product-name-table">' + row.product + '</div><div class="brand-name-table">' + row.brand + '</div><div class="item-name-table">' + row.item + '</div>' ;
                                            return productDiv;
                                        }
                                   },
								   {
                                       mDataProp: 'insepectionDueDate',
                                       sDefaultContent: '-',
                                       "render": function(data, type, row, meta){
                                            var formattedDate = commonFiltersService.getFormattedDate(data);
                                            var b    = new Date(formattedDate); // Or any other JS date
                                            var remainingDays = null;
                                            remainingDays  = commonFiltersService.dateDiffInDays(b);

                                            console.log(remainingDays);
                                            // a and b are javascript Date objects
                                            var dateDiv = '<div class="wrapper-days-circle row MA-0">\
                                                           <div class="pull-left days-circle" title="Days due for inspection">'+ remainingDays +'</div>\
                                                           <div class="pull-left due-date">' + data + '</div>\
                                                           </div>' ;
                                            return dateDiv;
                                        }

                                   },
								   {
                                       sDefaultContent: '<button class="btn btn-success">Insepct Now</button>'
                                   },
                                   
                               ],
                               "aaData": data,
                               "bDestroy": true,
                               "rowCallback" : function(row, data, dataIndex) {
                                    var days = $(row).find("td:eq(3)").find("div.days-circle").text() && Number($(row).find("td:eq(3)").find("div.days-circle").text());

                                    if (days > 10) {
                                        $(row).find("td:eq(3)").find("div.days-circle").addClass('green-days-circle');
                                    } else if (days > 5) {
                                        $(row).find("td:eq(3)").find("div.days-circle").addClass('amber-days-circle');
                                    } else if (days <= 5 && days >=0) {
                                        $(row).find("td:eq(3)").find("div.days-circle").addClass('red-days-circle');
                                    } else if (days < 0) {
                                        var iconWarning = "<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i>";
                                        $(row).find("td:eq(3)").find("div.days-circle").addClass('red-days-circle').text("").append(iconWarning);
                                        $(row).find("td:eq(4)").find("button").addClass('disabled');
                                    }
                               }
                    } );

                    $(document).off( 'click', 'a.achr-srno');
                    $(document).on( "click", 'a.achr-srno', function(){
                            var selSrNo = $(this).closest('tr').index();
                            loadItemDescriptionModal(selSrNo, data);
                    } );
    }

    function loadItemDescriptionModal(srNo, data) {
        $scope.selecetdItemData = null;
        $scope.isDisabledInspectNow = false;
        if(data && srNo !== null) {
            $scope.selecetdItemData = data[srNo];
        }
        var formattedDate = commonFiltersService.getFormattedDate($scope.selecetdItemData.insepectionDueDate);
        var b    = new Date(formattedDate); // Or any other JS date
        var remainingDays = null;
        remainingDays  = commonFiltersService.dateDiffInDays(b);
        $("#itemDescModal").modal({
            backdrop: false,
            keyboard: false
        });

        if(remainingDays !== null && remainingDays < 0) {
            $scope.isDisabledInspectNow = true;
        }
        $scope.$apply();
    }

    
}]);

