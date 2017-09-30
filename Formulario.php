<!DOCTYPE html>
<?php
    require_once('Model/Conexion/conexion.php');
	require_once "Control/Consultas/functions.php";
?>
<html>
<head>
    <title>Formulario</title>
    <meta charset="UTF-8">
    <link   rel="stylesheet"       href="View/CSS/Estilos.css"/>
    <script type="text/javascript" src="Control/JS/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="Control/JS/agregarCurso.js"></script>
</head>

<body>
    <!-- Define el cuerpo total de la página -->
    <div id="cuerpoDePagina">

        <!-- Introduccion de el formulario -->
    	<div id="introduccionFormulario">
            <img src="View/IMG/Tec.png" width=400 height=65 id="imgForm">
    		<div id="infoProfesor">
                <p id="titulo2">Formulario para solicitud de cursos</p>
        		<p id="nombreProfesor">
                    <?php
                        session_start();
                        require_once('Control/Consultas/SolicitarProfesoresEspecifico.php');
                        $nom = intval($_GET['parametro']);
                        $nom += 787;
                        $nom -= 106158;
                        solicitarProf($nom);
                        echo $_SESSION['nombre'];
                    ?>
                </p> 
                <div id="enviarForm">
                    <input type ="submit" value="Enviar Formulario" name="Submit" id="enviar"/>
                </div>
            </div>
            
    	</div>

        <!-- Seleccion de los datos iniciales -->
        <div name="seleccion" id="seleccionInicial">
            <div>
                <p>¿Desea ampliación?</p>
                <select name="ampliacion" id="ampliacion">
                   <option value="1">SÍ</option>
                   <option value="0">NO</option>
                </select> 
            </div>
            <div>
                <p>¿Desea estudiantes de Práctica?</p>
                <select name="practica" id="practica">
                   <option value="1">SÍ</option>
                   <option value="0">NO</option>
                </select> 
            </div>
            <div>
                <p>¿Su Jornada?</p> 
                <?php listarjornada(); ?>
            </div>
            
        </div>
        <!-- ################################ -->



        <div name="cursos" id="CursosFormulario">
            <div id="divForm">
                <p>Seleccionar Cursos</p>
                <input class="botonForm" type ="submit" value="Agregar" id="agregarC" />
                <input class="botonForm" type ="submit" value="Remover" id="borrarC" disabled="true" />
            </div>

            <div id="selectsForm">
                <p id="txtFomInfo1">Curso</p>
                <p id="txtFomInfo2">Prioridad</p>
                <?php
                    listarcursos();
                    listarprioridad();
                ?>
            </div>
        </div>


        <div name="horarios" id="horariosFormulario">
            <div id="divForm">
                <p>Seleccionar Horarios</p>
                <input class="botonForm" type ="submit" value="Agregar" id="agregarH" />
                <input class="botonForm" type ="submit" value="Remover" id="borrarH" disabled="true"/>
            </div>

            <div id="selectsForm">
                <p id="txtFomInfo3">Horarios disponible</p>
                <select name="horario1" id="horario1" class="comboboxFormulario3">;
                    <?php addhorario2(); ?>
                
                
            </div>
        </div>
    </div>
</body>
</html>