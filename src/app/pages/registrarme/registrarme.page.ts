import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { showToast, showAlertDUOC } from 'src/app/tools/message-routines';
import { Usuario } from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class RegistrarmePage {
  usuario: Usuario = new Usuario();
  repeticionPassword = '';
  contrasenasNoCoinciden = false;

  constructor(
    private authService: AuthService,
    private databaseService: DataBaseService,
    private router: Router,
    private alertController: AlertController // Agregar AlertController
  ) {}

  ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    });
  }

  registrarUsuario(form: NgForm) {
    if (!this.validarCampos()) {
      return;
    }

    this.databaseService
      .CorreoExiste(this.usuario.correo)
      .then((usuarioExistente) => {
        if (usuarioExistente) {
          this.mostrarAlertaCorreoExistente();
          throw new Error('Correo ya registrado');
        }

        return this.databaseService.guardarUsuario(this.usuario);
      })
      .then(() => {
        this.authService.setUsuarioAutenticado(this.usuario);
        form.resetForm();
        this.usuario = new Usuario();
        this.repeticionPassword = '';
        showToast('Usuario registrado exitosamente');
        this.goToIngreso();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  mostrarMensaje(nombreCampo: string, valor: string): boolean {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async mostrarAlertaCorreoExistente() {
    const alert = await this.alertController.create({
      header: 'Correo Existente',
      message: 'El correo electrónico ya está registrado. Intente con otro correo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToIngreso() {
    this.router.navigate(['/ingreso']);
  }

  validarCampos(): boolean {
    let isValid = true;

    if (
      !this.mostrarMensaje('nombre', this.usuario.nombre) ||
      !this.mostrarMensaje('apellidos', this.usuario.apellido) ||
      !this.mostrarMensaje('correo', this.usuario.correo) ||
      !this.mostrarMensaje('pregunta secreta', this.usuario.preguntaSecreta) ||
      !this.mostrarMensaje('respuesta secreta', this.usuario.respuestaSecreta) ||
      !this.mostrarMensaje('contraseña', this.usuario.password)
    ) {
      isValid = false;
    }

    if (this.usuario.password !== this.repeticionPassword) {
      this.contrasenasNoCoinciden = true;
      isValid = false;
    } else {
      this.contrasenasNoCoinciden = false;
    }

    return isValid;
  }
}
