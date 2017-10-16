import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  subscription: any;
  list: Array<any>;

  constructor(private deviceMotion: DeviceMotion, private toast: Toast) {
    this.list = [];
  }

  startCollecting() {
    this.toast.show(`Subscribing to Accelerator Watcher Plugin`, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 1000 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      var time = new Date(acceleration.timestamp);
      var timeStr = time.toISOString().substring(11,19);
      this.list.push({time: timeStr, x: acceleration.x, y: acceleration.y, z: acceleration.z })
    });
  }

  stopCollecting() {
    this.toast.show(`Unsubscribing from Accelerator Watch`, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
    this.subscription.unsubscribe();
  }

}
