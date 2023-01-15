# Тестовое задание на позицию младшего программиста PHP #
___
## Поставить решение «Интернет-магазин» из дистрибутива «1С-Битрикс:Управление сайтом - Бизнес». ##

1. Реализовать функционал сообщения об ошибке на сайте. Пользователь,
находясь на любой странице сайта, выделяет текст с ошибкой и нажимает
Ctrl+Enter. В ответ отображается окно подтверждения отправки сообщения
об ошибке. После подтверждения, выделенный текст отправляется на
электронную почту.
2. Реализовать сравнение товаров. В карточке товара должен быть индикатор
«уже в сравнении», отдельная страница со сравнением выбранных товаров
одинаковые характеристики товаров не должны отображаться при
сравнении.
3. Реализовать функционал добавления товара в корзину по коду товара.
Пользователь, переходит на новую страницу, в поле ввода указывает код
товара и в ответ отображается название и цена товара. Указывает
количества товара и нажимает кнопку "Добавить", в результате товар
добавляется в корзину.
___
Создать проект в github или gitlab. В проект добавить только новые и измененные
файлы (важно, весь bitrix грузить в проект не надо). Пояснение по реализации,
настройке и использованию указать в файле readme.md.
Открыть публичный доступ к проекту и предоставить ссылку на проект.
___
## Настройка проекта ##

[разворачиваем bitrixvm](https://jehost.ru/poleznaya-informatsiya/rabota-s-bitrixvm.html) или устанавливаем решение на хостинг

[ссылка на бэкап](https://drive.google.com/drive/folders/1MdomhEE_FVgi169Be3QY_mX71ipjT69g?usp=share_link) 

## Реализация ##
___

1. [send_message.js](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/js/modal/send_message.js) скрипты для работы (jquery). В начале файла идет обработка модального окна и отправки [ajax запроса](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/include/footer). Функция get_selected_text() возращает текст который пользователь выделил на странице. $(document).keydown привязываем событие на обработку клавишь. *event.ctrlKey && event.which === 13* проверяем нажата ли сейчас комбинация CTRL+ENTER сохраняем текст в модальное окно. Отправку сообщения сделал через функцию mail()
2. [Включил стандартное сравнение](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/catalog/index.php) "USE_COMPARE" => "Y" и в массиве "SEF_URL_TEMPLATES" добавил GET параметр "compare" => "compare/?DIFFERENT=Y" отвечающий за отображение товаров в которых надо не показывать одинаковые характеристики. Так же сделал доп проверку , при которой если добавляем один товар показывались характеристики [Строчка 29-35](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/components/bitrix/catalog.compare.result/bootstrap_v4/template.php). Индикатор уже в сравнении сделать через js [файл](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/components/bitrix/catalog.element/bootstrap_v4/script.js) compareResult добавил текст **строка 3075**, compareDeleteResult добавил стандартный текст **строка 3153**, setCompared добавил проверку на вкл чекбокс **строка 3170-3174**
3. [Новая страница](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/add_basket/index.php) тут располагается форма добавления товара в корзину. [Класс отвечающий за добавление товара](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/php_interface/classes/CBasket.php) getId получаем id товара, обычный getlist с OR условием, пользователь может ввести id, символьный код товара или артикул, по этим трем показателям будет осуществляться фильтр. IBLOCK_ID торговые предложения. getProductArr для начала получаем PRODUCT_ID, получаем цену товара, и возвращаем ид,имя,максимальное количество товара на складе (нужно для обработки инпута) и цену. addBasketOneProduct добавление товара в корзину. [Форма ajax](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/ajax/product.php) если существует VALUE и не равно addToBasket мы возвращаем на страницу json данные которые обработаем в форме. Второе условие добавляет товар в корзину. [Скрипт обработки формы и добавления товара в корзину](https://github.com/BogomazovVladislav/online-store-bitrix-vm/blob/master/local/templates/online_store/js/basket/addBasket.js) для начала обработаем форму и по условию если длина текста больше 0 , отправим ajax и отобразим нужные нам блоки. Почему больше 0, чтобы пользователь не мог отправить пустую форму. $('body .product_container #countProduct input').keyup обработка инпута , на ввод нуля , и на максимальное значения. InputMask на минималках (его не стал подключать, но если нужно можно и подключить). $('#addToBasket').click отправка данных на все тот же ajax но с другими параметрами. Данные забираем из полей формы. 

## Подключение скриптов ##
___
все скрипты были подключены в [header.php](local/templates/online_store/header.php) через d7
1. Модальное окно, подключено глобально
2. Поиск и добавление товара, только на той странице где используется $APPLICATION->GetCurPage() == '/add_basket/'
