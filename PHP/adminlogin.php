<?php
require_once("config.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = json_decode(file_get_contents("php://input"));

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli("MYSQL", "root", "root", "mydatabase");

    $password = filter_var($user->pwd, FILTER_SANITIZE_SPECIAL_CHARS);
    $project = filter_var($user->project, FILTER_SANITIZE_SPECIAL_CHARS);

    $q = "SELECT password FROM projects WHERE name = ?";
    
    if (!$password || !$project) {
        echo 1;
        return;
    }
    
    $result = $conn->execute_query($q, [$project]);
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_free_result($result);

    if (!$users) {
        echo "Password is incorrect";
        return;
    }
    
    if (password_verify($password, $users[0]["password"])){
        echo "Logged in";
    } else {
        echo "Password is incorrect";
    }

    mysqli_close($conn);
    return;
}