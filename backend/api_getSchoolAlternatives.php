<?php

$post_category = $_POST['category'];

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

function getSchoolAlternatives($pdo, $category) {
  if ($category == 'MK') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.nazov_kratky, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.mk = 1
          GROUP BY sk.cilova_skolaidno
          HAVING stCount < sk.kapacita
          ORDER BY stCount DESC, sk.nazov ASC";
  } elseif ($category == 'AV') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.nazov_kratky, sk.kapacita
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.av = 1
          GROUP BY sk.cilova_skolaidno
          HAVING stCount < sk.kapacita
          ORDER BY stCount DESC, sk.nazov ASC";
  } elseif ($category == 'MD') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.nazov_kratky, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.md = 1
          GROUP BY sk.cilova_skolaidno
          HAVING stCount < sk.kapacita
          ORDER BY stCount DESC, sk.nazov ASC";
  } 
  $stmt = $pdo->prepare($sql);
  $stmt->execute();

  $res = $stmt->fetchAll(); 

  echo json_encode($res);
};

getSchoolAlternatives($pdo, $post_category);