<?php
require_once("config.php");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("MYSQL", "root", "root", "mydatabase");

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        $id = $_SESSION["user_id"];

        $q = sprintf("SELECT tickets.id, tickets.title, tickets.project_id, tickets.status, tickets.severity, projects.title AS projTitle FROM tickets INNER JOIN projects ON tickets.project_id=projects.id WHERE tickets.id IN (SELECT ticket_id FROM ticket_assign WHERE user_id = '%s') ", $id);

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