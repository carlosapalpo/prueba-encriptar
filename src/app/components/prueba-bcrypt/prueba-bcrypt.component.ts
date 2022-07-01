import { Component, OnInit } from '@angular/core';
import * as Bcrypt from 'bcrypt';

@Component({
  selector: 'app-prueba-bcrypt',
  templateUrl: './prueba-bcrypt.component.html',
  styleUrls: ['./prueba-bcrypt.component.css']
})
export class PruebaBcryptComponent implements OnInit {
  
  textNormal = '';
  textEncrypted = '';

  textEncrypted2 = '';
  textDecrypted = '';

  constructor() { }

  ngOnInit(): void {
  }

  encriptar() {
    // const salt = Bcrypt.genSalt(4).then(
    //   result => {
    //     console.log(result);
    //   }
    // );
    // this.textEncrypted = Bcrypt.hashSync(this.textNormal, 'Hola');
  }

}
