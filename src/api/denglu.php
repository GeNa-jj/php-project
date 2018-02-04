<?php
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $path = 'data/member.json';
    $file = fopen($path,'r');
    $len = filesize($path);
    $content = fread($file,$len);
    fclose($file);
    $res = json_decode($content);
    $i=0;
    $j=0;
    foreach($res as $item){
        if($name==$item->name||$name==$item->email||$name==$item->phone){
            echo 'yes';
            break;
        }
        $i++;
    }
    if($i===count($res)){
        echo 'no';
    }
    foreach($res as $item){
        if($name==$item->name||$name==$item->email||$name==$item->phone&&$password==$item->password){
            echo 'yes';
            break;
        }
        $j++;
    }
    if($j===count($res)){
        echo 'no';
    }