import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { APIClientService, Publicacion} from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showAlertError } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient, HttpClientModule],
})
export class ForoComponent  implements OnInit {
  @ViewChild("topOfPage") topOfPage!: ElementRef;

  usuario = new Usuario();
  publicacion: Publicacion = {
    id: '',
    correo: '',
    nombre: '',
    apellido: '',
    titulo: '',
    contenido: ''};
  publicaciones: any;

  constructor(private authService: AuthService, private api: APIClientService) { 
    this.api.listaPublicaciones.subscribe((publicaciones) => {
      publicaciones.reverse(); // Ordenar de más nueva a mán antigua
      this.publicaciones = publicaciones;
    });
  }

  async ngOnInit() {
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
    this.limpiarPublicacion();
  }

  setPublicacion(id: string, correo: string, nombre: string, apellido: string, titulo: string, contenido: string) {
    this.publicacion.id = id;
    this.publicacion.correo = correo;
    this.publicacion.nombre = nombre;
    this.publicacion.apellido = apellido;
    this.publicacion.titulo = titulo;
    this.publicacion.contenido = contenido;
  }

  limpiarPublicacion() {
    this.setPublicacion('', '', '', '', '', '');
    this.api.cargarPublicaciones();
  }

  guardarPublicacion() {
    if (this.publicacion.titulo.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.contenido.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el contenido.');
      return;
    }
    if (this.publicacion.id === '') {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  editarPublicacion(pub: any) {
    if (pub.correo !== this.usuario.correo) {
      showAlertDUOC('Sólo puede editar las publicaciones a su nombre')
      return;
    }
    this.setPublicacion(pub.id, pub.correo, pub.nombre, pub.apellido, pub.titulo, pub.contenido);
    this.topOfPage.nativeElement.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  mensajePublicacion(accion: string, id: Publicacion) {
    showAlertDUOC(`La publicación ${id} fue ${accion} correctamente`);
    this.limpiarPublicacion();
  }

  crearPublicacion() {
    this.publicacion.id = '';
    this.publicacion.correo = this.usuario.correo;
    this.publicacion.nombre = this.usuario.nombre;
    this.publicacion.apellido = this.usuario.apellido;
    this.api.crearPublicacion(this.publicacion).subscribe({
      next: (publicacion) => this.mensajePublicacion('creada', publicacion.id),
      error: (error) => showAlertError('No fue posible crear la publicación.', error)
    });
  }

  actualizarPublicacion() {
    this.api.actualizarPublicacion(this.publicacion).subscribe({
      next: (publicacion) => this.mensajePublicacion('actualizada', publicacion.id),
      error: (error) => showAlertError('No fue posible actualizar la publicación.', error)
    });
  }

  eliminarPublicacion(pub: any) {
    if (pub.correo !== this.usuario.correo) {
      showAlertDUOC('Sólo puede eliminar las publicaciones a su nombre')
      return;
    }
    this.api.eliminarPublicacion(pub.id).subscribe({
      next: (publicacion) => this.mensajePublicacion('eliminada', pub.id),
      error: (error) => showAlertError('No fue posible eliminar la publicación.', error)
    });
  }

}
