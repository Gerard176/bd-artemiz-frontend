import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../../core/services/register/register.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm: FormGroup;
  isFormSubmitted: boolean = false;
  isAlreadyRegistered: boolean = false;
  constructor(private registerService: RegisterService, private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      passwordConfirm: new FormControl('')
    },
      {
        validators: this.passwordMatchValidator,
      });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    if (password != passwordConfirm) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onRegister(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.valid) {
      const { nombre, apellido, nickName, email, direccion, telefono, password } = this.registerForm.value;
      this.registerService.register(nombre, apellido, nickName, email, direccion, telefono, password).subscribe({
        next: (res) => {
          console.log("Registro exitoso");
          this.authService.login(email, password).subscribe({
            next: (res) => {
              console.log("Login exitoso:", res);
              this.authService.setSession(res.token);
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error("Error en el login:", error);
            }
          }
          );
        },
        error: (error) => {
          if (error.status == 403) {
            this.isAlreadyRegistered = true;
          }
          console.error("Error en el registro");
        }
      });
    }
  }

}
