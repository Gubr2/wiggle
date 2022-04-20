<?php

$post_id = $_POST['id'];

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

$returnArray = array(
  'details' => '',
  'selected_school' => '',
  'priority_1' => '',
  'priority_2' => '',
  'priority_3' => ''
);

function getStudentDetails($pdo, $id) {
  $sql = "SELECT * FROM studenti WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $id]);

  $res = $stmt->fetch(); 

  $returnArray['details'] = $res;
  $returnArray['selected_school'] = getStudentSelectedSchool($pdo, $id);
  $returnArray['priority_1'] = getStudentPriorities($pdo, $res['priorita_1']);
  $returnArray['priority_2'] = getStudentPriorities($pdo, $res['priorita_2']);
  $returnArray['priority_3'] = getStudentPriorities($pdo, $res['priorita_3']);

  unset($returnArray['details']['vybrana_skola']);
  unset($returnArray['details']['priorita_1']);
  unset($returnArray['details']['priorita_2']);
  unset($returnArray['details']['priorita_3']);

  return $returnArray;
}

function getStudentSelectedSchool($pdo, $id) {
  $sql = "SELECT if(studenti.vybrana_skola IS NULL, studenti.priorita_1, studenti.vybrana_skola) as id_vyber, skoly.cilova_skolaidno, skoly.nazov, skoly.nazov_kratky
          FROM studenti, skoly
          WHERE studenti.id = :id
          HAVING id_vyber = skoly.cilova_skolaidno";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $id]);

  $res = $stmt->fetch(); 

  return $res;
}

function getStudentPriorities($pdo, $school_id) {
  $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.nazov_kratky, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.cilova_skolaidno = :school_id
          GROUP BY sk.cilova_skolaidno
          ORDER BY stCount DESC, sk.nazov ASC";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['school_id' => $school_id]);

  $res = $stmt->fetch(); 

  return $res;
}

echo json_encode(getStudentDetails($pdo, $post_id));