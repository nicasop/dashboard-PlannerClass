import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RealtimeFirebaseService } from '../../services/realtime-firebase.service';
import { Profesor, Materia, Registro } from '../../models/profesor.models';
import { FireMessagingService } from '../../services/fire-messaging.service';
// import { Chart } from 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-ver-dashboard',
  templateUrl: './ver-dashboard.component.html',
  styleUrls: ['./ver-dashboard.component.css']
})
export class VerDashboardComponent implements OnInit{
  title = 'json-angular';
  Horario: any[] = [];
  teachers!: Profesor[];
  teacher!: Profesor;
  name!: string;
  horas: string[] = ["7:00 - 9:00","9:00 - 11:00","11:00 - 13:00","14:00 - 16:00","16:00 - 18:00","18:00 - 20:00",]
  diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  materia_actual!: any;
  respuesta_dia!: Registro;
  valor: string = "";
  filtro: string = "";
  registros: Registro[] = [];

  carreras: string[] = []
  laboratorios: string[] = []


  hayMateria: boolean = false;
  hayRegistro: boolean = false;




  constructor( private firebase: RealtimeFirebaseService, private route: ActivatedRoute, private message: FireMessagingService){
    this.firebase.getCarreras().subscribe({
      next: res => {
        this.carreras = res;
      }
    })

    this.firebase.getLaboratorios().subscribe({
      next: res => {
        this.laboratorios = res;
      }
    })

  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ( {id} ) =>{
        this.name = id;
        this.firebase.getProfesor(this.name).subscribe( {
          next: res => {
            this.teacher = res[0];
            this.cargarHorario();
            this.getMateriaActual();
            console.log(this.materia_actual);
            
            if (this.materia_actual){
              this.getRespuesta();
            }
            this.getBarras("Carreras","Computación");
          }
        })
      }
    });

    // this.route.queryParams.subscribe(
    //   res => {
    //   }
    // )
  }

  ngAfterViewInit(){
    //------------------------------------------------------------------------------------------------------- 
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');

    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [{
            label: '# de Registros',
            data: [12, 19, 3, 5],
            backgroundColor: [
                this.getRandomColor(),
            ],
        }]
    };

    const options: any = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
    };

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
    //------------------------------------------------------------------------------------------------------- 
  }


  getProfesores(): void{
    this.firebase.getProfesores().snapshotChanges().pipe(
      map( cambiar => 
        cambiar.map( c => ({
          id: c.payload.key, ...c.payload.val()
        }))
      )
    ).subscribe( data => {
      this.teachers = data;
    })
  }

  cargarHorario(){
    this.Horario = []
    let materias = this.teacher.dias; //dias

    let dias_semana = Object.keys(materias); //arreglo con los dias

    for (let i = 0; i < this.horas.length; i++){
      let dia: any = {
        "hora": this.horas[i],
        "lunes": "",
        "martes": "",
        "miercoles": "",
        "jueves": "",
        "viernes": ""
      }

      for( let j = 0; j < dias_semana.length; j++ ){
        let nombre_dia = dias_semana[j];
        let materias_profesores = materias[nombre_dia].materias; //arreglo con las materias del dia
        let id_materia = Object.keys(materias_profesores);

        for ( let k = 0; k < id_materia.length; k ++){
          let mat:Materia = materias_profesores[id_materia[k]];
          let hora_materia = ""+mat.horaIni+":00 - "+mat.horaFin+":00";
          if ( hora_materia == this.horas[i]){
            dia[nombre_dia] = mat.materia;
            break;
          }
        }
      }
      this.Horario.push(dia)
    }
  }

  enviarNotificacion(name: string){
    this.message.sendNotification(name).subscribe({
      next: res => {
        console.log(res);
      }
    })
  }

  getData(filtro: string,valor:string): void{
    this.firebase.getReporte(filtro,valor).subscribe({
      next: res => {
        this.registros = res || [];
        const num_rea = this.registros.filter(registro => registro.malla == "Reajuste").length
        const num_red = this.registros.filter(registro => registro.malla == "Rediseño").length
        console.log("Reajuste: " ,num_rea);
        console.log("Rediseño: " ,num_red);
      }
    })
  }

  getBarras(filtro: string,valor: string){
    // this.getData(filtro,valor);
    // console.log(this.registros);
    const num_rea = this.registros.filter(registro => registro.malla == "Reajuste").length
    const num_red = this.registros.filter(registro => registro.malla == "Rediseño").length
    console.log("Reajuste: " ,num_rea);
    console.log("Rediseño: " ,num_red);
  }

  consultar(){
    console.log(this.valor);
    console.log(this.filtro);
    this.firebase.getMallas(this.valor).subscribe({
      next: res => {
        console.log(res)
      }
    })
    this.getData(this.filtro,this.valor)
    this.getBarras(this.filtro,this.valor)
  }


  getMateriaActual(){
    this.hayMateria = false;
    const hoy = new Date();
    const materias_dia = this.teacher.dias[this.diasSemana[hoy.getDay()].toLocaleLowerCase()].materias;
    // const materias_dia = this.teacher.dias[this.diasSemana[2].toLocaleLowerCase()].materias;
    const nombres_materias = Object.keys(materias_dia);
    for ( let i = 0; i < nombres_materias.length; i++ ){
      const materia = materias_dia[nombres_materias[i]]
      const hora = hoy.getHours();
      // const hora = 17;
      if ( hora >= materia.horaIni && hora <= materia.horaFin ){
        this.materia_actual = materia;
        this.hayMateria = true;
        break;
      }
    }   
  }

  getRespuesta(){
    this.hayRegistro = false;
    const fechaHora = new Date();
    let fechaActual = fechaHora.toLocaleDateString();
    fechaActual = fechaActual.split("/").join("-");
    this.firebase.getRespuesta(this.name).subscribe({
      next: res => {
        let respuestas = res;
        this.respuesta_dia = respuestas.filter( res => res.fecha == fechaActual && res.inicio == this.materia_actual.horaIni && res.fin == this.materia_actual.horaFin )[0]
        if (this.respuesta_dia){
          this.hayRegistro = true;
        }
      }
    }) 
  }

getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

dibujarBarras(labels: string[],dataset: number[]){
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');

    const data = {
        labels: labels,
        datasets: [{
            label: '# de Registros',
            data: dataset,
            backgroundColor: [
                this.getRandomColor(),
            ],
        }]
    };

    const options: any = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
    };

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
    //------------------------------------------------------------------------------------------------------- 
}

}
