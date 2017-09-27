  $(document).ready(function() {
    
    $('#agregarC').click(function(e) {
    	var $curso = $('select[id^="curso"]:last');
    	var $prioridad = $('select[id^="prioridad"]:last');
    	var num = parseInt( $curso.prop('id').match(/\d+/g), 10 ) +1;
    	if(num >= 7) {
    		alert("No se pueden agregar más campos");
    	}
    	else {
    		var $cursos = $curso.clone().prop('id', 'curso'+num );
    		var $pr = $prioridad.clone().prop('id', 'prioridad'+num );
    		$cursos.prop('name', 'curso'+num);
    		$pr.prop('name', 'prioridad'+num);
    		$cursos.insertAfter($prioridad);
    		$pr.insertAfter($cursos);
    		$("<br>").insertBefore($cursos);
    		$('#borrarC').removeAttr('disabled');
    		var $horario = $('select[id^="horario"]:last');
    		var num1 = parseInt( $horario.prop('id').match(/\d+/g), 10 ) +1;
    		var num2 = num1+1;
    		var $horarioC = $horario.clone().prop('id','horario'+num1);
    		var $horarioC2 = $horario.clone().prop('id','horario'+num2);
    		$horarioC.prop('name','horario'+num1);
    		$horarioC2.prop('name','horario'+num2);
    		$horarioC.insertAfter($horario);
    		$("<br>").insertBefore($horarioC);
    		$horarioC2.insertAfter($horarioC);
    		$("<br>").insertBefore($horarioC2);
    		alert($horarioC2.prop('name'));
    		
    	}
    	
    });

    $('#borrarC').click(function(e) {
    	var $curso = $('select[id^="curso"]:last');
    	var $prioridad = $('select[id^="prioridad"]:last');
    	var num = parseInt( $curso.prop('id').match(/\d+/g), 10 );
    	alert(num);
    	if (num <= 1)
    	{
    		alert("Se debe tener mínimo un curso");
    	}
    	else {
    		if(num == 2) {
    			$('#borrarC').attr('disabled','disabled');
    		}
    		$curso.remove();
    	    $prioridad.remove();
    	    var $horario = $('select[id^="horario"]:last');
    	    $horario.remove();
    	    var $horario2 = $('select[id^="horario"]:last');
    	    $horario2.remove();


    	}
    	

    });

    $('#agregarH').click(function(e) {
    	var tot = $('select[id^=horario]').length;
    	var curso = $('select[id^=curso]').length;
    	var cursotot = (curso*2)+2;
    	if(tot>=cursotot) {
    		alert("número máximo de horarios por la cantidad de cursos alcanzado");
    	}
    	else {
    		var $horario = $('select[id^="horario"]:last');
    		var num = parseInt( $horario.prop('id').match(/\d+/g), 10 ) +1;
    		var $horarioC = $horario.clone().prop('id','horario'+num);
    		$horarioC.prop('name','horario'+num);
    		$horarioC.insertAfter($horario);
    		$("<br>").insertBefore($horarioC);
    		$('#borrarH').removeAttr('disabled');

    	}
    });

    $('#borrarH').click(function(e) {
    	var tot = $('select[id^=horario]').length;
    	var curso = $('select[id^=curso]').length;
    	var cursotot = curso*2;
    	if(cursotot==tot) {
    		alert("número minimo de horarios por la cantidad de cursos alcanzado")
    	}
    	else {
    		var $horario = $('select[id^="horario"]:last');
    		$horario.remove();
    		tot = $('select[id^=horario]').length;
    	    curso = $('select[id^=curso]').length;
    	    cursotot = curso*2;
    	    if(cursotot ==tot) {
    	    	$('#borrarH').attr('disabled','disabled');
    	    }
    	}
    });

    $('#enviar').click(function(e) {        
    	var jornada = parseInt($('#jornada').val().match(/\d+/g), 10) ;
    	var ampliacion = $('#ampliacion').val();
    	var practica = $('#practica').val();
    	var fecha = new Date();
		var fechaform = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
		var selectcursos = [];
		var selectprioridad = [];
		var selecthorarios = [];

		$('select[id^="curso"]').each(function() {
			selectcursos.push(parseInt($(this).val().match(/\d+/g), 10));
		});
		$('select[id^="prioridad"]').each(function() {
			selectprioridad.push(parseInt($(this).val().match(/\d+/g), 10));
		});
		$('select[id^="horario"]').each(function() {
			selecthorarios.push(parseInt($(this).val().match(/\d+/g), 10));
		});

		var duplicado = revisarDuplicados(selectcursos);
		var duplicado1 = revisarDuplicados(selecthorarios);
		var definidos = revisarDefinidos(selectcursos);

		if(definidos == false) {
			alert("Uno o mas cursos no están definidos, favor eliminar las columnas o escoger un curso");
		}
		else {
			var duplicado = revisarDuplicados(selectcursos);
			var duplicado1 = revisarDuplicados(selecthorarios);
			if((duplicado== false)||(duplicado1==false)) {
				alert("Dos o más columnas duplicadas, favor escoger otra opción");
			}
			else {
				$.ajax({
					type	: 'POST',
					data	: {ampliacion:ampliacion,practica:practica,fecha:fechaform,jornada:jornada,cursos:selectcursos,prioridades:selectprioridad,horarios:selecthorarios},
					url 	: "Control/Consultas/submit.php",
					success : function(result) {
						alert(result);
					}

				})
			}
		}
		

    });

    function revisarDuplicados(valores) {
        var map = {}, i, size;
	    for (i = 0, size = valores.length; i < size; i++){
	        if (map[valores[i]]){return false;}
	        map[valores[i]] = true;
	    }
    	return true;
    };

    function revisarDefinidos(valores) {
    	var i;
    	for(i=0; i < valores.length; i++){
    		if(valores[i] == 0) {return false;}
    	}
    	return true;
    };
  });