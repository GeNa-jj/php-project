<?php
    $usename = isset($_GET['usename']) ? $_GET['usename'] : null;
    $path = 'data/member.json';
    $file = fopen($path,'r');
    $len = filesize($path);
    $content = fread($file,$len);
    fclose($file);
    $res = json_decode($content);
    $i=0;
    foreach($res as $item){
        if($usename==$item->name){
            echo 'no';
            break;
        }
        $i++;  
       
    }
    if($i===count($res)){
        echo 'yes';
    }