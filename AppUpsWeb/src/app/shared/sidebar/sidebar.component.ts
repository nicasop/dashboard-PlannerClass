import { Component, OnInit } from '@angular/core';
import { RealtimeFirebaseService } from '../../dashboard/services/realtime-firebase.service';
import { Profesor } from '../../dashboard/models/profesor.models';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  teacher: string = ''

  teachers!: Profesor[];

  constructor( private firebase: RealtimeFirebaseService) {}

  buscar(){
    console.log(this.teacher);
  }

  ngOnInit(): void {
    this.getProfesores()
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

}
