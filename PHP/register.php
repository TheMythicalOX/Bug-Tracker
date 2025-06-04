<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $name = $conn->real_escape_string(filter_var($_GET["name"], FILTER_SANITIZE_SPECIAL_CHARS));

        $email = $conn->real_escape_string(filter_var($_GET["email"], FILTER_VALIDATE_EMAIL));

        if (!$name || !$email) {
            echo 1;
            break;
        }

        $q = "SELECT * FROM users WHERE username LIKE UPPER(?) OR email = ?";

        $result = $conn->execute_query($q, [$name, $email]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if ($users) {
            if ($users[0]["email"] == $email) {
                echo 3;
            } else {
                echo 2;
            }
        }

        mysqli_free_result($result);
        break;

    case "POST":
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
            break;
        }

        if ($stmt->execute()) {
            echo "User Registered";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);