<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

// echo file_get_contents("php://input");

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $name = filter_var($_GET["name"], FILTER_SANITIZE_SPECIAL_CHARS);

        $email = filter_var($_GET["email"], FILTER_VALIDATE_EMAIL);

        if (!$name || !$email) {
            echo 1;
            break;
        }

        $q = "SELECT * FROM users WHERE username LIKE UPPER('$name') OR email = '$email'";

        $result = mysqli_query($conn, $q);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        // var_dump($users);
        
        if ($users) {
            if ($users[0]["email"] == $email) {
                echo 3;
            } else {
                echo 2;
            }
        }

        
        mysqli_free_result($result);

    case "POST":
        // Rgister user
        $user = json_decode(file_get_contents("php://input"));

        $name = filter_var($user->name, FILTER_SANITIZE_SPECIAL_CHARS);

        $email = filter_var($user->email, FILTER_VALIDATE_EMAIL);

        $password = filter_var($user->pwd, FILTER_SANITIZE_SPECIAL_CHARS);
        if (!$password){
            echo 4;
        }
        if (!$name || !$email) {
            echo 1;
            break;
        }

        $password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)");
        $stmt->bind_param("sss", $name, $email, $password);

        if (!$stmt) {
            var_dump($conn->error_list);
            echo 5;
            break;
        }

        if ($stmt->execute()) {
            echo "User Registered";
        } else {
            echo 6;
        }




}
mysqli_close($conn);