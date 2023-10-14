import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  usuario: any;
  public respuesta = '';
  password = '';


  constructor(
    private router: Router,
    private toastController: ToastController) { 
      const state = this.router.getCurrentNavigation()?.extras?.state;
      if (state && state['usuario']) {
        this.usuario = state['usuario'];
      } }

  ngOnInit() {
  }
  mostrarDatosPersona() {
    console.log(this.usuario);
    if (this.usuario && this.respuesta === this.usuario.respuestaSecreta) {
      // Respuesta correcta, redirigir a la página de contraseña correcta con la contraseña como parámetro
      this.router.navigate(['/respuestacorrecta', { password: this.usuario.password }]);
    } else {
      // Respuesta incorrecta, mostrar mensaje de error
      this.router.navigate(['/respuestaincorrecta']);
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Posición del Toast (top, bottom, middle)
    });
    toast.present();
  }

}
