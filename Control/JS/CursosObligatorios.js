///////////////////////////////////////////////////////////////////////////
// Se encarga de tomar los cursos obligatorios y guardarlos en una lista //
// asi como eliminarlos si es necesario o desasignalos                   //
///////////////////////////////////////////////////////////////////////////

// Guarda la cantidad de cursos obligatorios que se van ingresando;
var contadorCursosColocados = 1;
var identificadorCursoObligatorio = '-CursoObligatorioid';

function cargarCursosOtros(){  
	// si hay un periodo seleccionado continua
	if (hayPeriodo() == false) {alert('Debe seleccionar un periodo'); return;}

	$.ajax({
		url: 'Control/Consultas/SolicitarCursosObligatorios.php',
		success:function(respuesta){
			if (respuesta) {
				$('#comboboxCursosObligatorios').html(respuesta);	
			}
			else{
				$(location).attr('href','Bus/inicio.php'); // se cae
			}				
		}
	});
	document.getElementById('cursosObligatorios').style.display = 'block';
	document.getElementById('cursosCarrera').style.display = 'none';
	document.getElementById('generarlinks').style.display = 'none';
	document.getElementById('datosIniciales').style.display = 'none';
	document.getElementById('dt').disabled = 'true';
}

function crearComboBoxSiguienteCursoObligatorio(){
	var valor   = document.getElementById('cursosOtrasCarreras').value;
	var selects = document.getElementById('selects');
	var nodo    = document.createElement('Div');
 	if (valor == "false") {alert('Debe seleccionar un curso'); return;}

 	// Crea un id unico para cada elemento
	var id = valor + '-' + contadorCursosColocados + identificadorCursoObligatorio;
	// Inicia con la construccion del objeto que se va a insertar
	var string = "";
	string += "<div class='Curso' id='css"+id+"'>";
	string += "<p>" + valor + "</p>";
	string += "<SELECT class='Conboboxes' id='idDia1" + id + "'>"; 
		string += "<OPTION VALUE='Lunes'>     Lunes</OPTION>";
		string += "<OPTION VALUE='Martes'>    Martes</OPTION>";
		string += "<OPTION VALUE='Miercoles'> Miercoles</OPTION>";
		string += "<OPTION VALUE='Jueves'>    Jueves</OPTION>";
		string += "<OPTION VALUE='Viernes'>   Viernes</OPTION>";
		string += "<OPTION VALUE='Sabado'>    Sabado</OPTION>";
		string += "<OPTION VALUE='Domingo'>   Domingo</OPTION>";
	string += "</SELECT>";
	string += "<SELECT class='Conboboxes' id='idDia1hora1"+id+"'>"; 
		string += "<OPTION VALUE='730am'>   7:30am</OPTION>";
		string += "<OPTION VALUE='920am'>   9:20am</OPTION>";
		string += "<OPTION VALUE='1pm'>     1:00pm</OPTION>";
	string += "</SELECT>";
	string += "<SELECT class='Conboboxes' id='idDia1hora2"+id+"'>"; 
		string += "<OPTION VALUE='730am'>   7:30am</OPTION>";
		string += "<OPTION VALUE='920am'>   9:20am</OPTION>";
		string += "<OPTION VALUE='1pm'>     1:00pm</OPTION>";
	string += "</SELECT>";
	string += "<SELECT class='Conboboxes' id='idDia2"+id+"'>"; 
		string += "<OPTION VALUE='Lunes'>     Lunes</OPTION>";
		string += "<OPTION VALUE='Martes'>    Martes</OPTION>";
		string += "<OPTION VALUE='Miercoles'> Miercoles</OPTION>";
		string += "<OPTION VALUE='Jueves'>    Jueves</OPTION>";
		string += "<OPTION VALUE='Viernes'>   Viernes</OPTION>";
		string += "<OPTION VALUE='Sabado'>    Sabado</OPTION>";
		string += "<OPTION VALUE='Domingo'>   Domingo</OPTION>";
	string += "</SELECT>";
	string += "<SELECT class='Conboboxes' id='idDia2hora1"+id+"'>"; 
		string += "<OPTION VALUE='730am'>   17:30am</OPTION>";
		string += "<OPTION VALUE='920am'>   9:20am</OPTION>";
		string += "<OPTION VALUE='1pm'>     1:00pm</OPTION>";
	string += "</SELECT>";
	string += "<SELECT class='Conboboxes' id='idDia2hora2"+id+"'>"; 
		string += "<OPTION VALUE='730am'>   7:30am</OPTION>";
		string += "<OPTION VALUE='920am'>   9:20am</OPTION>";
		string += "<OPTION VALUE='1pm'>     1:00pm</OPTION>";
	string += "</SELECT>";
	// Inserta los botones para asignar o desasignar cursos 
	string += "<input class='botonCurso' id='"+id+"' type='button' value='Asignar'    onclick='asignarCursoObligatorio(this);'></input>";
	string += "<input class='botonCurso' id='"+id+"' type='button' value='Desasignar' onclick='desasignarCursoObligatorio(this);'></input>";
	string += "<input class='botonCurso' id='"+id+"' type='button' value='Eliminar'   onclick='borrarCursoObligatorio(this);'></input>";
	// Agrega el nodo al html
	nodo.innerHTML = string;
	contadorCursosColocados ++;
	selects.appendChild(nodo);
}

function asignarCursoObligatorio(obj){
	// Para consultar se coloca el acronimo + el id del obj
	// "idDia1", "idDia1hora1" ,"idDia1hora2" ,"idDia2", "idDia2hora1", "idDia2hora2"
	var dia1      = document.getElementById("idDia1"      + obj.id).value;
	var dia2      = document.getElementById("idDia2"      + obj.id).value;
	var dia1Hora1 = document.getElementById("idDia1hora1" + obj.id).value;
	var dia1Hora2 = document.getElementById("idDia1hora2" + obj.id).value;
	var dia2Hora1 = document.getElementById("idDia2hora1" + obj.id).value;
	var dia2Hora2 = document.getElementById("idDia2hora2" + obj.id).value;

	var len = listaCursosObligatorios.length;
	var pCurso = new curso(obj.id, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2);
	var bandera = true;
	for (var i = 0; i < len; i++) {
		if(listaCursosObligatorios[i].nombreCurso == obj.id){
			listaCursosObligatorios[i].dia1Hora1 = dia1Hora1;
			listaCursosObligatorios[i].dia1Hora2 = dia1Hora2;
			listaCursosObligatorios[i].dia2Hora1 = dia2Hora1;
			listaCursosObligatorios[i].dia2Hora2 = dia2Hora2;
			listaCursosObligatorios[i].dia1 = dia1;
			listaCursosObligatorios[i].dia2 = dia2;
			bandera = false;
		}
	}
	if (bandera == true) {
		listaCursosObligatorios[len] = pCurso;
	}
	// Cambia el color del cuadro del div del curso
	document.getElementById("css" + obj.id).style.background = '#5273F5';
}

function desasignarCursoObligatorio(obj){
	var dia1      = document.getElementById("idDia1"      + obj.id).value;
	var dia2      = document.getElementById("idDia2"      + obj.id).value;
	var dia1Hora1 = document.getElementById("idDia1hora1" + obj.id).value;
	var dia1Hora2 = document.getElementById("idDia1hora2" + obj.id).value;
	var dia2Hora1 = document.getElementById("idDia2hora1" + obj.id).value;
	var dia2Hora2 = document.getElementById("idDia2hora2" + obj.id).value;
	var estado = eliminarCursoObligatorio(obj.id, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2);
	if (estado == true) {
		document.getElementById("css" + obj.id).style.background = '#DBCECE';
	}
	else{
		alert('El curso no ha sido asignado');
	}
}

function borrarCursoObligatorio(obj){
	var dia1      = document.getElementById("idDia1"      + obj.id).value;
	var dia2      = document.getElementById("idDia2"      + obj.id).value;
	var dia1Hora1 = document.getElementById("idDia1hora1" + obj.id).value;
	var dia1Hora2 = document.getElementById("idDia1hora2" + obj.id).value;
	var dia2Hora1 = document.getElementById("idDia2hora1" + obj.id).value;
	var dia2Hora2 = document.getElementById("idDia2hora2" + obj.id).value;
	var estado = eliminarCursoObligatorio(obj.id, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2);
	document.getElementById("css" + obj.id).style.display = 'none';
}

function eliminarCursoObligatorio(nombreCurso, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2){
	var len = listaCursosObligatorios.length;
	var pCurso = new curso(nombreCurso, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2);
	// Elimina el objeto de la lista
	for (var i = 0; i < len ; i++) {
		if ((listaCursosObligatorios[i].nombreCurso == nombreCurso) &&
			(listaCursosObligatorios[i].dia1Hora1 == dia1Hora1)     &&
			(listaCursosObligatorios[i].dia1Hora2 == dia1Hora2)     && 
			(listaCursosObligatorios[i].dia2Hora1 == dia2Hora1)     &&
			(listaCursosObligatorios[i].dia2Hora2 == dia2Hora2)     &&
			(listaCursosObligatorios[i].dia1 == dia1)               &&
			(listaCursosObligatorios[i].dia2 == dia2)) 
		{
			listaCursosObligatorios.splice(i, 1);
			return true;
		}
	}
	return false;
}
