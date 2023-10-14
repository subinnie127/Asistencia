import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.correo = '';
    this.usuario.password = "";
   }

  ngOnInit() {
  }
  public ingresarRecu(): void {

    if(!this.validarUsuarioRecu(this.usuario)) {
      return;
    }

    this.mostrarMensaje(this.usuario.nombre) ;

   
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    // Navegamos hacia el Home y enviamos la información extra
    this.router.navigate(['/pregunta'], navigationExtras);
  }

  /*
    Usaremos validateModel para verificar que se cumplan las
    validaciones de los campos del formulario
  */
  public validarUsuarioRecu(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValidoRecu(
      this.usuario.correo);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('Las credenciales no son correctas!');
      return false;
    }
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  goToLogin(){
    this.router.navigate(['/ingreso'])
  }

}
