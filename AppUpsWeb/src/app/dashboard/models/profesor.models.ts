export interface Profesor {
    dias?:   any;
    imagen?: string;
    id?: string | null;
}

export interface Dias {
    jueves:    Materias;
    lunes:     Materias;
    martes:    Materias;
    miercoles: Materias;
    viernes:   Materias;
}

export interface Materias {
    materias: {};

}

export interface Materia {
    alumnos:     number;
    carrera:     string;
    horaFin:     number;
    horaIni:     number;
    laboratorio: string;
    malla:       string;
    materia:     string;
    temas:       Temas;
}

export interface Temas {
    Unidad1: Unidad;
    Unidad2: Unidad;
    Unidad3: Unidad;
    Unidad4: Unidad;
}

export interface Unidad {
    objetivos: string[];
    tema:      string;
}

export interface Horario{
    hora: string;
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
}

export interface Registro {
    actividad:   string;
    carrera:     string;
    correo:      string;
    equipos:     string;
    estudiantes: string;
    fecha:       string;
    fin:         string;
    hora:        string;
    inicio:      string;
    laboratorio: string;
    malla:       string;
    objetivo:    string;
    tema:        string;
}