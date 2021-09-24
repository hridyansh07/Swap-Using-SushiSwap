import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "src/app/Services/connection.service";

@Component({
    selector : 'app-dash',
    templateUrl : "./dashboard.component.html",
    styleUrls : ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
    selectedLevel : Object; 
    Swap : boolean = false;
    addLiquidity : boolean = false;
    mint : boolean = false;
    ApprovedDAI : boolean = false;
    ApprovedUSDT : boolean = false;
    Approved : boolean = false;
    data : Array<Object>  = [
        {id : 0 , name : "Swap Token 1" , disabled : true},
        {id: 1 , name : "Swap Token 2" , disabled : true},
        {id : 2 , name: "Add Liquidity" , disabled : true},
        {id : 3 , name: "Mint DAI" , disabled : true},
        {id : 4 , name: "Mint USDT" , disabled : true},
    ];
  
  
    ngOnInit()
    {}
    constructor(private connectionService : ConnectionService)
    {}

    async update()
    {
        if(await this.connectionService.checkAllowanceDAI() >  0)
        {
            this.ApprovedDAI = true;
        }
        if(await this.connectionService.checkAllowanceUSDT())
        {
            this.ApprovedUSDT = true;
        }
        if(this.ApprovedDAI && this.ApprovedUSDT)
        {
            this.Approved = true;
        }
    }

    selected()
    {
        this.addLiquidity = false;
        this.Swap = false;
        this.mint = false;
        for(let key in this.selectedLevel)
        {
            if(this.selectedLevel[key] == 0 || this.selectedLevel[key] == 1)
            {
                this.Swap = true;
                this.addLiquidity = false;
                this.mint = false;
                break;
            }
            if(this.selectedLevel[key] == 2)
            {
                this.Swap = false;
                this.addLiquidity = true;
                this.mint = false;
                break;
            }
            if(this.selectedLevel[key] == 3 || this.selectedLevel[key] == 4)
            {
                this.Swap = false;
                this.addLiquidity = false;
                this.mint = true;
                break;
            }
        }
    }

    onSubmit(form)
    {
        for(let key in this.selectedLevel)
        {
            if(this.selectedLevel[key] == 0)
            {
                console.log("Swaping Token1");
                console.log(form);
                this.connectionService.swapToken1ForToken2(form.amount);
            }
            if(this.selectedLevel[key] == 1)
            {
                console.log("Swapping Token2");
                console.log(form);
                this.connectionService.swapToken2ForToken1(form.amount);
            }
            if(this.selectedLevel[key] == 2)
            {
                console.log("Adding Liquidity");
                console.log(form);
                this.connectionService.addLiquidity(form.Token1 , form.Token2);
            }
            if(this.selectedLevel[key] == 3)
            {
                console.log("Minting Dai");
                this.connectionService.mintDai(form.mintAmount);
            }
            if(this.selectedLevel[key] == 4)
            {
                console.log("Minting Dai");
                this.connectionService.mintUSDT(form.mintAmount);
            }
        }
    }

}