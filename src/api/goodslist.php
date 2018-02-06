<?php
    require('connect.php');

    $page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $a = isset($_GET['a']) ? $_GET['a'] : null;
    $price_min = isset($_GET['price_min']) ? $_GET['price_min'] : null;
    $price_max = isset($_GET['price_max']) ? $_GET['price_max'] : null;
    // $path = './data/moximoxi.json';
    // $file = fopen($path,'r');
    // $content = fread($file,filesize($path));
    // $arr = json_decode($content);
    
    
    if($a==1){
        // $flag = array();  

        // foreach($arr as $v){  
        //     $flag[] = $v->price;  
        // }  
          
        // array_multisort($flag, SORT_ASC, $arr);
        $sql = "select * from goodslist order by price*1";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);
    }else if($a==2){
        // $flag = array();  
  
        // foreach($arr as $v){  
        //     $flag[] = $v->price;  
        // }  
          
        // array_multisort($flag, SORT_DESC, $arr);
        $sql = "select * from goodslist order by price*1 desc";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);
    }else if($a==3){
        // function filterDistance($arr){
        //     if($arr->price < $GLOBALS["price_max"]&&$arr->price > $GLOBALS["price_min"]){
        //         return true;
        //     }else{
        //         return false;
        //     }
              
        // }
        // $array = array_filter($arr, "filterDistance");

        // $flag = array();  

        // foreach($array as $v){  
        //     $flag[] = $v->price;  
        // }  
          
        // array_multisort($flag, SORT_ASC, $array);

        // $arr=$array;
        $sql = "select * from goodslist where price*1 between $GLOBALS[price_min] and $GLOBALS[price_max] order by price*1";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);
    }else{
        $sql = "select * from goodslist";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);
    }
    $res = array(
        'data'=>array_slice($arr,($page_no-1)*$qty,$qty),
        'total'=>count($arr),
        'qty'=>$qty,
        'pageNo'=>$page_no
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    // fclose($file);
    
    
    //关闭连接
    $conn->close();