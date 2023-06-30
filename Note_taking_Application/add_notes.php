<?php


$host = 'localhost';
$db = 'note';
$user = 'root';
$password = '';

$connection = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);


$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$content = $data['content'];


$noteId = uniqid();


$query = $connection->prepare('INSERT INTO notes (id, title, content) VALUES (?, ?, ?)');
$query->execute([$noteId, $title, $content]);


header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
?>
