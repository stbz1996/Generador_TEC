<?php
	require_once('../../Model/Conexion/conexion.php');
	// Toma los valores del documento html
	$id = $_POST["id"];
	$valor = $_POST["valor"];
	// Ejecuta un query
	$res = ejecutarQuery("select * from profesor");
	// Arma el string para html
	$string = "<div class='Curso' id='css".$id."'>";
	$string .= "<p>".$valor."</p>";
	$string .= "<SELECT class='ConboboxesProfesores' id='profesor".$id."'>";
	while($viaje = fetch($res)){
		$nombreProfesor = $viaje["nombre"]." ".$viaje["apellidos"];
		$string .= "<OPTION VALUE='".$nombreProfesor."' >".$nombreProfesor."</OPTION>";
	}
	$string .= "</SELECT>";
	$string .= "<input class='botonCurso' id='" .$id. "' type='button' value='Asignar'    onclick='asignarCursoCarrera(this)'></input>";
	$string .= "<input class='botonCurso' id='" .$id. "' type='button' value='Desasignar' onclick='desasignarCursoCarrera(this)'></input>";
	$string .= "<input class='botonCurso' id='" .$id. "' type='button' value='Eliminar'   onclick='borrarCursoCarrera(this)'></input>";
	echo $string;
?>