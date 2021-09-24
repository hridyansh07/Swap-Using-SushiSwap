import {environment} from "../../environments/environment";

export class AccountModel{
    constructor(private accountAddress ,private accountBalance,private role = environment.listedAddress[accountAddress] ){}

    get Address()
    {
        return this.accountAddress;
    }

    get Balance()
    {
        return this.accountBalance;
    }

    get Role()
    {
        return this.role
    }
}