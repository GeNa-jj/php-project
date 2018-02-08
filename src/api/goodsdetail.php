<?php
    require('connect.php');

    $id = isset($_GET['id']) ? $_GET['id'] : '';

    $sql = "select * from goodslist";

    if($id){
        $sql .= " where id='$id'";
    }

    $res = $conn -> query($sql);

    $arr = $res->fetch_assoc();

    $res->free();
    $conn->close();
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);