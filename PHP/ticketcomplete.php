<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $user = json_decode(file_get_contents("php://input"));

        $title = filter_var($user->title, FILTER_SANITIZE_SPECIAL_CHARS);

        $project = filter_var($user->project, FILTER_SANITIZE_SPECIAL_CHARS);

        $status = filter_var($user->status, FILTER_SANITIZE_SPECIAL_CHARS);

        if (!$title || !$project || !$status) {
            echo 1;
            break;
        }

        $q = sprintf("SELECT id FROM projects WHERE title = '%s'", $project);

        $result = $conn->query($q);
        $project_id = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $project = (int)$project_id[0]["id"];

        $q = sprintf("UPDATE tickets SET status = '%s' WHERE project_id = '%d' AND title = '%s'", $status, $project, $title);
        
        $stmt = $conn->prepare($q);
        

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Ticket Updated";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);