import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../core/shared/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './../shared/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService,
    private router: Router, private toast: ToastService) { }

  ngOnInit() {
   this.criarFormulario(); 
  }
  get email() { return this.formLogin.get('email'); }
  get senha() { return this.formLogin.get('senha'); }
  

   criarFormulario() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.usuariosService.login(this.formLogin.value.email, this.formLogin.value.senha)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((mensagem: string) => {
          this.toast.show(mensagem);
        });
    }
  }





}
