<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Дает возможность получить json на php
echo var_dump($_POST);