<?php
	// Añade el archivo de conexion
	require_once('../../Model/Conexion/conexion.php');
	// Ejecuta un query
	$res = ejecutarQuery("select * from profesor");
	$string = '';
	while($viaje = fetch($res)){
		$string .= $viaje["idProfesor"].'#'.$viaje["nombre"]."#".$viaje["apellidos"].'-';
	}
	// retorna el string con todos los profesores
	echo $string;
?>