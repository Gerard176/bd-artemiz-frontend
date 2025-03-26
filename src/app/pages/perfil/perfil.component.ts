import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  isloggedIn: boolean = false;
  userData: any;
  constructor(private authService: AuthService){
    this.isloggedIn =  authService.isLoggedIn();
    if (this.isloggedIn) {
      this.getProfile();
      console.log("hola");
    }
     
  }
  getProfile(): void{
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.userData = data.data;
        console.log(this.userData.imgPerf);
      },
      error: (error) => {
        console.error("Error al obtener los datos del usuario", error)
      }
    });
  }


}
