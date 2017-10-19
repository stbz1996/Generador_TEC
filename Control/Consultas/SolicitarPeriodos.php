<?php
	// Añade el archivo de conexion
	require_once('../../Model/Conexion/conexion.php');
	// Ejecuta un query
	$res = ejecutarQuery("select * from periodo");
	$string = '';
	while($data = fetch($res)){
		$string .= $data["idPeriodo"].'#'.$data["ano"]."#".$data["semestre"].'-';
	}
	// retorna el string con todos los profesores
	echo $string;
?>