<?php
require_once("config.php");
header("Access-Control-Allow-Origin: " + .$_ENV["IP"]);
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($project->project, FILTER_SANITIZE_SPECIAL_CHARS);

        $q = sprintf("SELECT username FROM users WHERE id IN (SELECT user_id FROM project_join WHERE project_id IN (SELECT project_id FROM projects WHERE name = '%s') AND status = '0')", $project_name);
        
        $result = $conn->query($q);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if ($users){
            echo json_encode($users);
        }
        else {
            echo 1;
        }
        mysqli_free_result($result);
        break;
}
mysqli_close($conn);