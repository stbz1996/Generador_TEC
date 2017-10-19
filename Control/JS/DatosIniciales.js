

function hayPeriodo(){
	var periodo   = document.getElementById('periodosDisponibles').value; 
	if (periodo == "false") {return false;}
}


function datosIniciales(){
	document.getElementById('mensajeFuncional').style.display = 'none';
	document.getElementById('cursosCarrera').style.display = 'none';
	document.getElementById('cursosObligatorios').style.display = 'none';
	document.getElementById('generarlinks').style.display = 'none';
	document.getElementById('datosIniciales').style.display = 'block';

	// Crea el combobox con el periodo.
	$.ajax({
		url: 'Control/Consultas/SolicitarPeriodos.php',
		success:function(respuesta){
			if (respuesta != '') {
				arreglo = respuesta.split("-");
				var string = "<SELECT id='periodosDisponibles' onchange='guardarPeriodo(this.value)'>";
				string += "<OPTION VALUE='false' > Periodo </OPTION>";
				for (var i = 0; i < arreglo.length-1; i++) {
					arregloPalabras = arreglo[i].split("#", 3);
					// [0] id, [1] nombre, [2] apellido
					var id = arregloPalabras[0];
					var nombre = arregloPalabras[2] + " Semestre del " + arregloPalabras[1];
					string += "<OPTION VALUE='"+id+"'>"+nombre+"</OPTION>";
				}
				string += "</SELECT>";
				$('#comboboxPeriodos').html(string);		
			}
			else{
				alert('Disculpe, hemos tenido problemas al cargar los periodos, por favor comuniquese con mantenimiento');
			}				
		}
	});
}

function guardarPeriodo(obj){
	periodoActual = obj;
	// debo eliminar todo
}