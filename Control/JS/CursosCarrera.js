///////////////////////////////////////////////////////////////////////////
// Se encarga de tomar los cursos de carrera y guardarlos en una lista   //
// asi como eliminarlos si es necesario o desasignalos                   //
///////////////////////////////////////////////////////////////////////////

var contadorCursosCarreraColocados = 1;
var identificadorCursoCarrera = '-CursoCarreraid';

function cargarCursosCarrera(){
	$.ajax({
		url: 'Control/Consultas/SolicitarCursosCarrera.php',
		success:function(respuesta){
			if (respuesta) {
				$('#comboboxCursosCarrera').html(respuesta);	
			}
			else{
				$(location).attr('href','Bus/inicio.php'); // se cae
			}				
		}
	});
	document.getElementById('cursosCarrera').style.display = 'block';
	document.getElementById('cursosObligatorios').style.display = 'none';
	document.getElementById('generarlinks').style.display = 'none';
}

function crearComboBoxSiguienteCursoCarrera(){
	var valor   = document.getElementById('cursosDeCarreras').value;
	var selects = document.getElementById('selects2');
	var nodo    = document.createElement('Div');
	if (valor == "false") {
 		alert('Debe seleccionar un curso');
 		return;
 	}
 	// Crea un id unico
 	var id = valor + '-' + contadorCursosCarreraColocados + identificadorCursoCarrera; 
 	
 	// inicia la construccion del string para html
 	$.ajax({
		url: 'Control/Consultas/SolicitarProfesores.php',
		method:"POST",
        data:{id:id, valor:valor},
		success:function(respuesta){
			if (respuesta) {	

				arreglo = respuesta.split("-");
				var string = "<div class='Curso' id='css"+id+"'>";
				string += "<p>"+valor+"</p>";
				string += "<SELECT class='ConboboxesProfesores' id='profesor"+id+"'>";

				for (var i = 0; i < arreglo.length-1; i++) {
					arregloPalabras = arreglo[i].split("#", 3);
					// [0] id, [1] nombre, [2] apellido
					var nombre = arregloPalabras[1] + " " + arregloPalabras[2];
					string += "<OPTION VALUE='"+nombre+"' >"+nombre+"</OPTION>";
				}
				string += "</SELECT>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Asignar'    onclick='asignarCursoCarrera(this)'></input>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Desasignar' onclick='desasignarCursoCarrera(this)'></input>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Eliminar'   onclick='borrarCursoCarrera(this)'></input>";
				nodo.innerHTML = string;
				contadorCursosCarreraColocados++;
				selects.appendChild(nodo);
			}				
		}
	});
}

// Asigna el curso y lo agrega a la lista de cursos de carrera
function asignarCursoCarrera(obj){
	var profesor = document.getElementById("profesor" + obj.id).value;
	var nombreCurso = obj.id;
	var len = listaCursosCarrera.length;
	var pCurso = new cursoCarrera(nombreCurso, profesor);
	var bandera = true;
	for (var i = 0; i < len; i++) {
		if(listaCursosCarrera[i].nombreCurso == nombreCurso){
			listaCursosCarrera[i].profesor = profesor;
			bandera = false;
		}
	}
	if (bandera == true) {listaCursosCarrera[len] = pCurso;}
	document.getElementById("css" + obj.id).style.background = '#5273F5';
}

function desasignarCursoCarrera(obj){
	var profesor = document.getElementById("profesor" + obj.id).value;
	var estado = eliminarCursoCarrera(obj.id, profesor);
	if (estado == true) {
		document.getElementById("css" + obj.id).style.background = '#DBCECE';
	}
	else{
		alert('El curso no ha sido asignado');
	}
}

function borrarCursoCarrera(obj){
	var profesor = document.getElementById("profesor" + obj.id).value;
	var estado = eliminarCursoCarrera(obj.id, profesor);
	document.getElementById("css" + obj.id).style.display = 'none';
}

function eliminarCursoCarrera(nombreCurso, profesor){
	var len = listaCursosCarrera.length;
	var pCurso = new cursoCarrera(nombreCurso, profesor);
	for (var i = 0; i < len ; i++) {
		if ((listaCursosCarrera[i].nombreCurso == nombreCurso)){
			listaCursosCarrera.splice(i, 1);
			return true;
		}
	}
	return false;
}