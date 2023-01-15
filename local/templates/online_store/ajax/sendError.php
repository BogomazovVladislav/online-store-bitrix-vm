<?php
use Bitrix\Main\Mail\Event;
    if(isset($_REQUEST["text"])){
        mail("admin@admin.ru","ошибки на сайте",trim($_REQUEST["text"]));
    }
?>