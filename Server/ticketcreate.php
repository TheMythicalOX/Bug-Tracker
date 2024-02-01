<?php
require_once("config.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
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

        $q = "SELECT * FROM tickets WHERE title LIKE UPPER(?)";

        $result = $conn->execute_query($q, [$name]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if ($users) {
            echo 2;
        }

        mysqli_free_result($result);
        break;
    case "POST":
        $user = json_decode(file_get_contents("php://input"));

        $title = filter_var($user->title, FILTER_SANITIZE_SPECIAL_CHARS);

        $desc = filter_var($user->desc, FILTER_SANITIZE_SPECIAL_CHARS);

        $severity = filter_var($user->severity, FILTER_SANITIZE_SPECIAL_CHARS);

        $user_id = $_SESSION["user_id"];

        $project = filter_var($user->project, FILTER_SANITIZE_SPECIAL_CHARS);

        $status = "New";

        if (!$title || !$desc || !$severity || !$project) {
            echo 1;
            break;
        }

        $q = sprintf("SELECT project_id FROM projects WHERE name = '%s'", $project);

        $result = $conn->query($q);
        $project_id = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $project = (int)$project_id[0]["project_id"];

        $q = sprintf("INSERT INTO tickets VALUES (NULL, '%s', '%s', %d, '%s', CURRENT_TIMESTAMP, '%s', %d)", $title, $desc, $user_id, $severity, $status, $project);
        
        $stmt = $conn->prepare($q);
        

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Ticket Created";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);