<?php
	require_once('Model/Conexion/conexion.php');

	function listarjornada() {
		echo '<select name="jornada" id="jornada">';
		$result = ejecutarQuery("SELECT idjornada, descripcion FROM jornada;");
		while($row = fetch($result)) {
 			echo '<option   value=\"'.$row['idjornada'].'">'.$row['descripcion'].'</option>';
 		}
 		echo "</select>";
	}

	function listarcursos() {
		echo '<select name="cursos1" id="curso1" class="comboboxFormulario"> <option value="0">Sin Definir</option>';
		$result = ejecutarQuery("SELECT idcurso, codigo, nombre FROM curso;");			
		while($row = fetch($result)) {
 			echo '<option   value=\"'.$row['idcurso'].'">'.$row['codigo'].' - '.$row['nombre'].'</option>';
 		}
 		echo "</select>";
	}

	function listarprioridad() {
		echo '<select name="prioridad1" id="prioridad1" class="comboboxFormulario2">';
		$result = ejecutarQuery("SELECT idprioridad, descripcion FROM prioridad;");			
		while($row = fetch($result)) {
 			echo '<option   value=\"'.$row['idprioridad'].'">'.$row['descripcion'].'</option>';
 		}
 		echo "</select>";
	}

	function addhorario2() {						
		$result = ejecutarQuery("SELECT idhorario, primerDia, horaEntradaPrimerDia, horaSalidaPrimerDia, segundoDia, horaEntradaSegundoDia, horaSalidaSegundoDia FROM horario;");
		while($row = fetch($result)) {
			if($row['primerDia'] == $row['segundoDia']){
				echo '<option   value=\"'.$row['idhorario'].'">'.$row['primerDia'].': '.$row['horaEntradaPrimerDia']
				. ' - '.$row['horaSalidaPrimerDia'].'</option>';
			}
			else if(($row['horaEntradaPrimerDia'] ==$row['horaEntradaSegundoDia'])&&($row['horaSalidaSegundoDia'] ==$row['horaSalidaPrimerDia'] )) {
				echo '<option   value=\"'.$row['idhorario'].'">'.$row['primerDia']. ' y '. $row['segundoDia'].': '.$row['horaEntradaPrimerDia']
				. ' - '.$row['horaSalidaPrimerDia'].'</option>';
			}
			else {
				echo '<option   value=\"'.$row['idhorario'].'">'.$row['primerDia']. ': '.$row['horaEntradaPrimerDia']
				. ' - '.$row['horaSalidaPrimerDia']. '/'. $row['segundoDia'].': '.$row['horaEntradaSegundoDia']
				. ' - '.$row['horaSalidaSegundoDia'].'</option>';
			}

 		}
 		echo "</select>";
	}
?>