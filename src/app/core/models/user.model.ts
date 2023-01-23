export interface UserLogin{
    identifier:string,
    password:string
}

export interface UserRegister{
    email:string,
    password:string,
    username:string
}

export interface User{
    id: number;
    username:string;
    email:string;
    provider:string;
    token:string,
    first_name:string,
    last_name:string
}