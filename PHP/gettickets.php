<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($project->project, FILTER_SANITIZE_SPECIAL_CHARS);
        
        $q = sprintf("SELECT title FROM tickets 
        WHERE id IN 
        (SELECT ticket_id FROM ticket_assign WHERE project_id = 
        (SELECT id FROM projects WHERE title = UPPER('%s'))) 
        LIMIT 20",$project_name);

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