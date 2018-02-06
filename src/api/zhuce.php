<?php
    require('connect.php');
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    // $path = 'data/member.json';
    // $file = fopen($path,'r');
    // $len = filesize($path);
    // $content = fread($file,$len);
    // fclose($file);
    // $res = json_decode($content);
    // array_push($res,array(
    //     "name"=>$name,
    //     "email"=>$email,
    //     "phone"=>$phone,
    //     "password"=>$password
    // ));
    // $file = fopen($path,'w');
    // fwrite($file, json_encode($res,JSON_UNESCAPED_UNICODE));
    // fclose($file);
    
    $password = md5($password);
        
    // 写入数据sql语句
    $sql = "insert into member(name,email,phone,password) values('$name','$email','$phone','$password')";

    $res = $conn->query($sql);
    echo $res;