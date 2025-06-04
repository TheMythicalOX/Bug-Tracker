<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $user_id = $_SESSION["user_id"];

        $q = "SELECT project_id FROM projects WHERE title LIKE UPPER(?)";

        $result = $conn->execute_query($q, [$project->name]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        mysqli_free_result($result);
        $proj_id = $users[0]["project_id"];
        $role = "ADMIN";

        $stmt = $conn->prepare("INSERT INTO project_assign VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)");
        $stmt->bind_param("iis", $proj_id, $user_id, $role);

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