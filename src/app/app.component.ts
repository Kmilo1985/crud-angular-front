import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from './userModel';
import { HeaderService } from './header.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  public users: UserModel[] = [];
  public estadoProceso:string = '';
  public form: FormGroup;
  @ViewChild('myModal') myModal!: ElementRef;

  public userNew:UserModel = {
    id:0,
    name:'kmilo',
    email:'mckamilo@gmail.com'
  };

  constructor( private fb: FormBuilder,private headerService: HeaderService,private userService: UserService) {
    this.form = this.fb.group({
      id: new FormControl(null),
      name: ['', [
                  Validators.required,
                  Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
                ],
                [ ]
    ],
    email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],

    });
  }

  ngOnInit(): void {

    this.headerService.addHeader('Authorization', 'Bearer tu-token');
    this.headerService.addHeader('Custom-Header', 'valor-personalizado');

    // Si se necesita eliminar una cabecera específica
    if (this.headerService.hasHeader('Custom-Header')) {
      this.headerService.removeHeader('Custom-Header');
    }

    // Hacer una petición HTTP con las cabeceras inyectadas
    this.userService.getUsers().subscribe(response => {
      console.log(response);
    });

    // Limpiar todas las cabeceras después de la solicitud si es necesario
  //  this.headerService.clearHeaders();


    this.loadUsers();

  }

  loadUsers() {

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users, 'SERVICIO')
    });
  }

  public procesarUsuario(filtro:string){
    if('crear' == filtro){
      this.form.reset();
      this.estadoProceso = 'crear';
    }
    if('actualizar' == filtro){
      this.estadoProceso = 'actualizar';
        this.updateUser();
    }


    //const modalElement = this.myModal.nativeElement;
    // Usar el modal de Bootstrap con jQuery
    //$(modalElement).modal('show');
  }

  public editarUsuario(userEdit:UserModel){
    this.estadoProceso = 'actualizar';
    console.log(userEdit);
    this.form.reset();

    if(userEdit.id  !== 0 || userEdit.id !== null ){
      this.id?.setValue(userEdit.id);
      this.name?.setValue(userEdit.name);
      this.email?.setValue(userEdit.email);
    }
    
    // const modalElement = this.myModal.nativeElement;
    // Usar el modal de Bootstrap con jQuery
    // $(modalElement).modal('show');
  }


  createUser() {
    
    this.userNew = {
      id:0,
      name:this.name?.value,
      email:this.email?.value
    }

    this.userService.createUser(this.userNew).subscribe(
      data => {
        console.log('Datos recibidos:', data);
        this.form.reset();
        this.loadUsers();  // Recargar la lista de usuarios
      },
      error => {
        console.error('Error al recibir datos:', error);
      }
    );
  }



  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((response) => {
      console.log('Usuario eliminado:', response);
      this.loadUsers();  // Recargar la lista de usuarios
    });
  }



  public updateUser(){
    this.userNew = {
      id:this.id?.value,
      name:this.name?.value,
      email:this.email?.value
    }
    this.userService.updateUser(this.userNew.id,this.userNew).subscribe((response) => {
      console.log('Usuario Actualizado:', response);
      this.form.reset();
      this.loadUsers();  // Recargar la lista de usuarios
    });
  }


  get id (){
    return this.form.get('id');
  }

  get name (){
    return this.form.get('name');
  }

  get email (){
    return this.form.get('email');
  }
}
