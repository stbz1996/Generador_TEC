
function generarLink(){
	$.ajax({
		url: 'Control/Consultas/SolicitarProfesores.php',
		success:function(respuesta){
			if (respuesta) {
				arreglo = respuesta.split("-");
				var string = "<SELECT id='profesoresFormulario'>";
				string += "<OPTION VALUE='false' > Sin Asignar </OPTION>";
				for (var i = 0; i < arreglo.length-1; i++) {
					arregloPalabras = arreglo[i].split("#", 3);
					// [0] id, [1] nombre, [2] apellido
					var id = arregloPalabras[0];
					var nombre = arregloPalabras[1] + " " + arregloPalabras[2];
					string += "<OPTION VALUE='"+id+" - "+nombre+"' >"+nombre+"</OPTION>";
				}
				string += "</SELECT>";
				$('#comboboxProfesoresFormulario').html(string);		
			}
			else{
				$(location).attr('href','Bus/inicio.php'); // se cae
			}				
		}
	});
	ocultarMostrar();
}

function asignarProfesor(){
	var valor   = document.getElementById('profesoresFormulario').value; 
	// arregloDeSubCadenas[0] es el id, arregloDeSubCadenas[1] el nombre del profesor
	arregloDeSubCadenas = valor.split("-", 2);
	var selects = document.getElementById('selects3');
	var nodo    = document.createElement('Div');
	if (valor == "false") {alert('Debe seleccionar un profesor'); return;}
	
	// genera el hash para el formulario oculto
	var nombreProfesor = arregloDeSubCadenas[1];
	var idProf = parseInt(arregloDeSubCadenas[0], 10);
	var codigohash = generarEncriptacion();

	$.ajax({
		type	: 'POST',
		data	: {idProf:idProf,codigohash:codigohash},
		url: 'Control/Consultas/agregarFormularioHash.php',
		success:function(respuesta){
			if (respuesta) {alert('Formulario creado correctamente');}
			else{alert('No se ha logrado crear el formulario');}				
		}
	});

	// muestra el link generado
	var link = generarLinkautomatico(codigohash);
	var string = "<div class='profesorGenerado'>";
		string += "<p id='nombreProfesor'>" + nombreProfesor + "</p>";
		string += "<p>" + "<a href="+link+">" + link+ "</a></p>";
	string += "</div>";
	nodo.innerHTML = string;
	selects.appendChild(nodo);
}

function generarEncriptacion(){
	var fecha = new Date();
	return fecha.getFullYear()+''+(fecha.getMonth()+1)+''+fecha.getDate()+''+fecha.getTime();
}

function generarLinkautomatico(obj){
	return "http://localhost/Generador_TEC/Formulario.php?" + "p=" + obj.toString();
}

function ocultarMostrar(){
	document.getElementById('cursosObligatorios').style.display = 'none';
	document.getElementById('cursosCarrera').style.display = 'none';
	document.getElementById('generarlinks').style.display = 'block';
}