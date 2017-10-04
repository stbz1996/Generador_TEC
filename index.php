<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8" />
	<link   rel="stylesheet"       href="View/CSS/Estilos.css"/>
	<script type="text/javascript" src="Control/JS/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="Control/JS/Clases.js"></script>
	<script type="text/javascript" src="Control/JS/GenerarLinks.js"></script>
	<script type="text/javascript" src="Control/JS/Generador.js"></script>
	<script type="text/javascript" src="Control/JS/CursosObligatorios.js"></script>
	<script type="text/javascript" src="Control/JS/CursosCarrera.js"></script>
	<script type="text/javascript" src="Control/JS/encriptacion.js"></script>
	<title>Login</title>
</head>
<body>
	<!-- Define el cuerpo total de la página -->
	<div id="cuerpoDePagina">
		<!-- Define la pestaña de presentacion con el logo del TEC mas info -->
		<div id="presentacion">
			<img src="View/IMG/Tec.png" width=400 height=65>
		</div>

		<!-- Botones iniciales las categorias -->
		<div id="botoneraInicial">
			<input type="button" value="Generar links"                     onclick="generarLink()"></input>
			<input type="button" value="Agregar cursos de otras escuelas"  onclick="cargarCursosOtros()"></input>	
			<input type="button" value="Agregar cursos de carrera"         onclick="cargarCursosCarrera()"></input>
			<input type="button" value="Generar Horarios"                  onclick="print()"></input>
		</div>

		<!-- Genera los formularios para los profesores -->
		<div id="generarlinks" class="CursosGeneral">
			<p id="titulo">Generar links de formularios</p>
			<span id="comboboxProfesoresFormulario"></span>
			<input type="button" value="Generar Link" id="agregar" onclick="asignarProfesor()"></input>
			<div id="selects3"></div>
		</div>

		<!-- Muestra los cursos obligatorios -->
		<div id="cursosObligatorios" class="CursosGeneral">
			<p id="titulo">Asignar cursos fijos de otras escuelas</p>
			<!-- Aqui se agregan los cursos pedidos de la BS -->
			<span id="comboboxCursosObligatorios"></span>
			<input type="button" value="Agregar" id="agregar" onclick="crearComboBoxSiguienteCursoObligatorio();"></input>
			<!-- Se muestran los cursos obligatorios de otras escuelas-->
			<div id="selects"></div>
		</div>

		<!-- Muestra los cursos de carrera -->
		<div id="cursosCarrera" class="CursosGeneral">
			<p id="titulo">Asignar cursos de carrera</p>
			<!-- Aqui se agregan los cursos pedidos de la BS -->
			<span id="comboboxCursosCarrera"></span>
			<input type="button" value="Agregar" id="agregar" onclick="crearComboBoxSiguienteCursoCarrera();"></input>
			<!-- Se muestran los cursos obligatorios de otras escuelas-->
			<div id="selects2"></div>
		</div>
	</div>

</body>
</html>