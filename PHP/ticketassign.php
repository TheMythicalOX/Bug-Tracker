<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $project = json_decode(file_get_contents("php://input"));
        $user_id = $_SESSION["user_id"];

        $q = "SELECT id FROM tickets WHERE title LIKE UPPER(?)";

        $result = $conn->execute_query($q, [$project->title]);
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
        mysqli_free_result($result);
        $ticket_id = $users[0]["id"];
        $role = filter_var($project->role, FILTER_SANITIZE_SPECIAL_CHARS);

        $stmt = $conn->prepare("INSERT INTO ticket_assign VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)");
        $stmt->bind_param("iis", $user_id, $ticket_id, $role);

        if (!$stmt) {
            var_dump($conn->error_list);
            break;
        }

        if ($stmt->execute()) {
            echo "Ticket Created";
        } else {
            echo 6;
        }
        break;


    
}
mysqli_close($conn);