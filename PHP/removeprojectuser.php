<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $inputs = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($inputs->project, FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_var($inputs->email, FILTER_SANITIZE_SPECIAL_CHARS);
        
        $q = sprintf("SELECT id FROM project_assign WHERE project_id = (SELECT id FROM projects WHERE title = '%s') AND user_id = (SELECT id FROM users WHERE email = '%s') AND role = 'ADMIN'", $project_name, $email);
        
        $stmt = $conn->prepare($q);

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            $tmp = json_encode($stmt->get_result());
            if (count((array)$tmp) !== 0) {
                echo "Cannot Remove Admin User";
                break;
            }
        }

        $q = sprintf("DELETE FROM project_assign WHERE project_id = (SELECT id FROM projects WHERE title = '%s') AND user_id = (SELECT id FROM users WHERE email = '%s') AND role != 'ADMIN'", $project_name, $email);
        
        $stmt = $conn->prepare($q);
        

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Successful";
        } else {
            echo 6;
        }
        break;
}
mysqli_close($conn);