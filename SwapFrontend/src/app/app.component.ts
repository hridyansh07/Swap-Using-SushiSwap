import { Component,HostListener,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountModel } from './Models/accountModel';
import {ConnectionService } from "./Services/connection.service";

declare var window : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy  {
  name = "Swapping";
  title = 'Swap Tokens';
  walletDetect : boolean = false;
  subscription  : Subscription;
  account : AccountModel;
  // supplyChain = contract(supplyChainArtifact);
  
  constructor(private connectionService : ConnectionService , 
    private router : Router)
  {
    this.subscription = this.connectionService.AccountData.subscribe((data) => {
      this.account = data;
    })
  }
  

  role : string;
  newName : string;
  connectionSuccesful : boolean;
  balance : string;
  // constructor(private _ngZone : NgZone)
  // {}



  @HostListener("window:load")
  async getAccount()
  {
    this.connectionSuccesful = await this.connectionService.walletDetect();
    this.walletDetect = true;    
    this.change()
  }

  change()   
  {
    this.router.navigateByUrl("Dashboard");
  }



  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}

// onReady = () => {
  // Bootstrap the MetaCoin abstraction for Use.
  // this.supplyChain.setProvider(this.web3.currentProvider);

  // Get the initial account balance so it can be displayed.
  // this.web3.eth.getAccounts((err, accs) => {
  //   if (err != null) {
  //     alert('There was an error fetching your accounts.');
  //     return;
  //   }

  //   if (accs.length === 0) {
  //     alert(
  //       'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.' 
  //     );
  //     return;
  //   }
  //   console.log(accs);
  //   this.accounts = accs;
  //   this.account = this.accounts[0];

  //   // This is run from window:load and ZoneJS is not aware of it we
  //   // need to use _ngZone.run() so that the UI updates on promise resolution
  //   this._ngZone.run(() =>
  //     console.log("In ngZONE")
  //   );
  // });

