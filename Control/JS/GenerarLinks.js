function generarLink(){
	$.ajax({
		url: 'Control/Consultas/SolicitarProfesoresParaFormulario.php',
		success:function(respuesta){
			if (respuesta) {
				$('#comboboxProfesoresFormulario').html(respuesta);	
			}
			else{
				$(location).attr('href','Bus/inicio.php'); // se cae
			}				
		}
	});
	document.getElementById('cursosObligatorios').style.display = 'none';
	document.getElementById('cursosCarrera').style.display = 'none';
	document.getElementById('generarlinks').style.display = 'block';
}


function asignarProfesor(){
	var valor   = document.getElementById('profesoresFormulario').value; 
	// arregloDeSubCadenas[0] es el id, arregloDeSubCadenas[1] el nombre del profesor
	arregloDeSubCadenas = valor.split("-", 2);
	var selects = document.getElementById('selects3');
	var nodo    = document.createElement('Div');
	if (valor == "false") {alert('Debe seleccionar un profesor'); return;}
	var link = "http://localhost/Generador_TEC/Formulario.php?";
	
	// inicia la codificacion del string, se envia el id del profesor con algunas operaciones matematicas
	// que deben ser resueltas en la otra capa de datos para obtener el id original
	var idProf = parseInt(arregloDeSubCadenas[0], 10);
	// operaciones matematicas sobre el id
	idProf +=106158;
	idProf -= 787; 
	var parametros = "parametro="+idProf;

	var string = "<div class='profesorGenerado'>";
		string += "<p id='nombreProfesor'>" + arregloDeSubCadenas[1] + "</p>";
		string += "<p>" + "<a href="+link+parametros+">" + link+parametros+ "</a></p>";
	string += "</div>";

	nodo.innerHTML = string;
	selects.appendChild(nodo);
}