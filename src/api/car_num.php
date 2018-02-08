<?php
    require('connect.php');
    
    $user = isset($_GET['user']) ? $_GET['user'] : null;

    $sql = "select * from car where user='$user'";

    // var_dump($user);
    $res = $conn->query($sql);
    $n = $res->num_rows;
    echo $n;
    $res->free();
    $conn->close();