import { Usuario } from './../model/Usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';

@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  primerIniciarSesion = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) {
    this.inicializarAutenticacion();
   }


  async inicializarAutenticacion(){
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }
  async login(correo: string, password: string){
    await this.storage.get(this.keyUsuario).then( async (usuarioAutenticado)=>{
      if(usuarioAutenticado){
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerIniciarSesion.next(false);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined )=>{
          if(usuario){
          showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
          this.guardarUsuarioAutenticado(usuario);
          this.primerIniciarSesion.next(true);
          this.router.navigate(['inicio']);
          } else{
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        })
      }
  })
  }


  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.correo, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }
  eliminarUsuarioAutenticado(usuario: Usuario){
    this.storage.remove(this.keyUsuario);
  }
  guardarUsuarioAutenticado(usuario: Usuario){
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }
 

}
