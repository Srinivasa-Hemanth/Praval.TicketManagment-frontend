export interface ITicket{
    TicketId:string;
    Title:string;
    Description:string;
    Status:string;
    Priority:string;
    CreatedBy:string;
    CreatedOn:Date;
    ModifiedBy:string;
    MOdifiedOn:Date;
    ReporingManger:string;
    AssignedTo?:string;
    IsTicketClosed?:boolean;
}