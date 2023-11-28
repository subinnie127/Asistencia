import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { log, showAlertDUOC, showToast, showAlertError } from 'src/app/tools/message-routines';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class AdminComponent  implements OnInit {
  Usuarios = new Array <Usuario>;
  cantidad = 0;

  constructor(private router: Router, private db: DataBaseService, private authService: AuthService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios(){
    try{
      await this.db.leerUsuarios();

      this.Usuarios = await this.db.listaUsuarios.getValue();
      this.cantidad = this.Usuarios.length;
    log('AdminComponent.getUsuarios', `Cantidad de usuarios: ${this.cantidad}`);
    
  } catch(err) {
      showAlertDUOC('admincomponent.getusuarios');
    }
  }

  async eliminarUsuario(correo: string) {
    try {
      // Llama al método eliminarUsuarioUsandoCorreo del servicio DataBaseService
      await this.db.eliminarUsuarioUsandoCorreo(correo);
  
      // Vuelve a cargar la lista de usuarios después de la eliminación
      await this.getUsuarios();
  
      showToast('Usuario eliminado correctamente');
    
    } catch (err) {
    showAlertDUOC('admincomponent.eliminarUsuario');
    }
  }

  cerrarsesion(){
    this.authService.logout();
  }
}