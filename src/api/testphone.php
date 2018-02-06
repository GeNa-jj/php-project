<?php
    require('connect.php');

    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    // $path = 'data/member.json';
    // $file = fopen($path,'r');
    // $len = filesize($path);
    // $content = fread($file,$len);
    // fclose($file);
    // $res = json_decode($content);
    // $i=0;
    // foreach($res as $item){
    //     if($phone==$item->phone){
    //         echo 'no';
    //         break;
    //     }
    //     $i++; 
    // }
    // if($i===count($res)){
    //     echo 'yes';
    // }
    
    $sql = "select * from member where phone='$phone'";
    $res = $conn->query($sql);
    $res2='';
    if($res->num_rows > 0){
        $res2 .= 'no';
    }else{
        $res2 .= 'yes';
    }
    $res->free();

    //关闭连接
    $conn->close();
    echo $res2;