<?php
    // include 'connect.php';
    require('connect.php');
    
    // 获取前端数据
    $name = isset($_GET['name']) ? $_GET['name'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    // 密码md5加密
    // $password = md5($password);

    $sql1 = "select * from member where name='$name'";
    $sql2 = "select * from member where email='$name'";
    $sql3 = "select * from member where phone='$name'";


    // 获取查询结果
    $res1 = $conn->query($sql1);
    $res2 = $conn->query($sql2);
    $res3 = $conn->query($sql3);

    $res='';
    if($res1->num_rows > 0||$res2->num_rows > 0||$res3->num_rows > 0){
        $res .= 'yes';
    }else{
        $res .= 'no';
    }

    $sql1 = "select * from member where name='$name' and password='$password'";
    $sql2 = "select * from member where email='$name' and password='$password'";
    $sql3 = "select * from member where phone='$name' and password='$password'";

    $res1 = $conn->query($sql1);
    $res2 = $conn->query($sql2);
    $res3 = $conn->query($sql3);

    if($res1->num_rows > 0||$res2->num_rows > 0||$res3->num_rows > 0){
        $res .= 'yes';
    }else{
        $res .= 'no';
    }

    // 释放查询内存(销毁)
    $res1->free();
    $res2->free();
    $res3->free();

    //关闭连接
    $conn->close();
    echo $res;