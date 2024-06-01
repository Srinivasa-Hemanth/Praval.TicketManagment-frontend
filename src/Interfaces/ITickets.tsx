export interface ITicket {
    TicketId?: string;
    Title?: string;
    Asset : string;
    EmpId:string;
    EmpName:string
    RequestType: string;
    Description: string;
    Status: string;
    Priority: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string; 
    ModifiedOn: string;
    ReporingManger: string;
    AssignedTo?: string;
    IsTicketClosed?: boolean;
    Subject : string
    comments?:string;
}
