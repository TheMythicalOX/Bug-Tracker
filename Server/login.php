<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = json_decode(file_get_contents("php://input"));

    if (isset($user->logout)) {
        session_unset();
        echo "Logged out";
        return;
    }

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli("db", "root", "root", "bug-tracker");
    
    if ($user->cookie){
        if(isset($_SESSION["username"])) {
            $user->name = $_SESSION["username"];
            $user->pwd = $_SESSION["password"];
        } else {
            echo 2;
        }
    } 
    $password = filter_var($user->pwd, FILTER_SANITIZE_SPECIAL_CHARS);
    
    if(str_contains($user->name, "@")) {
        $name = filter_var($user->name, FILTER_VALIDATE_EMAIL); 
        $q = "SELECT id, password FROM users WHERE email= UPPER('$name')";
    }
    else {
        $name = filter_var($user->name, FILTER_SANITIZE_SPECIAL_CHARS );
        $q = "SELECT id, password FROM users WHERE username = '$name'";
    }

    if (!$password) {
        echo 1;
        mysqli_free_result($result);
        return;
    }
    if (!$name) {
        echo 1;
        mysqli_free_result($result);
        return;
    }
    
    $result = mysqli_query($conn, $q);
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if (!$users) {
        echo "Username or Password is incorrect";
        mysqli_free_result($result);
        return;
    }
    
    if (password_verify($password, $users[0]["password"])){
        $_SESSION["username"] = $name;
        $_SESSION["password"] = $password;
        echo "Logged in";
    } else {
        echo "Username or Password is incorrect";
    }

    mysqli_free_result($result);
    mysqli_close($conn);
    return;
}