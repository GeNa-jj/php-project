<?php
    $page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $path = './data/moximoxi.json';
    $file = fopen($path,'r');
    $content = fread($file,filesize($path));
    $arr = json_decode($content);

    $flag = array();  
  
    foreach($arr as $v){  
        $flag[] = $v->price;  
    }  
      
    array_multisort($flag, SORT_ASC, $arr);
    $res = array(
        'data'=>array_slice($arr,($page_no-1)*$qty,$qty),
        'total'=>count($arr),
        'qty'=>$qty,
        'pageNo'=>$page_no
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    fclose($file);