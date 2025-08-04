<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $inputs = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($inputs->project, FILTER_SANITIZE_SPECIAL_CHARS);
        $response = filter_var($inputs->response, FILTER_SANITIZE_SPECIAL_CHARS);
        $user = filter_var($inputs->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $role = "DEV";
        
        $q = sprintf("SELECT project_id, user_id FROM project_join WHERE user_id = (SELECT id FROM users WHERE username = '%s') AND project_id = (SELECT id FROM projects WHERE title = '%s')", $user, $project_name);

        $result = $conn->query($q);
        $IDs = mysqli_fetch_all($result, MYSQLI_ASSOC);

        if ($response == "yes"){
            $q = sprintf("INSERT INTO project_assign VALUES (NULL, %d, %d, '%s', CURRENT_TIMESTAMP)", (int)$IDs[0]["project_id"], (int)$IDs[0]["user_id"], $role);
            $stmt = $conn->prepare($q);
        

            if (!$stmt) {
                var_dump($conn->error_list);
            }

            if ($stmt->execute()) {
            } else {
                echo 6;
            }

            $status = 1;

        }else {
            $status = 2;
        }


        $q = sprintf("DELETE FROM project_join WHERE project_id = '%d' AND user_id = '%d'", (int)$IDs[0]["project_id"], (int)$IDs[0]["user_id"]);
        
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