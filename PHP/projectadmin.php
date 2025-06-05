<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $name = filter_var($project->project, FILTER_SANITIZE_SPECIAL_CHARS);

        $user_id = $_SESSION["user_id"];
        $q = sprintf("SELECT role FROM project_assign WHERE user_id = %d AND project_id = (SELECT id FROM projects WHERE id = (SELECT id From projects WHERE title = '%s'))", $user_id, $name);

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