<?php

ini_set("session.use_only_cookies", 1);
ini_set("session.use_strict_mode", 0); # change to 1 when using https
ini_set("session.cookie_samesite", "Lax");
ini_set("sessions.save_path", "/tmp");
header("Access-Control-Allow-Origin: http://172.22.20.31:3000");
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");


session_set_cookie_params([
    "lifetime" => 3600,
    "domain" => "172.22.20.31",
    "path" => "/",
    "secure" => false, # change to true when using https
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