<?php
	require_once('../../Model/Conexion/conexion.php');
	$res = ejecutarQuery("select * from curso where esCarrera = 1"); // llamar el SP

	// Arma el string para html
	$string = "<SELECT id='cursosDeCarreras'>";
	$string .= "<OPTION VALUE='false' > Sin Asignar </OPTION>";
	while($curso = fetch($res)){
		$string .= "<OPTION VALUE='".$curso["codigo"]."' >".$curso["codigo"]." - ".$curso["nombre"]."</OPTION>";
	}
	
	$string .= "</SELECT>";
	echo $string;
?>