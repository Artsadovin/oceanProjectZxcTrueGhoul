<?php

$func = $_POST['func'];
if ($func === 'func_data') {
	$arr['za'] = $_POST['za']; //int
  $arr['vi'] = $_POST['vi']; //int
	$arr['num'] = $_POST['num']; //txt
	$arr['nom'] = $_POST['nom']; //txt
    $za = $arr['za']; //int
    $vi = $arr['vi']; //int
	$num = $arr['num']; //txt
	$nom = $arr['nom']; //txt
    $host = 'localhost:8889';  // Хост, у нас все локально
	$user = 'root';    // Имя созданного вами пользователя
	$pass = 'root'; // Установленный вами пароль пользователю
	$db_name = 'carpark';   // Имя базы данных
	$link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

  // Ругаемся, если соединение установить не удалось
	if (!$link) {
		echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
		exit;
	}

	$pls = array(1, 2, 3, 4, 5, 6, 7);

    $sql = mysqli_query($link, "SELECT `place` FROM `tabe` WHERE `vi` > '$za' and `za` < '$vi'");

	//не работает адыкватно конвертация
	$k = 0;

	while ($result = mysqli_fetch_array($sql))
	{
		$resz[$k] = (int)"{$result['place']}";
		$k++;
	}


	$a = 0;

	for ($i = 0; $i < count($pls); $i++) {
		for ($j = 0; $j < $k; $j++) {
			if ($pls[$i] === $resz[$j]) {
				$pls[$i] = 0;
			}
		}
	}

	for ($i = 0; $i < count($pls); $i++)
	{
		if ($a == 0) {
			if($pls[$i] != 0) {
				$a = $pls[$i];
			}
		}
	}

	$sql2 = mysqli_query($link, "INSERT INTO `tabe`(`place`, `num`, `nom`, `za`, `vi`) VALUES ('$a','$num','$nom','$za','$vi')");

	$arr['res'] = $a;
    echo json_encode($arr);
}

/*CREATE TABLE `tabe` ( `id` int(11) NOT NULL, `place` int(11) NOT NULL, `num` text NOT NULL, `nom` text NOT NULL, `za` int(11)
NOT NULL, `vi` int(11) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/
?>
