<?php
	// Añade el archivo de conexion
	require_once('../../Model/Conexion/conexion.php');
	// Ejecuta un query
	$res = ejecutarQuery("select * from profesor");
	// Arma el string para html
	$string = "<SELECT id='profesoresFormulario'>";
	$string .= "<OPTION VALUE='false' > Sin Asignar </OPTION>";
	while($viaje = fetch($res)){
		$nombreProfesor = $viaje["nombre"]." ".$viaje["apellidos"];
		$string .= "<OPTION VALUE='".$viaje["idProfesor"]." - ".$nombreProfesor."' >".$nombreProfesor."</OPTION>";
	}
	$string .= "</SELECT>";
	echo $string;
?>
