<?php
    require('connect.php');

    $user = isset($_GET['user']) ? $_GET['user'] : null;
    $action = isset($_GET['action']) ? $_GET['action'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $dispatching = isset($_GET['dispatching']) ? $_GET['dispatching'] : null;

    $sql = "select * from car where user='$user' and id='$id' and dispatching='$dispatching'";
    $res = $conn->query($sql);
    $arr = $res->fetch_assoc();
    if($action=='-'){
        $n = $arr['qty'];
        $n--;
        $conn->query("update car set qty='$n' where user='$user' and id='$id' and dispatching='$dispatching'");
    }else if($action=='+'){
        $n = $arr['qty'];
        $n++;
        $conn->query("update car set qty='$n' where user='$user' and id='$id' and dispatching='$dispatching'");
    }else if($action=='del'){
        $conn->query("DELETE from car where user='$user' and id='$id' and dispatching='$dispatching'");
    }
    $res->free();
    $conn->close();