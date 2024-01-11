<?php

$con = new mysqli("db", "root", "root", "mysql");

if ($con)
{
    echo "Connected!";
}
else{
    echo "Not Connected";
}

?>