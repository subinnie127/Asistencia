import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router  } from '@angular/router';

@Component({
  selector: 'app-respuestaincorrecta',
  templateUrl: './respuestaincorrecta.page.html',
  styleUrls: ['./respuestaincorrecta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RespuestaincorrectaPage implements OnInit {
  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
  }
  
  public volverAlInicio(): void{
    this.router.navigate(['/ingreso'])
  }

}
