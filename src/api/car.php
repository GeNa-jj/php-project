<?php
    require('connect.php');

    $user = isset($_GET['user']) ? $_GET['user'] : null;

    $sql = "select * from car where user='$user'";
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        foreach($arr as $item){
            $id = $item['id'];
            $res = $conn->query("select * from goodslist where id='$id'");
            $data =  $res->fetch_assoc();
            $data['qty']=$item['qty'];
            $data['dispatching']=$item['dispatching'];
            $result[] = $data;
        }
         echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }else{
        echo 'no';
    }