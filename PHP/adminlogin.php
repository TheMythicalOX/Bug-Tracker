<?php
require_once("config.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("MYSQL", "root", "root", "mydatabase");
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
    $user = json_decode(file_get_contents("php://input"));

    $password = filter_var($user->pwd, FILTER_SANITIZE_SPECIAL_CHARS);
    $project = filter_var($user->project, FILTER_SANITIZE_SPECIAL_CHARS);

    $q = sprintf("SELECT admin_pass FROM projects WHERE title = '%s'", $project);
    
    if (!$password || !$project) {
        echo 1;
        return;
    }

    
    
    $result = $conn->execute_query($q);
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_free_result($result);
    
    if (!$users) {
        echo "Password is incorrect";
        return;
    }
    
    if (password_verify($password, $users[0]["admin_pass"])){
        echo "Logged in";
    } else {
        echo "Password is incorrect";
    }

    mysqli_close($conn);
    return;
}