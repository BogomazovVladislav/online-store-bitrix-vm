<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Добавление товара в корзину");
?>
<div class="search_items">
    <input type="text" name="codeProduct" placeholder="Артикул или Символьный код">
    <button id="searchProduct">поиск</button>
</div>
<div class="product_container">
    <div id="idProduct"></div>
    <div id="nameProduct"></div>
    <div id="priceProduct"></div>
    <div id="countProduct">
        <input type="number" placeholder="Укажите кол-во" data-max-count="">
    </div>
    <div>
        <button id="addToBasket">Добавить</button>
    </div>
</div>
    <script>

    </script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>