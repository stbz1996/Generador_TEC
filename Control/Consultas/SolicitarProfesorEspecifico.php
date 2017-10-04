<?php
	require_once('Model/Conexion/conexion.php');
	function solicitarProf($x){
		// Toma los valores del documento html
		// Ejecuta un query
		$prof = fetch(ejecutarQuery("select * from profesor p inner join formulariohash f on f.Profesor_idProfesor = p.idProfesor where f.codigoHash = '$x';"));
		
		// llena las variables de session
		$_SESSION['idCarrera'] = $prof["Carrera_idCarrera"];
		$_SESSION['idProfesor'] = $prof["idProfesor"];
		$_SESSION['correo'] = $prof["correo"];
		$_SESSION['nombre'] = $prof["nombre"]." ".$prof["apellidos"];
	}

	function solicitarIdHash($codigo){
		$query = fetch(ejecutarQuery("select idFormularioHash id from formulariohash where codigoHash = '$codigo';"));
		return $query["id"];
	}
?>