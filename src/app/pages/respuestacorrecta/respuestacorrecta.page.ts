import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-respuestacorrecta',
  templateUrl: './respuestacorrecta.page.html',
  styleUrls: ['./respuestacorrecta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RespuestacorrectaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
