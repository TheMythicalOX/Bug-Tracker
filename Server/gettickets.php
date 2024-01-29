<?php
require_once("config.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($project->project, FILTER_SANITIZE_SPECIAL_CHARS);
        
        $user_id = $_SESSION["user_id"];
        $q = sprintf("SELECT title FROM tickets 
        WHERE ticket_id IN 
        (SELECT ticket_id FROM ticket_assign WHERE user_id = %d AND project_id = 
        (SELECT project_id FROM projects WHERE name = UPPER('%s'))) 
        LIMIT 20", $user_id, $project_name);

        $result = $conn->query($q);
        $projects = mysqli_fetch_all($result, MYSQLI_ASSOC);

        if ($projects) {
            echo json_encode($projects);
            mysqli_free_result($result);
            break;
        }
        else {
            echo 1;
        }
        mysqli_free_result($result);
        break;
}
mysqli_close($conn);