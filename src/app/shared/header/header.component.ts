import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isloggedIn: boolean = false;
  userData: any;
  constructor(private router: Router,private authService: AuthService){
    this.isloggedIn =  authService.isLoggedIn();
    if (this.isloggedIn) {
      this.getProfile();
      console.log("hola desde header");
    }
     
  }
  getProfile(): void{
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.userData = data.data;
      },
      error: (error) => {
        console.error("Error al obtener los datos del usuario", error)
      }
    });
  }


  onLogout(): void {
    this.authService.logout()
  }
}
