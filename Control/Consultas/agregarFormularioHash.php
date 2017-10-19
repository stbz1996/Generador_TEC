<?php
	require_once('../../Model/Conexion/conexion.php');
	$periodo = $_POST['periodo']; // aun no se usa, se debe insertar en el formularioHash abajo
	$idProf = $_POST['idProf'];
	$codigohash = "'".$_POST['codigohash']."'";
	$query = "insert into formulariohash(habilitado, codigoHash, Profesor_idProfesor, Periodo_idPeriodo) 
			  values(1, ".$codigohash.", ".$idProf.", ".$periodo.");";
	$res = ejecutarQuery($query);
	echo 0;
?>