import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  selectedFile!: File;

  userData: any;
  constructor(private authService: AuthService, private editUserService: EditUserService, private router: Router) {
    this.editForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      nickName: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
    });
    this.isloggedIn = authService.isLoggedIn();
    if (this.isloggedIn) {
      this.getProfile();
      console.log("hola desde el constructor de editar usuario");
    }

  }


  onChange(): void {
    this.isFormSubmitted = true;
    console.log(this.editForm.value);
    const id: string = this.userData._id;
    if (this.editForm.valid) {
      const { nombre, apellido, nickName, direccion, telefono } = this.editForm.value;
      this.editUserService.editUser(nombre, apellido, id, nickName, direccion, telefono).subscribe({
        next: (res) => {
          console.log("Cambio de datos exitoso" + res);
        },
        error: (error) => {
          console.error("Error en el cambio de datos" + error);
        }
      });
    }
  }


  getProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.userData = data.data;
        console.log(this.userData.imgPerf)
        this.editForm.patchValue({
          nombre: this.userData.nombre,
          apellido: this.userData.apellido,
          nickName: this.userData.nickName,
          direccion: this.userData.direccion,
          telefono: this.userData.telefono
        });
      },
      error: (error) => {
        console.error("Error al obtener los datos del usuario", error)
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Guardamos la imagen seleccionada
    console.log(this.selectedFile);
  }

  // Enviar la nueva imagen al backend
  updateProfileImage() {
    if (!this.selectedFile) {
      alert("Selecciona una imagen primero.");
      return;
    }
    const id = this.userData._id;
    const formData = new FormData();
    formData.append("imgPerf", this.selectedFile);
    console.log(formData.getAll("imgPerf"));
    this.editUserService.updateProfileImage(formData, id).subscribe({
      next: (res) => {
        alert("Imagen actualizada con éxito.");
        this.getProfile(); // Recargar la imagen actualizada
      },
      error: (error) => {console.error("Error al actualizar imagen", error)}
    });
  }
}
