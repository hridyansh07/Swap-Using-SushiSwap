import { Component,  OnDestroy,  OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountModel } from "src/app/Models/accountModel";
import {ConnectionService, } from "../../Services/connection.service";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
    private account : AccountModel;
    private subscription : Subscription;
    address : string;
    constructor(private router : Router , private connectionService : ConnectionService){}

    ngOnInit()
    {
        this.subscription = this.connectionService.AccountData.subscribe((data)=>{
            this.account = data;
            this.updateHeader()
        })
        
    }

    updateHeader()
    {
        this.address = this.account.Address;
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

}