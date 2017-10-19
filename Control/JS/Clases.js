class curso{
	constructor(nombreCurso, dia1Hora1, dia1Hora2, dia2Hora1, dia2Hora2, dia1, dia2){
		this.dia1Hora1   = dia1Hora1;
		this.dia1Hora2   = dia1Hora2;
		this.dia2Hora1   = dia2Hora1;
		this.dia2Hora2   = dia2Hora2;
		this.dia1        = dia1;
		this.dia2        = dia2;
		this.nombreCurso = nombreCurso;		
	}
}


class cursoCarrera{
	constructor(nombreCurso, profesor, pGrupo, pCodigo){
		this.profesor = profesor;
		this.nombreCurso = nombreCurso;
		this.grupo = pGrupo;
		this.codigo = pCodigo;
	}
}