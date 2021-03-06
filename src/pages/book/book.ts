import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})

export class BookPage {
  seg: number;
  subs:Array<{tit:string,cot:Array<{str:string}>}>;
  callback:any;
  subject:{id:number,name:string};
  constructor(public viewCtrl: ViewController , public navParams: NavParams) {
    this.subject=this.navParams.get("subject");
    this.subs=[
      {tit:"会计从业资格考试",
      cot:[
        {str:"全国会计基础"},
        {str:"全国经济法规与会计职业道"},
        {str:"全国会计电算化"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"计算机应用基础",
      cot:[
        {str:"全国会计基础"},
        {str:"全国经济法规与会计职业道"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"},
        {str:"全国会计电算化"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      },
      {tit:"大学英语B",
      cot:[
        {str:"大学英语B"}
        ]
      }
    ];
    this.seg=0;
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  choose(tit:string){
    this.subject.id=0;
    this.subject.name=tit;
    this.dismiss();
  }
}
