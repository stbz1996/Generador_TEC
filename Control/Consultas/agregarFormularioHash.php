<?php
	require_once('../../Model/Conexion/conexion.php');

	$idProf = $_POST['idProf'];
	$codigohash = "'".$_POST['codigohash']."'";
	$query = "insert into formulariohash(habilitado, codigoHash, Profesor_idProfesor) values(1, ".$codigohash.", ".$idProf.");";
	$res = ejecutarQuery($query);

	echo 'el id es:'.$idProf.', el hash es '.$codigohash."-";
?>