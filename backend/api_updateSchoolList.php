<?php

$get_skolskyRok = $_POST['skolsky_rok'];
$get_semester = $_POST['semester'];
$get_kategoria = $_POST['kategoria'];

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

function clearTable($pdo) {
  $sql = "DELETE FROM tmp_studenti";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
};

function filterStudents($pdo, $get_skolskyRok, $get_semester) {
  $sql = "INSERT INTO tmp_studenti (id_student, id_vyber, semester)
          SELECT studenti.id as id_student, if(studenti.vybrana_skola IS NULL, studenti.priorita_1, studenti.vybrana_skola) as id_vyber, studenti.semester as semester
          FROM studenti
          WHERE studenti.skolsky_rok = :skolsky_rok AND studenti.semester = :semester";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['skolsky_rok' => $get_skolskyRok, 'semester' => $get_semester]);
};

function getSchools($pdo, $get_skolskyRok, $get_semester, $get_kategoria) {
  if ($get_kategoria == 'mk') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.mk = 1
          GROUP BY sk.cilova_skolaidno
          ORDER BY stCount DESC, sk.nazov ASC";
  } elseif ($get_kategoria == 'av') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.av = 1
          GROUP BY sk.cilova_skolaidno
          ORDER BY stCount DESC, sk.nazov ASC";
  } elseif ($get_kategoria == 'md') {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 AND sk.md = 1
          GROUP BY sk.cilova_skolaidno
          ORDER BY stCount DESC, sk.nazov ASC";
  } else {
    $sql = "SELECT sk.cilova_skolaidno, COUNT(st.id_vyber) as stCount, sk.nazov, sk.kapacita 
          FROM skoly sk
          LEFT JOIN tmp_studenti st ON sk.cilova_skolaidno = st.id_vyber
          WHERE sk.stav = 1 
          GROUP BY sk.cilova_skolaidno
          ORDER BY stCount DESC, sk.nazov ASC";
  }
  $stmt = $pdo->prepare($sql);
  $stmt->execute();

  $res = $stmt->fetchAll();

  foreach($res as $key=>$skola) {
    $skola_id = $skola['cilova_skolaidno'];
    $res[$key]['zoznam_studentov'] = getStudentList($pdo, $skola_id, $get_skolskyRok, $get_semester);
  }

  return $res;
}

function getStudentList($pdo, $skola_id, $get_skolskyRok, $get_semester) {
  $sql = "SELECT id, kod, stupen_rocnik, meno, anglictina, priorita_1, priorita_2, priorita_3, stav, anglictina, priemer, poznamky, kategoria, if(vybrana_skola IS NULL, priorita_1, vybrana_skola) as id_vyber
          FROM studenti
          WHERE stav = 1 AND skolsky_rok = :skolsky_rok AND semester = :semester
          HAVING id_vyber = :id_skola
          ORDER BY anglictina DESC";
  $sqlArray = ['id_skola' => $skola_id, 'skolsky_rok' => $get_skolskyRok, 'semester' => $get_semester];

  $stmt = $pdo->prepare($sql);
  $stmt->execute($sqlArray);

  $res = $stmt->fetchAll();
  
  return $res;
}

//
// ---> Spustenie funkcií pre zoznam
//

clearTable($pdo);
filterStudents($pdo, $get_skolskyRok, $get_semester);

echo json_encode(getSchools($pdo, $get_skolskyRok, $get_semester, $get_kategoria));