<?php

$post_id = $_POST['id'];
$post_newSchool = $_POST['newSchool'];

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'mysql80.r1.websupport.sk';
$db   = 'erasmusfmk'; // Sem zadajte login
$user = '5fa7c9mj'; // Sem zadajte login
$pass = 'Hd56<dym&H'; // Sem zadajte heslo
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

function updateSchool($pdo, $post_id, $newSchool) {
  $sql = "UPDATE studenti
          SET vybrana_skola = :newSchool
          WHERE id = :id";

  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $post_id, 'newSchool' => $newSchool]);


};

updateSchool($pdo, $post_id, $post_newSchool);