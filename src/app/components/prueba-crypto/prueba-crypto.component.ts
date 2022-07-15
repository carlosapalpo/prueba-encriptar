import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

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

  jsonEnviar: any = {};
  private clave = '';
  private salt = '';

  // private _PUBLIC_KEY = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgs9VZrlheIOZ6vsEavl4Oq5MwSLE104XId/qoyn9CFkEy+WWHkBvd9hloNzTyEG3NnyHYpPNMgnfmEswdXRNqCgcXqLOVgvaHsemu5vJOEfx50L1g6G9zM3Fi7i3fONhDJkNgAN3KOm7u6n48Qyu33Nq9mXyHazxn1H5jeyrYMX79YmDj9Y/5wpIiE3qIhDPu1m70kd3T1yqlTizoyt9iB00X8CPMB+9yrCEQJwm2lRLPrQTaDIO5zfMMZuKCPw3XjbEMT7KK7ZPw1ioBDFUZdMAiUoPQOv51Vw7ZLBlMZjsEn+Fl7QCsL1rrnzNUR9lQejI+LdpETSu/SNjxQmwmCQQxIClh7OQRk+2a0vS4J2hyJVmjTTfAxDktS9imGDRcEaAV0n+JRscwMcWPYqvyRpbGkFPTv+zalwZcfwVe9mPHO7QYR/PmEUNq7IOPUvLaCCIVv2k8T99neJQ/3IxmOuw8TH5m274PeEnWm6Kxta/Em8TsZPTOjs0rCNHgn4q5DWVaoomcXOwxva08k1A1t/Ufj/ZDhTlriUvxUbHmJyHsThmM/LncXuZzvKGXT6YDnuhoumo4a5aNM0iVSSNUnHpdLgSCJZ0zyciSTFYTaBnTBINKl1oKK38pmuPhHZnV5ySgdCSuZ52tbMFqdeQwSXjb8eG9jjhsFIUgGVEjnkCAwEAAQ==';
  // private _PRIVATE_KEY = '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'

  private _PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhp8NptzAPSL0DUAEV8jdOn6SYJOtgj2iG4m87P2cJXn5b9heMOJezAPp77gPA1fiNx+m6MGkI5rM/mqA+ZrH7qoZ0HaaLPswV4/S+X99QnWcP+aY6Whcx7rfweWU36lq1izwXmMEQZG59Zt7v/YBWLn7tEm1x7+sm4eULg6Ir9xfRrxAZlsowDzJ5NQQL3VDOcqHqL/AaQ38+WklDwZwK5H18PWnqM/V57QsOmttep4Au9EWJhaLT/QfrpDlkgPbnnC6gtd9SA1MFhqhiFZdE03XxXJfGrV7HKO+Uv69AORjaCOVdxlSzfNxh4SyLkkCyu6iJVkm86uGhW8DpwiN4QIDAQAB';
  private _PRIVATE_KEY = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCGnw2m3MA9IvQNQARXyN06fpJgk62CPaIbibzs/Zwleflv2F4w4l7MA+nvuA8DV+I3H6bowaQjmsz+aoD5msfuqhnQdpos+zBXj9L5f31CdZw/5pjpaFzHut/B5ZTfqWrWLPBeYwRBkbn1m3u/9gFYufu0SbXHv6ybh5QuDoiv3F9GvEBmWyjAPMnk1BAvdUM5yoeov8BpDfz5aSUPBnArkfXw9aeoz9XntCw6a216ngC70RYmFotP9B+ukOWSA9uecLqC131IDUwWGqGIVl0TTdfFcl8atXsco75S/r0A5GNoI5V3GVLN83GHhLIuSQLK7qIlWSbzq4aFbwOnCI3hAgMBAAECggEATu4ImhIKII5S20Xyhem+VCKL/lX3wEoUtuKuQ6F6oLqAVmRc7Xp8LFALJEMdgk9P0hQbz5Jhg4KquGyHjFGE8dkH46L2SHNKZ7xq7WAjeAjvAMRaWVeYNn7J3KyX+f8iJcsZb63MfAlOJ8Pu7aD2Lyh0fMNO8nveXx5B8jMRT1IiUaERBgnubuzaXBNCgqVbvHJ4EIhlm0k67Xrv0bOwYhJ325fcYPgo7pdCDd3V6hbg1upU2wFE3pl/M2sFiFHRnlgS4RGuYH2mOT9wUZ5r/kv2KkqGlgOS+OntTrFVqRFT2duF1j572Nxmh8EgyRaR5CjPSA9wb4j6OyNT3gMldQKBgQDMdqY4kxAQk3qd28tTVeB9UrDb8dqlEsLez6J6phdfExklrbfnD5RB1NX4WA+nNZcqMV4GUdWi+obkO9tIbjdx1hC6Z7Ruhwme/LljSPsalnKZNaUzea/oRog+CbTjV4Y3G7rbn7VkuaGyCKw+gy6u8neS58bLioNVoeZADGcbawKBgQCojbhTxL/xHwg84oInnUgB1Okm+xgZbVbqVr9m18xctTzOb9BnWePvpioFuFi5f5pxQu9UQXLDObPJoSGM8QJbxwSXfj+ppueObuE5BGWHaVDsuFEvb63zYjJnnI6A0Ra4WJeNAxmJrrQubBfkwo1HjHhKBDX+cCm7RXJfOG864wKBgQCEct/eijW/5ylpFTazd1ADHwv+jr+Ka4rc9zhTp0BAkIibxdr5zTfHJW6uf600Lh0McgpsoZp5Bz1WoAe+9dbo4TjY59EUQFnVKfWWAXLYmFkIMp4fqFZxay9asMMC+nGxRT9Ygi7pXu8F+2RI4oXdQqh++7HlrIbDdCtJlj88nQKBgQCfamqLz+o6Az+nVhQDo54XHWfmllWUtvUdbi5Y9oEyrbd1CAvzs/EBGAdmoZRI3YcU2FnDNqN0QX7plJxG0SuJ4hFVtvI/Yrxe2j/pzV65U8JWIX2nf9jl+Fnz5P5il18Fu8SaefQNZE7GGTYABoHYyeJ7HsByhWLy3BvwM1AAQQKBgB6kVXMaQn96fhvNyuZTeJZa4T2LpJCbRifa2Zg9GO1B5rNv1yVxRa0vFHNcQGD3QZtiB6IYnyguGeF2b2Drplbnr6xFjP9QE/bp2CfT08DzyRZZ1xzFtnqBwPX1Lfowaff7sqlvXJTRBwsaEFvrOHNYqxgcFFqPRNf9HdbdMw9t'

  private encryptor!: JSEncrypt;
  private decryptor!: JSEncrypt;

  tiempoInicialEncrypt: number = 0;
  tiempoFinalEncrypt: number  = 0;

  tiempoInicialDescrypt: number = 0;
  tiempoFinalDescrypt: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.encryptor = new JSEncrypt();
    this.encryptor.setPublicKey(this._PUBLIC_KEY);
    this.decryptor = new JSEncrypt();
    this.decryptor.setPrivateKey(this._PRIVATE_KEY);
  }

  /**
   * Funcion qu encripta un texto.
   */
  encriptar() {
    this.tiempoInicialEncrypt = Date.now();
    if (this.textNormal && this.textNormal !== '') {
      const salt = this.genCharRandom(6);
      const clave = this.genCharRandom(12);
      const mensaje = salt + this.textNormal.trim();
      const encriptador = this._AES.encrypt(mensaje, clave, {
        iv: CryptoJS.enc.Hex.parse(salt),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      console.log("mensaje: ", mensaje);
      console.log("clave: ",clave);
      console.log("key: ", encriptador.key.toString());
      console.log("iv: ",encriptador.iv.toString());
      console.log("cipher: ",encriptador.ciphertext.toString());
      console.log("Texto: ",encriptador.toString());
      console.log("Salt: ",encriptador.salt.toString());
      this.textCrypted = encriptador.toString();
      const _data = `${salt}.${clave}`;
      this.textCrypted2 = this.encryptor.encrypt(_data).toString();
      this.jsonEnviar = {
        data: this.textCrypted2,
        mensaje: this.textCrypted
      }
    } else {
      this.textCrypted = 'Escriba una palabra a encriptar'
    }
    this.tiempoFinalEncrypt = Date.now();
  }

  /**
   * Funcion que desencripta un texto.
   * @param encrypt texto encriptado.
   * @param salt salt del texto.
   * @param clave clave de desencriptación.
   */
  private desencriptar(encrypt: string, salt: string, clave: string) {
    this.textDecrypted = this._AES.decrypt(encrypt.trim(), clave, {
      iv: CryptoJS.enc.Hex.parse(salt),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    if (this.textDecrypted.includes(salt)) {
      this.textDecrypted = this.textDecrypted.replace(salt, '');
    } else {
      this.textDecrypted = 'Error al encriptar salt incorrecto.'
    }
  }

  /**
   * Toma la información del json y la desencripta.
   */
  desencriptarJson() {
    this.tiempoInicialDescrypt = Date.now();
    let descrypt = this.decryptor.decrypt(this.jsonEnviar.data).toString();
    if (descrypt.includes('.')){
      let textos = descrypt.split('.');
      let encrypt =this.jsonEnviar.mensaje;
      let salt = textos[0];
      let clave = textos[1];
      this.desencriptar(encrypt, salt, clave)
    } else {
      this.textDecrypted = 'Error al encriptar clave privada incorrecta.'
    }
    this.tiempoFinalDescrypt = Date.now();
  }

  /**
   * Genera una cadena con caracteres aleatorios.
   * @returns cadena de texto generada.
   */
  private genCharRandom(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * length));
    }
    return result;
  }

}
