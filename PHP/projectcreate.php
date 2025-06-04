<?php
require_once("config.php");
header("Access-Control-Allow-Origin: " + .$_ENV["IP"]);
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $name = $conn->real_escape_string(filter_var($_GET["name"], FILTER_SANITIZE_SPECIAL_CHARS));

        if (!$name) {
            echo 1;
            break;
        }

        $q = "SELECT * FROM projects WHERE name LIKE UPPER(?)";

        $result = $conn->execute_query($q, [$name]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if ($users) {
            echo 2;
        }

        mysqli_free_result($result);
        break;
    case "POST":
        $user = json_decode(file_get_contents("php://input"));

        $name = filter_var($user->name, FILTER_SANITIZE_SPECIAL_CHARS);

        $desc = filter_var($user->desc, FILTER_SANITIZE_SPECIAL_CHARS);


        $password = filter_var($user->pwd, FILTER_SANITIZE_SPECIAL_CHARS);
        if (!$password){
            echo 4;
        }
        if (!$name || !$desc) {
            echo 1;
            break;
        }

        $password = password_hash($password, PASSWORD_DEFAULT);

        $user_id = $_SESSION["user_id"];

        $stmt = $conn->prepare("INSERT INTO projects VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ?, ?)");
        $stmt->bind_param("isss", $user_id, $name, $desc, $password);

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Project Created";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);