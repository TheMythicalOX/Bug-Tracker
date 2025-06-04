<?php

ini_set("session.use_only_cookies", 1);
ini_set("session.use_strict_mode", 1);
ini_set("session.cookie_samesite", "Lax");
header("Access-Control-Allow-Origin: http://172.22.20.64:3000");
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");


session_set_cookie_params([
    "lifetime" => 3600,
    "domain" => "172.22.20.64",
    "path" => "/",
    "secure" => true,
    "httponly" => true,
]);

session_start();

if (!isset($_SESSION['last_regeneration'])) {
    
    session_regenerate_id(true);
    
    $_SESSION["last_regeneration"] = time();
} else {
    
    $interval = 60 * 60;
    
    if (time() - $_SESSION["last_regeneration"] >= $interval) {
        
        session_regenerate_id(true);
        
        $_SESSION["last_regeneration"] = time();
    }
}