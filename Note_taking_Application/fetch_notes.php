<?php

$host = 'localhost';
$db = 'note'; 
$user = 'root';
$password = '';

$connection = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);


$query = $connection->query('SELECT * FROM notes'); 
$notes = $query->fetchAll(PDO::FETCH_ASSOC);


header('Content-Type: application/json');
echo json_encode($notes);
?>
