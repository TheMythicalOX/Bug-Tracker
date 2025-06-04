<?php
require_once("config.php");
header("Access-Control-Allow-Origin: " + .$_ENV["IP"]);
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $id = $conn->real_escape_string(filter_var($_GET["name"], FILTER_SANITIZE_SPECIAL_CHARS));

        if (!$id) {
            echo 1;
            break;
        }

        $q = "SELECT * FROM projects WHERE project_id = ?";

        $result = $conn->execute_query($q, [$id]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if ($users) {
            echo 2;
        }

        mysqli_free_result($result);
        break;
    case "POST":
        $user = json_decode(file_get_contents("php://input"));

        $id = (int)filter_var($user->ID, FILTER_SANITIZE_SPECIAL_CHARS);

        if (!$id) {
            echo 1;
            break;
        }
        $user_id = $_SESSION["user_id"];

        $status = 0;

        $q = "SELECT * FROM project_join WHERE project_id = ? AND user_id = ?";

        $result = $conn->execute_query($q, [$id, $user_id]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if($users){
            echo "Request Already Sent.";
            break;
        }
        mysqli_free_result($result);

        $stmt = $conn->prepare("INSERT INTO project_join VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)");
        $stmt->bind_param("iii", $id, $user_id, $status);

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Request Sent";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);