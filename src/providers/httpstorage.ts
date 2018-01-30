import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HTTP} from '@ionic-native/http';
import {Storage} from '@ionic/storage';
import {AlertController} from 'ionic-angular'

@Injectable()
export class HttpStorage {
  url: string = "http://contact.app.baitizhan.com";
  //url: string = "http://localhost:8080";
  //url:string="http://192.168.1.105:8080";
  //url:string="http://192.168.31.35:8080";
  constructor(private http: Http, private nativehttp: HTTP, private storage: Storage, private alertCtrl: AlertController) {
  }

  /*getHttp(url, callback) {
    this.http.get(this.url + url).subscribe((data) => {

      this.showMsg("get:"+JSON.stringify(data));
      callback(data.json());
    }, (error) => {
      this.showMsg(JSON.stringify("error:--"+url+"--:--"+JSON.stringify(error)));
      callback(null);
    });
  }*/

  postHttp(url, body, callback) {
    this.http.post(this.url + url, body).subscribe((data) => {
      //this.showMsg("post:" + JSON.stringify(data));
      callback(data.json());
    }, (error) => {
      //this.showMsg(JSON.stringify(error));
      callback(null);
    });
  }

  getHttp(url, callback) {
    this.nativehttp.get(this.url + url, {}, {}).then((data) => {
      //this.showMsg("get:" + JSON.stringify(data.data));
      callback(JSON.parse(data.data));
    }, (error) => {
      //this.showMsg("getHttp:" + JSON.stringify(error));
      callback(null);
    });
  }

  /** postHttp(url, body, callback) {
    this.nativehttp.post(this.url + url, body,{"content-type":"application/json; charset=utf-8"}).then ((data) => {
      this.showMsg("post:" + JSON.stringify(data.data));
      callback(JSON.parse(data.data));
    }, (error) => {
      this.showMsg(JSON.stringify(error));
      callback(null);
    });
  }*/

  getStorage(key, callback) {
    this.storage.get(key).then((data) => {
      callback(data);
    });
  }

  setStorage(key, value) {
    this.storage.set(key, value);
  }

  delStorage(key) {
    this.storage.remove(key);
  }

  delAllStorage() {
    this.storage.clear();
  }

  showMsg(msg) {
    let alert = this.alertCtrl.create({
      title: '系统通知',
      subTitle: msg,
      buttons: ['好']
    });
    alert.present();
  }
}
