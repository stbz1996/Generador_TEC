///////////////////////////////////////////////////////////////////////////
// Se encarga de tomar los cursos de carrera y guardarlos en una lista   //
// asi como eliminarlos si es necesario o desasignalos                   //
///////////////////////////////////////////////////////////////////////////

var contadorCursosCarreraColocados = 1;
var identificadorCursoCarrera = '-CursoCarreraid';

function cargarCursosCarrera(){
	// si hay un periodo seleccionado continua
	if (hayPeriodo() == false) {alert('Debe seleccionar un periodo'); return;}
	
	$.ajax({
		url: 'Control/Consultas/SolicitarCursosCarrera.php',
		success:function(respuesta){
			if (respuesta) {$('#comboboxCursosCarrera').html(respuesta);}
		}
	});

	$.ajax({
		url: 'Control/Consultas/consultarGrupos.php',
		success:function(respuesta){
			if (respuesta) {$('#comboboxGruposCarrera').html(respuesta);}
		}
	});

	document.getElementById('cursosCarrera').style.display      = 'block';
	document.getElementById('cursosObligatorios').style.display = 'none';
	document.getElementById('generarlinks').style.display       = 'none';
	document.getElementById('datosIniciales').style.display     = 'none';
	document.getElementById('dt').disabled = 'true';
}

function crearComboBoxSiguienteCursoCarrera(){
	var valor   = document.getElementById('cursosDeCarreras').value;
	var grupo   = document.getElementById('gruposDeCarreras').value;
	var selects = document.getElementById('selects2');
	var nodo    = document.createElement('Div');
	if (valor == "false") {
 		alert('Debe seleccionar un curso');
 		return;
 	}
 	if (grupo == "false") {
 		alert('Debe seleccionar un grupo');
 		return;
 	}

 	valores = valor.split("-");
 	// Crea un id unico
 	var id = valor + '-' + grupo + '-' + contadorCursosCarreraColocados + identificadorCursoCarrera; 

 	// inicia la construccion del string para html
 	$.ajax({
		url: 'Control/Consultas/SolicitarProfesores.php',
		method:"POST",
        data:{id:id, valor:valor},
		success:function(respuesta){
			var string = "<div class='Curso' id='css"+id+"'>";
			string += "<p>"+valores[0]+"- Grupo "+ grupo +"</p>";
			string += "<p>"+valores[1]+"</p>";
			string += "<SELECT class='ConboboxesProfesores' id='profesor"+id+"'>";
			if (respuesta){
				arreglo = respuesta.split("-");
				for (var i = 0; i < arreglo.length-1; i++) {
					arregloPalabras = arreglo[i].split("#", 3);
					// [0] id, [1] nombre, [2] apellido
					var nombre = arregloPalabras[1] + " " + arregloPalabras[2];
					string += "<OPTION VALUE='"+nombre+"' >"+nombre+"</OPTION>";
				}
				string += "</SELECT>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Asignar' onclick='asignarCursoCarrera(this)'></input>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Desasignar' onclick='desasignarCursoCarrera(this)'></input>";
				string += "<input class='botonCurso' id='"+id+"' type='button' value='Eliminar'       onclick='borrarCursoCarrera(this)'></input>";
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
	var datos = obj.id.split('-');
	var nombreCurso = datos[1];
	var grupoCurso  = datos[2];
	var codigoCurso = datos[0];
	// verifico si los datos ya existen, grupo y curso. 
 	var res = verificarCurso(nombreCurso, grupoCurso, codigoCurso);
	if(res){
		var val;
		for (var i = 0; i < listaCursosCarrera.length; i++) {
			val = listaCursosCarrera[i];
			if ((val.nombreCurso == nombreCurso) && (val.grupo == grupoCurso) && (val.codigo == codigoCurso) && (val.profesor != profesor)){
				listaCursosCarrera[i].profesor = profesor;
				alert('Se ha cambiado el profesor del curso');
			}
		}
	}
	else{listaCursosCarrera[listaCursosCarrera.length] = new cursoCarrera(nombreCurso, profesor, grupoCurso, codigoCurso);}
	document.getElementById("css" + obj.id).style.background = '#5273F5';
}


function desasignarCursoCarrera(obj){
	var profesor = document.getElementById("profesor" + obj.id).value;
	var datos = obj.id.split('-');
	var nombreCurso = datos[1];
	var grupoCurso  = datos[2];
	var codigoCurso = datos[0];
	var estado = eliminarCursoCarrera(nombreCurso, profesor, grupoCurso, codigoCurso);
	if (estado == true) {document.getElementById("css" + obj.id).style.background = '#DBCECE';}
	else{alert('El curso no ha sido asignado');}
}


function eliminarCursoCarrera(nombreCurso, profesor, grupoCurso ,codigoCurso){
	var val;
	for (var i = 0; i < listaCursosCarrera.length; i++) {
		val = listaCursosCarrera[i];
		if ((val.nombreCurso == nombreCurso) && (val.grupo == grupoCurso) && (val.codigo == codigoCurso) && (val.profesor == profesor)){
			listaCursosCarrera.splice(i, 1);
			return true;
		}
	}
	return false;
}


function borrarCursoCarrera(obj){
	var profesor = document.getElementById("profesor" + obj.id).value;
	var datos = obj.id.split('-');
	var nombreCurso = datos[1];
	var grupoCurso  = datos[2];
	var codigoCurso = datos[0];
	var estado = eliminarCursoCarrera(nombreCurso, profesor, grupoCurso, codigoCurso);
	document.getElementById("css" + obj.id).style.display = 'none';
}

// verifica si el curso ya está en la lista, retorna true o flase
function verificarCurso(nombreCurso, pGrupo, pCodigo){
	var val;
	for (var i = 0; i < listaCursosCarrera.length ; i++) {
		val = listaCursosCarrera[i];
		if ((val.nombreCurso == nombreCurso) && (val.grupo == pGrupo) && (val.codigo == pCodigo)){
			return true;
		}
	}
	return false;
}