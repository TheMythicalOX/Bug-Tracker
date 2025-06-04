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
        $name = filter_var($project->project, FILTER_SANITIZE_SPECIAL_CHARS);

        $user_id = $_SESSION["user_id"];
        $q = sprintf("SELECT role FROM project_assign WHERE user_id = %d AND project_id = (SELECT project_id FROM projects WHERE project_id = (SELECT project_id From projects WHERE name = '%s'))", $user_id, $name);

        $result = $conn->query($q);
        $projects = mysqli_fetch_all($result, MYSQLI_ASSOC);

        if ($projects) {
            if($projects[0]["role"] == "ADMIN"){
                echo "User Is Admin";
            } else {
                echo "Not Admin";
            }
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