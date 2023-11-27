import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Animation, AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {
  correo = 'atorres@duocuc.cl';
  password = '1234';
  @ViewChild('titulo', { read: ElementRef, static: true })
  titulo!: ElementRef;

  constructor(private authService: AuthService, private router: Router, private AnimationController: AnimationController, private ElementRef: ElementRef) { }

  ngOnInit() {
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  goToRecuperarContra(){
    this.router.navigate(['/correo']);
  }

  public ngAfterViewInit(): void {
    const animation = this.AnimationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(1)
      .duration(5000)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .fromTo('opacity', 0.5, 1);
  
  
    animation.play();
  }
  
}
