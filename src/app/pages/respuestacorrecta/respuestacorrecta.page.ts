import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-respuestacorrecta',
  templateUrl: './respuestacorrecta.page.html',
  styleUrls: ['./respuestacorrecta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RespuestacorrectaPage implements OnInit {
  contrasenaRecuperada: string = ''

  constructor(private route: ActivatedRoute) { 
    // Obtén el parámetro de la contraseña de la URL
    const contrasenaRecuperada = this.route.snapshot.paramMap.get('password');
    if (contrasenaRecuperada) {
      this.contrasenaRecuperada = contrasenaRecuperada;
    }
  }

  ngOnInit() {
  }

}
