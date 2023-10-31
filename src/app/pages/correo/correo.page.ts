import { DataBaseService } from './../../services/data-base.service';
import { Component, OnInit } from '@angular/core';
// Las clases Router y NavigationExtras son necesarias para que la página login le pase
// el nombre de usuario a la página home
import { Router, NavigationExtras } from '@angular/router';
// La clase ToastController sirve para mostrar mensajes emergente que duran un par de segundos
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'], 
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CorreoPage implements OnInit {
  constructor(
    private router: Router, 
    private bd: DataBaseService,
    private toastController: ToastController ) {
 }
  correo = 'atorres@duocuc.cl';

  public ngOnInit(): void {
  }

  async BuscarCorreo(correo: string) {
    await this.bd.CorreoExiste(correo).then(async (usuario : Usuario | undefined) => {
      if (usuario){
        showToast(`El correo es: ${usuario.correo}`);
    
        this.router.navigate(['/pregunta'], {queryParams: {pregunta: usuario.preguntaSecreta}});
        console.log(usuario)
      } else {
        showToast(`El correo no existe`)
      }
    });
  }

  goToLogin(){
    this.router.navigate(['/ingreso'])
  }
}