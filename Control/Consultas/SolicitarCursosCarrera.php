<?php
	require_once('../../Model/Conexion/conexion.php');
	$res = ejecutarQuery("select * from curso where esCarrera = 1"); // llamar el SP
	// Arma el string para html
	$string = "<SELECT id='cursosDeCarreras'>";
	$string .= "<OPTION VALUE='false' > Sin Asignar </OPTION>";
	$nombreCurso = '';
	while($curso = fetch($res)){
		$nombreCurso = $curso["codigo"]." - ".$curso["nombre"];
		$string .= "<OPTION VALUE='".$nombreCurso."'> ".$nombreCurso."</OPTION>";
	}
	$string .= "</SELECT>";
	echo $string;
?>