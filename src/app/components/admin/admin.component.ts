import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { log, showAlertDUOC, showToast, showAlertError } from 'src/app/tools/message-routines';


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

  constructor(private router: Router, private db: DataBaseService) { }

  ngOnInit() {}

  async getUsuarios(){
    try{
      await this.db.leerUsuarios();
    log('DeleteUserPage.getUsuarios', `Cantidad de usuarios: ${this.cantidad}`);
    const usu = new Usuario();
    usu.setUsuario(
      usu.nombre,
      usu.apellido,
      usu.correo,
      usu.password,
      usu.preguntaSecreta,
      usu.respuestaSecreta,
      '',
      );
      this.Usuarios.push(usu)

    } catch(err) {
      showAlertDUOC('admincomponent.getusuarios');
    }
  }
  
}
