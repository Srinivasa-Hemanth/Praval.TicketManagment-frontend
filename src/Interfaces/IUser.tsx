export interface Iuser{
    EmpId:string;
    Name:string;
    Email:string;
    Password:string;
    Assets:IAsset[];
    Role:string;
    Department:string;
    ReportingManager?:string;
    MangerEmail?:string;
}

interface IAsset{
    SerialNumber:string;
    Name:string;
}