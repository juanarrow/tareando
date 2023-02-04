export interface UserLogin{
    identifier:string,
    password:string
}

export interface UserRegister{
    email:string,
    password:string,
    username:string,
    first_name:string,
    last_name:string
}

export interface User{
    uid:string;
    username:string;
    email:string;
    provider:string;
    token:string,
    first_name:string,
    last_name:string
}