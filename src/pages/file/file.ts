import {Component} from '@angular/core';
import {ModalController,NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {HttpStorage} from '../../providers/httpstorage';
import {StreamingMedia, StreamingVideoOptions} from "@ionic-native/streaming-media";
import {Storage} from '@ionic/storage';

declare let cordova: any;
declare let ExoPlayer: any;

@Component({
  selector: 'page-file',
  templateUrl: 'file.html'
})
export class FilePage {
  videoList: any;
  url: any;
  videoTitle: string;

  constructor(public modelCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams, public file: File, public httpstorage: HttpStorage, public alertCtrl: AlertController, private streamingMedia: StreamingMedia, private toastCtrl: ToastController,private storage:Storage) {
    this.videoList = null;
    this.loadLocalVideoFile();
  }

  // ionViewDidEnter() {
  //   let this_ = this;
  //   this_.loadLocalVideoFile();
  // }


  loadLocalVideoFile() {
    let this_ = this;
    cordova.plugins.CordovaFileTransfer.findVideoList(this_.file.dataDirectory, (data) => {
      this_.videoList = data.videoList;
      for(let i = 0;i<this_.videoList.length;i++ ){
        let videoItemInfo  =  this_.videoList[i];
        this_.storage.get("videoInfoItem"+videoItemInfo.id
        ).then((videoInfoItemData)=>{
          if(videoInfoItemData!=null){
            videoItemInfo.title = videoInfoItemData.title;
          }else{
            videoItemInfo.title = videoItemInfo.fileName;
          }
        });
      }
    }, (error) => {
    });
  }

  delete(fileName: string) {
    let this_ = this;
    cordova.plugins.CordovaFileTransfer.delete(fileName.replace(".mp4", ""), "", this_.file.dataDirectory, (data) => {
      this_.presentToast("删除成功！");
      this_.loadLocalVideoFile();
    }, (error) => {
      if (error == "downloading") {
        this_.presentToast("该视频正在下载，请先暂停，再删除！");
      } else if (error == "exception") {
        this_.presentToast("删除失败，请重试！");
      } else {
        this_.presentToast("未知异常，请联系客服！");
      }
      this_.loadLocalVideoFile();
    });
  }

  playVideo(videoDir: string) {
    let this_ = this;
    let options: StreamingVideoOptions = {
     successCallback: () => {
     console.log('Video played');
     },
     errorCallback: (e) => {
     this_.presentToast("Error streaming");
     console.log('Error streaming');
     },
     orientation: 'landscape'
     };
     this_.streamingMedia.playVideo(this_.file.dataDirectory + videoDir, options);
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
