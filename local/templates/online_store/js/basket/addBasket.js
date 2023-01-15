$( document ).ready(function() {
    $('#searchProduct').click(function () {
        const inputText = $('input[name="codeProduct"]').val();
        if(inputText.length > 0){
            $.ajax({
                url: '/local/templates/online_store/ajax/product.php',
                method: 'post',
                data: {
                    VALUE: inputText
                },
                success: function(data){
                    var result = JSON.parse(data);
                    if(result['ID'] != null && result['NAME'] != null && result['PRICE'] != null){
                        $('.product_container #idProduct').text(result['ID']);
                        $('.product_container #nameProduct').text(result['NAME']).show();
                        $('.product_container #priceProduct').text(result['PRICE'] + " руб.");
                        $('.product_container #countProduct input').attr("data-max-count",result['MAX_QUANTITY']);
                        $('.product_container #countProduct').show();
                        $('.product_container #addToBasket').show();
                    }else {
                        $('.product_container #priceProduct').text("Пожалуйста введите артикул или символьный код товара!");
                        $('.product_container #nameProduct').hide();
                        $('.product_container #countProduct').hide();
                        $('.product_container #addToBasket').hide();
                    }
                }
            });
        }
    })
    $('body .product_container #countProduct input').keyup(function (event) {
        if($(this).val().length <= 1 && parseInt($(this).val()) === 0){
            var nullNumber = $(this).val().replace('0', '1');
            $(this).val(nullNumber);
        }
        if(parseInt($(this).val()) <= $(this).data('max-count') && parseInt($(this).val()) > 0){
            event.preventDefault();
            console.log($(this).val());
        }else{
            var bigNumber = $(this).val().replace($(this).val(), $(this).data('max-count'));
            $(this).val(bigNumber);
        }
    })

    $('#addToBasket').click(function () {
        $.ajax({
            url: '/local/templates/online_store/ajax/product.php',
            method: 'post',
            data: {
                VALUE: "addToBasket",
                ID: $('.product_container #idProduct').text(),
                QUANTITY: $('.product_container #countProduct input').val()
            },
            success: function(data){
                document.location.href = '/personal/cart/'
            }
        });
    })
});