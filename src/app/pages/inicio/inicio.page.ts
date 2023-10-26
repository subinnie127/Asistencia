import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, 
    CommonModule, 
    FormsModule, 
    QrComponent,
    MiclaseComponent, 
    MisdatosComponent,
    ForoComponent
]
})
export class InicioPage implements OnInit {
  componente_actual = 'qr';

  constructor() { }

  ngOnInit() {
  }
 CambiarComponente(event: any){
  this.componente_actual= event.detail.value

 }
}
