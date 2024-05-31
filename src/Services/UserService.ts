import { Iuser } from "../Interfaces/IUser";

export function CreateNewUser(User:Iuser){
    var users:Iuser[]=JSON.parse(localStorage.getItem('Tickets')as string);
    users.push(User);
    localStorage.setItem('Tickets',JSON.stringify(users));
}

export function GetAllUser(){
    var users:Iuser[]=JSON.parse(localStorage.getItem('Users') as string);
    return users;
}

export function GetUserById(EmpId:string){
    var users:Iuser[]=JSON.parse(localStorage.getItem('Users') as string);
    return users.filter((user)=>user.EmpId==EmpId);
}