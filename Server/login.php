<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $user = json_decode(file_get_contents("php://input"));

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
        echo "Logged in";
    } else {
        echo "Username or Password is incorrect";
    }

    mysqli_free_result($result);
    return;

}
mysqli_close($conn);