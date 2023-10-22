import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-correcto',
  templateUrl: 'correcto.page.html',
  styleUrls: ['correcto.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class CorrectoPage implements OnInit {

  constructor(private authService: AuthService, private bd: DataBaseService, private route: ActivatedRoute, private router: Router){
     this.route.queryParams.subscribe((params: any)=>{
      this.password = params['password'];
     });
    }
    password = '';

  ngOnInit() {

  }
  goToLogin(){
    this.router.navigate(['/ingreso'])
  }

}
