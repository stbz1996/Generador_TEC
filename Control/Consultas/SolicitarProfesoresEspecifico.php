<?php
	require_once('Model/Conexion/conexion.php');
	function solicitarProf($x){
		// Toma los valores del documento html
		// Ejecuta un query
		$res = ejecutarQuery("select * from profesor where idProfesor =".$x." ");
		$prof = fetch($res);
		
		// llena las variables de session
		$_SESSION['idCarrera'] = $prof["Carrera_idCarrera"];
		$_SESSION['idProfesor'] = $prof["idProfesor"];
		$_SESSION['correo'] = $prof["correo"];
		$_SESSION['nombre'] = $prof["nombre"]." ".$prof["apellidos"];
	}
?>