<?php
	// Crea la conexion con la base de datos
	function conexion(){
		$server = "127.0.0.1";
		$user = "root";
		$password = "";
		$dataBase = "AutomatizacionDeHorariosINGTEC";
		$conection = mysqli_connect($server, $user, $password);
		if($conection){
			mysqli_select_db($conection, $dataBase);
			return $conection;
		}
	}

	// Ejecta un query
	function ejecutarQuery($query){
		$conect = conexion();
		return $conect->query($query);
	}

	// Retorna los resultados
	function fetch($result){
		return mysqli_fetch_assoc($result);
	}
?>