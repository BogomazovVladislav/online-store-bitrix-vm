<?php


class CBasket
{
    private static function getId($value)
    {
        \Bitrix\Main\Loader::includeModule("iblock");
        $res = CIBlockElement::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID"=>3,
                array('LOGIC'=>'OR',
                    array("ID" => $value),
                    array("CODE" => $value),
                    array("PROPERTY_ARTNUMBER" => $value)
                )),
            false,
            false,
            array("ID")
        )->Fetch();
        return $res['ID'];
    }
    public static function getProductArr($value): array
    {
        \Bitrix\Main\Loader::includeModule("catalog");
        $getProduct = \Bitrix\Catalog\ProductTable::getList(array(
            'filter' => array('=ID'=>CBasket::getId($value)),
            'select' => array('ID','QUANTITY','NAME'=>'IBLOCK_ELEMENT.NAME','CODE'=>'IBLOCK_ELEMENT.CODE'),
        ))->fetch();

        $getPrice = \Bitrix\Catalog\PriceTable::getList([
            "select" => ['PRICE'],
            "filter" => [
                "=PRODUCT_ID" => CBasket::getId($value),
            ],
            "order" => ["CATALOG_GROUP_ID" => "ASC"]
        ])->fetch();

        return [
            'ID' => $getProduct['ID'],
            'NAME' => $getProduct['NAME'],
            'MAX_QUANTITY' => $getProduct['QUANTITY'],
            'PRICE' => $getPrice['PRICE']
        ];
    }
    public static function addBasketOneProduct($id,$quantity)
    {
        \Bitrix\Main\Loader::includeModule("catalog");
        Add2BasketByProductID(
            $id,
            $quantity,
            array()
        );
    }
}
