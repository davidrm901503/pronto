import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Cotizacion } from '../../../models/cotizaciones';
import { ApiProvider } from '../../../providers/api/api';
import { HttpErrorResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-cotizacion',
  templateUrl: 'cotizacion.html',
})
export class CotizacionPage {
  cotizaciones:Cotizacion[]=[];
  constructor(public events: Events,public navCtrl: NavController, public navParams: NavParams,public api: ApiProvider) {
    this.api.cotizaciones_por_solicitud(this.navParams.get("solicitud")).then(
      data => {
        if (data['status']==200) {
          this.cotizaciones=data["lista_cotizaciones"];
        }else
        {
           console.log("devolcvio error");
        }
      },
      (err: HttpErrorResponse) => {
      console.log("error relacionado con el servidor",err);
      });
  }
  aceptarCot(id){
     this.cotizaciones = this.cotizaciones.filter((element)=> {  return element.cotizacion_id !== id});
     this.events.publish('accept:cotizacion', this.navParams.get("solicitud"));
     this.navCtrl.pop();
  }

}
