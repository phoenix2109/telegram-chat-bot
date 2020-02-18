"use strict";
// Class definition

var customerDatabase = function() {
	// Private functions
    // variables
	var datatable;
	// demo initializer
	var init = function() {

		datatable = $('.kt-datatable').KTDatatable({
			data: {
				saveState: {cookie: false},
            },
            // layout definition
			layout: {
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: false, // display/hide footer
			},
			// column sorting
			sortable: true,
			pagination: true,
			search: {
				input: $('#generalSearch'),
				delay: 400,
			},
			columns: [
                {
                    field: 'RecordID',
                    title: 'RecordID',
                    sortable: false,
                    width: 20,
                    selector: {
                        class: 'kt-checkbox--solid'
                    },
                    textAlign: 'center',
                },
                {
					field: '#',
					title: 'ID',
					type: 'number',
					sortable: 'asc',
					width: 30,
				}, {
					field: 'Name',
					title: 'Name',
				}, {
					field: 'Email',
					title: 'Email',
				}, {
					field: 'Password',
					title: 'Password',
					sortable: false
				}, {
					field: 'Phone',
                    title: 'Phone',
                    type: 'number',
					sortable: false
				}, {
					field: 'Facebook',
                    title: 'Facebook',
                    sortable: false
				}, {
					field: 'Address',
                    title: 'Address',
                    sortable: false
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					width: 80,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Admin', 'state': 'danger'},
							2: {'title': 'Manage', 'state': 'primary'},
							3: {'title': 'Member', 'state': 'success'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' +status[row.Type].state + '">' +	status[row.Type].title + '</span>';
					},
				}, {
                    field: "Actions",
                    width: 80,
                    title: "Actions",
                    sortable: false,
                    autoHide: false,
                    overflow: 'visible',
                    template: function() {
                        return '\
                                <div class="dropdown">\
                                    <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
                                        <i class="flaticon-more-1"></i>\
                                    </a>\
                                    <div class="dropdown-menu dropdown-menu-right">\
                                        <ul class="kt-nav">\
                                            <li class="kt-nav__item">\
                                                <a href="#" class="kt-nav__link">\
                                                    <i class="kt-nav__link-icon flaticon2-expand"></i>\
                                                    <span class="kt-nav__link-text">View</span>\
                                                </a>\
                                            </li>\
                                            <li class="kt-nav__item">\
                                                <a href="#" class="kt-nav__link">\
                                                    <i class="kt-nav__link-icon flaticon2-contract"></i>\
                                                    <span class="kt-nav__link-text">Edit</span>\
                                                </a>\
                                            </li>\
                                            <li class="kt-nav__item">\
                                                <a href="#" class="kt-nav__link">\
                                                    <i class="kt-nav__link-icon flaticon2-trash"></i>\
                                                    <span class="kt-nav__link-text">Delete</span>\
                                                </a>\
                                            </li>\
                                            <li class="kt-nav__item">\
                                                <a href="#" class="kt-nav__link">\
                                                    <i class="kt-nav__link-icon flaticon2-mail-1"></i>\
                                                    <span class="kt-nav__link-text">Export</span>\
                                                </a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            ';
                    }
                }
			],
		});
    }
    // search
	var search = function() {
		$('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});
	}

	// selection
	var selection = function() {
		// init form controls
		//$('#kt_form_status, #kt_form_type').selectpicker();

		// event handler on check and uncheck on records
		datatable.on('kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',	function(e) {
			var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes(); // get selected records
			var count = checkedNodes.length; // selected records count

			$('#kt_subheader_group_selected_rows').html(count);
				
			if (count > 0) {
				$('#kt_subheader_search').addClass('kt-hidden');
				$('#kt_subheader_group_actions').removeClass('kt-hidden');
			} else {
				$('#kt_subheader_search').removeClass('kt-hidden');
				$('#kt_subheader_group_actions').addClass('kt-hidden');
			}
		});
	}

	// selected records delete
	var selectedDelete = function() {
		$('#kt_subheader_group_actions_delete_all').on('click', function() {
			// fetch selected IDs
			var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function(i, chk) {
				return $(chk).val();
			});

			if (ids.length > 0) {
				// learn more: https://sweetalert2.github.io/
				swal.fire({
					buttonsStyling: false,

					text: "Are you sure to delete " + ids.length + " selected records ?",
					type: "danger",

					confirmButtonText: "Yes, delete!",
					confirmButtonClass: "btn btn-sm btn-bold btn-danger",

					showCancelButton: true,
					cancelButtonText: "No, cancel",
					cancelButtonClass: "btn btn-sm btn-bold btn-brand"
				}).then(function(result) {
					if (result.value) {
						swal.fire({
							title: 'Deleted!',
							text: 'Your selected records have been deleted! :(',
							type: 'success',
							buttonsStyling: false,
							confirmButtonText: "OK",
							confirmButtonClass: "btn btn-sm btn-bold btn-brand",
						})
						// result.dismiss can be 'cancel', 'overlay',
						// 'close', and 'timer'
					} else if (result.dismiss === 'cancel') {
						swal.fire({
							title: 'Cancelled',
							text: 'You selected records have not been deleted! :)',
							type: 'error',
							buttonsStyling: false,
							confirmButtonText: "OK",
							confirmButtonClass: "btn btn-sm btn-bold btn-brand",
						});
					}
				});
			}
		});		
	}

	var updateTotal = function() {
		datatable.on('kt-datatable--on-layout-updated', function () {
			//$('#kt_subheader_total').html(datatable.getTotalRows() + ' Total');
		});
	};

	return {
		// Public functions
		init: function() {
            init();
			search();
			selection();
			selectedDelete();
			updateTotal();
		},
	};
}();

jQuery(document).ready(function() {
	customerDatabase.init();
});