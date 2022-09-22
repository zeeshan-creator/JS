 
    $(document).ready(function() {

        // Date range picker by jquery UI by ZK
        let firstFilterValue;
        let secondFilterValue;
        let formIndex;
        let dateRange;
        let first_part;
        let second_part;
        let inbetween_option;

        const allDateColoumns = ["contact_date", "birthday", "updated_date", "created_date", "validation_date", "prospect_lost_date"];

        // default Function
        function showAndHideInBetween() {
            let len_first_fields = $(".selectpicker.first-part").length;
            let len_second_fields = $(".selectpicker.second-part").length;

            for (let i = 0; i <= len_first_fields; i++) {

                first_part = $(`select[data-first-part='${i}']`).val();

                if (first_part != '' && first_part != null) {
                    if (allDateColoumns.includes(first_part)) {
                        showInBetween(i);

                        singleCalneder(i);
                        dateRange.prop('required', true);
                    } else {
                        hideInBetween(i);
                    }
                } else {
                    hideInBetween(i);
                }
            }

            for (let i = 0; i <= len_second_fields; i++) {
                first_part = $(`select[data-first-part='${i}']`).val();
                second_part = $(`select[data-second-part='${i}']`).val();
                dateRange = $(`input[data-form-index='${i}']`);

                if (second_part != '' && second_part != undefined && second_part != null) {
                    if (allDateColoumns.includes(first_part) && second_part == "in_between") {
                        doubleCalender(i);
                        dateRange.prop('required', true);
                    }
                }
            }

        }

        showAndHideInBetween();

        // On change event listener for second field
        $(document).on('change', '.selectpicker.second-part', function() {

            formIndex = $(this).data("form-index");
            secondFilterValue = this.value;
            firstFilterValue = $(`select[data-first-part='${formIndex}']`).val();
            dateRange = $(`input[data-form-index='${formIndex}']`);


            if (secondFilterValue != "in_between" && allDateColoumns.includes(firstFilterValue)) {
                dateRange.val("");
                dateRange.prop('required', true);
                singleCalneder(formIndex);
            }

            if (secondFilterValue == "in_between" && allDateColoumns.includes(firstFilterValue)) {
                dateRange.val("");
                dateRange.prop('required', true);
                doubleCalender(formIndex);
            }

            if (!allDateColoumns.includes(firstFilterValue)) {
                dateRange.datepicker("destroy");
                dateRange.attr('type', 'text');
                dateRange.val("");
            };
        });

        // On change event listener for first field
        $(document).on('change', '.selectpicker.first-part', function() {

            firstFilterValue = this.value;
            formIndex = $(this).data("form-index");
            dateRange = $(`input[data-form-index='${formIndex}']`);
            second_part = $(`select[data-second-part='${formIndex}']`);

            if (allDateColoumns.includes(firstFilterValue)) {
                showInBetween(formIndex);

                $(`select[data-second-part='${formIndex}']`).val("in_between");
                $(`select[data-second-part='${formIndex}']`).selectpicker("refresh");
                doubleCalender(formIndex);
                dateRange.attr('placeholder', 'Select a date');

                dateRange.val("");
                dateRange.prop('required', true);
                dateRange.datepicker();

            } else {
                hideInBetween(formIndex);
                second_part.val('');
                second_part.selectpicker('refresh');

                dateRange.datepicker("destroy");
                dateRange.attr('placeholder', 'Text for search');
                dateRange.attr('type', 'text');
                dateRange.removeAttr('required');
                dateRange.val("");
            };

        });


        $("#form_filter").submit(function(e) {
            let numberOfErrForInbetween = 0;
            let len_second_fields = $(".selectpicker.second-part").length;

            for (let i = 0; i <= len_second_fields; i++) {
                first_part = $(`select[data-first-part='${i}']`).val();
                second_part = $(`select[data-second-part='${i}']`).val();
                dateRange = $(`input[data-form-index='${i}']`).val();

                if (second_part != '' && second_part != undefined && second_part != null) {
                    if (allDateColoumns.includes(first_part) && second_part == "in_between") {
                        if (!dateRange.includes('-')) {
                            numberOfErrForInbetween++;
                        }
                    }
                }
            }
            if (numberOfErrForInbetween <= 0) {
                e.currentTarget.submit();
            } else {
                e.preventDefault();
                alert(`Please select proper date for 'In between' options`);
            }
        });

        // local functions
        function hideInBetween(formIndex) {
            inbetween_option = $(`option[data-inbetween-option='${formIndex}']`);
            inbetween_option.hide();
            $(`select[data-second-part='${formIndex}']`).selectpicker("refresh");
        }

        function showInBetween(formIndex) {
            inbetween_option = $(`option[data-inbetween-option='${formIndex}']`);
            inbetween_option.removeAttr("style");
            inbetween_option.show();
            $(`select[data-second-part='${formIndex}']`).selectpicker("refresh");
        }


        function singleCalneder(formIndex) {
            dateRange = $(`input[data-form-index='${formIndex}']`);
            dateRange.datepicker("destroy");
            dateRange.datepicker();
        }

        function doubleCalender(formIndex) {
            dateRange = $(`input[data-form-index='${formIndex}']`);
            dateRange.datepicker("destroy");
            dateRange.datepicker({
                numberOfMonths: 2,
                onSelect: function(selectedDate) {
                    if (!$(this).data().datepicker.first) {
                        $(this).data().datepicker.inline = true
                        $(this).data().datepicker.first = selectedDate;
                    } else {
                        if (selectedDate > $(this).data().datepicker.first) {
                            $(this).val($(this).data().datepicker.first + " - " + selectedDate);
                        } else {
                            $(this).val(selectedDate + " - " + $(this).data().datepicker.first);
                        }
                        $(this).data().datepicker.inline = false;
                    }
                },
                onClose: function() {
                    delete $(this).data().datepicker.first;
                    $(this).data().datepicker.inline = false;
                }
            })
        }
    });
