<?php
define('STOP_STATISTICS', true);
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');
$GLOBALS['APPLICATION']->RestartBuffer();
    if (isset($_REQUEST['VALUE']) && $_REQUEST['VALUE'] != 'addToBasket'){
        echo json_encode(CBasket::getProductArr(htmlspecialchars(trim($_REQUEST['VALUE']))));
    }else if(isset($_REQUEST['ID']) && isset($_REQUEST['QUANTITY']) && $_REQUEST['VALUE'] == 'addToBasket'){
        CBasket::addBasketOneProduct($_REQUEST['ID'],$_REQUEST['QUANTITY']);
    }
?>
