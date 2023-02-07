import { Component, OnInit } from '@angular/core';
import HorarioDiaz from 'src/assets/json/DDiaz.json';
import { RealtimeFirebaseService } from '../../dashboard/services/realtime-firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
 title = 'json-angular';
 Horario: any = HorarioDiaz;
 
    


  constructor(private db:RealtimeFirebaseService) { }

  ngOnInit(): void {
    // this.db.get_data();
    // this.db.get_profesores();
    // this.db.get_profesor('ddiazupseduec');
  }
 

}
