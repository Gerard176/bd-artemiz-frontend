import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { EliminateUserService } from '../../core/services/eliminateUser/eliminate-user.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  isloggedIn: boolean = false;
  userData: any;
  constructor(private authService: AuthService, private eliminateUserService: EliminateUserService){
    this.isloggedIn =  authService.isLoggedIn();
    if (this.isloggedIn) {
      this.getProfile();
      console.log("hola desde el perfil");
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

  onDelete(): void{
    const id = this.userData._id;
    this.eliminateUserService.deleteUser(id).subscribe({
      next: (res) =>{
        console.log("hola desde eliminar usuario")
        this.authService.logout();
        console.log("eliminacion de usuario exitosa", res);
        
      },
      error: (error) =>{
        console.error("Error en la eliminacion del usuario", error);
      }
    });
  }

}
