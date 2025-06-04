<?php
require_once("config.php");
header("Access-Control-Allow-Origin: " + .$_ENV["IP"]);
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("db", "root", "root", "bug-tracker");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $inputs = json_decode(file_get_contents("php://input"));
        $project_name = filter_var($inputs->project, FILTER_SANITIZE_SPECIAL_CHARS);
        $response = filter_var($inputs->response, FILTER_SANITIZE_SPECIAL_CHARS);
        $user = filter_var($inputs->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $role = "DEV";
        
        $q = sprintf("SELECT project_id, user_id FROM project_join WHERE user_id = (SELECT id FROM users WHERE username = '%s') AND project_id = (SELECT project_id FROM projects WHERE name = '%s')", $user, $project_name);

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



        $q = sprintf("UPDATE project_join SET status = '%d' WHERE project_id = '%d' AND user_id = '%d'", $status, (int)$IDs[0]["project_id"], (int)$IDs[0]["user_id"], $role);
        
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