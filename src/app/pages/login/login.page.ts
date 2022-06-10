import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { InteracionService } from '../../service/interacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
    correo : null,
    password : null
  }

  constructor(private auth:AuthService,
              private interacion : InteracionService,
              private router : Router ) { }
/*
  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }
 */
  ngOnInit() {
   /* this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });*/

  }

async login(){
  await this.interacion.presentLoading('Ingresando...')
 console.log('credenciales ->',this.credenciales); 
  const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch(error => {
    console.log('error');
    this.interacion.closeLoading();
    this.interacion.presentToast('Usuario o Contraseña Inválido')
  })
  if (res){
    console.log('res ->',res);
    this.interacion.closeLoading();
    this.interacion.presentToast('Ingresado Con éxito');
    this.router.navigate(['/home'])
  }
}

  /*async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
  
    if(user){
      this.router.navigateByUrl('/home', {replaceUrl:true});
    }else{
      this.showAlert('Registro fallido', 'Por favor intenta de nuevo');
    }
  
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home', {replaceUrl:true});
    }else{
      this.showAlert('No se puede ingresar', 'Por favor intenta de nuevo');
    }
  }

  async showAlert(header, message){
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['Aceptar'],
    });
    await alert.present();
  }


*/


}
