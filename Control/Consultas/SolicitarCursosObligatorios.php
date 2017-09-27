
<?php
	require_once('../../Model/Conexion/conexion.php');
	$res = ejecutarQuery("select * from curso where esCarrera = 0"); // debo llamar el SP en vez de la consulta 
	
	// Arma el string para html
	$string = "<SELECT id='cursosOtrasCarreras'>";
	$string .= "<OPTION VALUE='false' > Sin Asignar </OPTION>";
	while($curso = fetch($res)){
		$string .= "<OPTION VALUE='".$curso["codigo"]."' >".$curso["codigo"]." - ".$curso["nombre"]."</OPTION>";
	}
	$string .= "</SELECT>";
	echo $string;
?>
