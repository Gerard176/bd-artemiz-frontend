import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../core/services/register/register.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { EditUserService } from '../../core/services/editUser/edit-user.service';

@Component({
  selector: 'app-editar-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
editForm: FormGroup;
isloggedIn: boolean = false;
isFormSubmitted: boolean = false;
  userData: any;
  constructor(private authService: AuthService, private editUserService: EditUserService, private router: Router){
    this.editForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      nickName: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
    });
    this.isloggedIn =  authService.isLoggedIn();
    if (this.isloggedIn) {
      this.getProfile();
      console.log("hola");
    }
     
  }
  validateFields(control: AbstractControl){
    const nombre = this.userData?.nombre;
    const apellido = this.userData?.apellido;
    const nickName = this.userData?.nickName;
    const direccion = this.userData?.direccion;
    const telefono = this.userData?.telefono;

    console.log(nombre,apellido,nickName,direccion,telefono);

    control.get('nombre')?.setValue(nombre);
    control.get('apellido')?.setValue(apellido);
    control.get('nickName')?.setValue(nickName);
    control.get('direccion')?.setValue(direccion);
    control.get('telefono')?.setValue(telefono);

  }

  onChange(): void{
    this.isFormSubmitted = true;
    this.validateFields(this.editForm);
    const cedula: Number = this.userData.cedula;
    if (this.editForm.valid) {
      const { nombre, apellido, nickName, direccion, telefono } = this.editForm.value;
      this.editUserService.editUser(nombre, apellido, cedula, nickName, direccion, telefono).subscribe({
        next: (res) => {
          console.log("Cambio de datos exitoso" + res);
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error("Error en el cambio de datos" + error);
        }
      });
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
