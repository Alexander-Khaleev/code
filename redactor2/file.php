<?php   


$uploaddir = 'files/';
$uploadfile = $uploaddir . basename($_FILES['img']['name']);

if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile)) {
    echo "Файл корректен и был успешно загружен.\n";
} else {
    echo "Возможная атака с помощью файловой загрузки!\n";
}


?>