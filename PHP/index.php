<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli("MYSQL-bugtrack", "root", "root", "mydatabase");

if ($conn)
{
    echo "Connected!";
}
else{
    echo "Not Connected";
}



print_r(file_get_contents("php://input"));
mysqli_close($conn);