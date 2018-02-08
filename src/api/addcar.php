<?php
    require('connect.php');

    $user = isset($_GET['user']) ? $_GET['user'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $dispatching = isset($_GET['dispatching']) ? $_GET['dispatching'] : null;

    $sql = "select * from car where user='$user' and id='$id' and dispatching='$dispatching'";
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        $arr = $res->fetch_assoc();
        $n = $arr['qty'];
        $n = $n*1 + $qty*1;
        $conn->query("update car set qty='$n' where user='$user' and id='$id' and dispatching='$dispatching'");
        
    }else{
        $conn->query("insert into car(user,id,qty,dispatching) values('$user','$id','$qty','$dispatching')");
    }
    echo 'yes';