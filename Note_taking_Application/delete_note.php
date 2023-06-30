<?php

$host = 'localhost';
$db = 'note'; 
$user = 'root';
$password = '';

$connection = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);


$noteId = $_GET['id'];


$query = $connection->prepare('DELETE FROM notes WHERE id = ?');
$query->execute([$noteId]);


header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
?>
