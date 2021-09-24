import {Injectable} from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {environment} from "../../environments/environment";
import Web3 from "web3";
import {AccountModel} from "../Models/accountModel";
import exchangeArtifact from "../../assets/Build/contracts/Exchange.json";
import testnetDaiArtifact from "../../assets/Build/contracts/TestnetDai.json";
import testnetUSDTArtifact from "../../assets/Build/contracts/TestnetUSDT.json";

declare var window : any; 

@Injectable({providedIn : "root"})
export class ConnectionService {
    account : any;
    accounts : any;
    web3 : any;
    status : string;
    enable : any;
    error : string;
    balance : any;
    networkId : any;
    AccountData : BehaviorSubject<AccountModel> = new BehaviorSubject(new AccountModel(0,0)); 
    exchangeContract : any;
    daiContract : any;
    usdtContract : any;
    deployedNetwork :any ;
    allEvents : Array<any> = []
    sampleNumber = 1000000000000000000;
    exchangeAddress = "0x0438f7915D757520cAc2988354412BF98E14E0EA";
    testnetDAIAddress = "0xB1c2Ab08a51E28581CfBC6718875DbEb9124fea1";
    testnetUSDTAddress = "0x325eeA1439b99ED9687706aB894486e305fDE35C";

    async walletDetect() {
        try     
        {
            this.attempConnection();
        }
        finally{
        let networkType = 'Binance Testnet';
        this.networkId = await this.getAccountId();
        console.log(this.networkId);
        if (this.networkId != 97 ) throw Error('Login using Binance TestNet');
        this.accounts = await this.getAccounts()
        this.account = this.accounts[0];
        await this.getBalance();
        console.log(this.account);
        this.updateData(this.account , this.balance);
        await this.loadContract();
        console.log(this.exchangeContract);
        if(this.account)
        {
            this.getBalanceUSDT();
            return true;
        }
        else{
            return false;
        }
    }   
    }
    async getAccounts()
    {
        const accounts = await this.web3.eth.getAccounts();
        console.log(accounts);
        return accounts;
    }

    async loadContract()
    {
        this.exchangeContract =  await new this.web3.eth.Contract(exchangeArtifact.abi ,this.exchangeAddress);
        this.daiContract = await new this.web3.eth.Contract(testnetDaiArtifact.abi , this.testnetDAIAddress);
        this.usdtContract = await new this.web3.eth.Contract(testnetUSDTArtifact.abi , this.testnetUSDTAddress);
        console.log(this.exchangeContract);
        console.log(this.daiContract);
        console.log(this.usdtContract);
    }

    updateData(address , balance){
        this.AccountData.next(new AccountModel(address,balance));
    }



    async enableMetaMask() : Promise<any>{
        let enable = false;
        await new Promise((resolve , reject) => {
            enable = window.ethereum.enable();
        })
    }

    attempConnection()  
    {
        this.web3 = new Web3(window.ethereum);
        this.enable = this.enableMetaMask();
        console.log(this.web3);
        console.log(this.enable);   
    
    }

    async getAccountId()
    {
        return (await this.web3.eth.net.getId());
    }


    async getBalance()
    {
        let balance; 
        console.log(this.accounts[0]);
        await this.web3.eth.getBalance(this.accounts[0]).then((bal : any) => {
            console.log(bal);
            balance = this.web3.utils.fromWei(bal, 'ether');    
        })
        return balance;
    }

    async getBalanceUSDT()
    {   
        let Balance : any;
        try
        {
        Balance = await this.usdtContract.methods.balanceOf(this.account).call();
        }
        catch(err){
            console.log(err);
        }
    }

    async getBalanceDAI()
    {
    let Balance : any;
    try
    {
        Balance =  this.daiContract.methods.balanceOf(this.account).call();
    }
    catch(err)
    {
        console.log(err);
    }

    }

    async approveExchangeForDai(amount : string)
    {   
        try
        {
            await this.daiContract.methods.approve(this.exchangeAddress , amount).send({from : this.account});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async approveExchangeForUSDT(amount : string)
    {
        try
        {
            await this.usdtContract.methods.approve(this.exchangeAddress , amount).send({from : this.account});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async checkAllowanceDAI()
    {
        let allowance : any;
        try{
          allowance =   this.daiContract.methods.allowance(this.account , this.exchangeAddress).call({from : this.account});
          return allowance;
        }
        catch(erro)
        {
            console.log(erro);
        }
    }

    async checkAllowanceUSDT()
    {
        let allowance : any;
        try {
            allowance = await this.usdtContract.methods.allowance(this.account , this.exchangeAddress).call({from : this.account});
            return allowance;
        }
        catch(error){
            console.log(error);
        }
    }

    async swapToken1ForToken2(Token1 : string)
    {
        try
        {
            await this.exchangeContract.methods.SwapToken1(Token1).send({from : this.account});
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async swapToken2ForToken1(Token2 : string)
    {
        try
        {
            await this.exchangeContract.methods.SwapToken2(Token2).send({from : this.account});
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    async addLiquidity(Token1 :string , Token2 : string)
    {
        try
        {
            await this.exchangeContract.methods.addLiquidity(Token1 , Token2).send({from : this.account});
        }
        catch(eror)
        {
            console.log(eror);
        }
    }

    async mintUSDT(amount : string)
    {
        try{
            await this.usdtContract.methods.mint(this.account , amount).send({from : this.account});
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async mintDai(amount : string)
    {
        try{
            await this.daiContract.methods.mint(this.account , amount).send({from : this.account});
        }
        catch(error){
            console.log(error);
        }
    }
}