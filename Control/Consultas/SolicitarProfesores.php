<?php
	// Añade el archivo de conexion
	require_once('../../Model/Conexion/conexion.php');
	// Ejecuta un query
	$res = ejecutarQuery("select * from profesor");
	$string = '';
	while($data = fetch($res)){
		$string .= $data["idProfesor"].'#'.$data["nombre"]."#".$data["apellidos"].'-';
	}
	// retorna el string con todos los profesores
	echo $string;
?>