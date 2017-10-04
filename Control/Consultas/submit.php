<?php
	//require_once "connect.php";
	require_once('../../Model/Conexion/conexion.php');
	$con = conexion();
	$ampliacion = $_POST['ampliacion'];
	$practica = $_POST['practica'];
	$fecha = $_POST['fecha'];
	$jornada = $_POST['jornada'];
	$cursos = $_POST['cursos'];
	$prioridades = $_POST['prioridades'];
	$horarios = $_POST['horarios'];
	session_start();
	$id = $_SESSION['idProfesor'];
	$codigoHash = $_SESSION['codigo'];
	$query = "INSERT INTO formulario(ampliacion, estudiantesPractica, fecha, Jornada_idJornada, Profesor_idProfesor, FormularioHash_idFormularioHash) VALUES ('$ampliacion', '$practica' , '$fecha', '$jornada' , '$id', '$codigoHash');";
	if(mysqli_query($con,$query)){
		$form =  mysqli_insert_id($con);
		$tamano = count($cursos);
		for($x = 0; $x < $tamano; $x++) {
		    $curso = $cursos[$x];
		    $prioridad = $prioridades[$x];
		    $query = "INSERT INTO formulario_has_curso(Formulario_idFormulario,Curso_idCurso,Prioridad_idPrioridad)VALUES('$form','$curso','$prioridad');";
		    mysqli_query($con,$query) or die(mysqli_error($con));
		}
		$tamano = count($horarios);
		for($x = 0; $x < $tamano; $x++) {
		    $horario = $horarios[$x];
		    $query = "INSERT INTO formulario_has_horario(Formulario_idFormulario,Horario_idHorario)VALUES('$form','$horario');";
		    mysqli_query($con,$query) or die(mysqli_error($con));
		}
		echo 'Formulario creado exitosamente';
	}

?>