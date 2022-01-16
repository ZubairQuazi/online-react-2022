import { Person } from './person.js';

export class Hero extends Person {
    firstname = 'default first name';
    lastname = 'default last name';
    _secret = "my secret mission";
    static version = 1001;

    constructor(fname, lname, hage){
        super(hage);
        this.firstname = fname ;
        this.lastname = lname ;
    }
    
    fullname(){
        return this.firstname+" "+this.lastname;
    }

    get secret(){
        return this._secret;
    }

    set secret(nmission){
        this._secret = nmission;
    }

}