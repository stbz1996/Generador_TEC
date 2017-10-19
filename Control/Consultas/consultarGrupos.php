<?php
	require_once('../../Model/Conexion/conexion.php');
	$res = ejecutarQuery("select * from grupo"); // llamar el SP
	// Arma el string para html
	$string = "<SELECT id='gruposDeCarreras'>";
	$string .= "<OPTION VALUE='false' > Grupo </OPTION>";
	while($curso = fetch($res)){
		$string .= "<OPTION VALUE='".$curso["numero"]."' >Grupo ".$curso["numero"]."</OPTION>";
	}
	$string .= "</SELECT>";
	echo $string;
?>