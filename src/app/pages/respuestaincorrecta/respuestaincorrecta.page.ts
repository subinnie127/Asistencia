import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-respuestaincorrecta',
  templateUrl: './respuestaincorrecta.page.html',
  styleUrls: ['./respuestaincorrecta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RespuestaincorrectaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
