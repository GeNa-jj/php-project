<?php
    require('connect.php');

    $usename = isset($_GET['usename']) ? $_GET['usename'] : null;
    // $path = 'data/member.json';
    // $file = fopen($path,'r');
    // $len = filesize($path);
    // $content = fread($file,$len);
    // fclose($file);
    // $res = json_decode($content);
    // $i=0;
    // foreach($res as $item){
    //     if($usename==$item->name){
    //         echo 'no';
    //         break;
    //     }
    //     $i++;  
       
    // }
    // if($i===count($res)){
    //     echo 'yes';
    // }
    
    $sql = "select * from member where name='$usename'";
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