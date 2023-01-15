$(document).ready(function() {
    const errorModal = $('#error_modal');
    const errorModalClose = $('#error_modal');
    const errorModalHeaderClose = $('#error_modal .modal-header .btn-close');
    const errorModalFooterSave = $('#error_modal .modal-footer .btn-primary');
    const errorModalBodyP = $('#error_modal .modal-body p');

    errorModalClose.click(function () {
        errorModal.css({'display':'none'});
    });

    errorModalHeaderClose.click(function () {
        errorModal.css({'display':'none'});
    });

    errorModalFooterSave.click(function () {
        $.ajax({
            url: '/local/templates/online_store/ajax/sendError.php',
            method: 'post',
            data: {
                text: errorModalBodyP.text()
            },
            dataType: 'json',
            success: function(data){
                console.log('yes')
            }
        });
    });
});
function get_selected_text() {
    if (window.getSelection()) {
        var select = window.getSelection();
        return select.toString();
    }
}

$(document).keydown(function(event) {
    if (event.ctrlKey && event.which === 13)
    {
        try {
            let getSelectedText = get_selected_text();
            const errorModal = $('#error_modal');
            const errorModalBodyP = $('#error_modal .modal-body p');
            if (typeof getSelectedText !== "undefined" && getSelectedText.length > 0){
                errorModal.css({'display' : 'block'});
                errorModalBodyP.text(getSelectedText);
            }
            e.preventDefault();
        }catch (e) {
            console.log(e);
        }
    }
});
