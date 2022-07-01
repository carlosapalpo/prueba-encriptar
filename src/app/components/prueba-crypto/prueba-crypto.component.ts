import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-prueba-crypto',
  templateUrl: './prueba-crypto.component.html',
  styleUrls: ['./prueba-crypto.component.css']
})
export class PruebaCryptoComponent implements OnInit {

  _AES = CryptoJS.AES;
  

  textNormal = '';
  textCrypted = '';

  textCrypted2 = '';
  textDecrypted = '';

  private clave = 'jsdfjoisAES';

  constructor() { }

  ngOnInit(): void {
    this.clave = this.clave + Date.now();
  }

  encriptar() {
    this.clave = this.clave + Date.now();
    this.textCrypted = this._AES.encrypt(this.textNormal.trim(), this.clave).toString();
  }

  desencriptar() {
    this.textDecrypted = this._AES.decrypt(this.textCrypted2.trim(), this.clave).toString(CryptoJS.enc.Utf8);
  }

}
