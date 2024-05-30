export enum ConfirmStatus {
    Confirm = "Confirm",
    Cancel = "Cancel"
}

export enum ApprovalAction {
    Approve = "Approve",
    Reject = "Reject"
}

export enum NotificationType {
    Info,
    Warning,
    Success,
    Failure
}

export enum ExportType {
    CSV,
    PDF,
    EXCEL
}

export enum SortOrder {
    Ascending = 'asc',
    Decending = 'desc'
}
export enum ProductFileAssets {
    PartNumber = "PartNumber",
    PartName = "PartName",
    Description = "Description",
    Manfactuer = "Manfactuer",
    Owner = "Owner",
    UnitPrice="UnitPrice"
}

export enum Priority {
    High = "High",
    Medium = "Medium",
    Low ="Low"
}

export enum Status {
    InPrograss
}

export enum RequestType {
    New = 'new',
    Transfer = 'transfer',
}

export enum Stage {
    Saved = 'saved',
    Requested = 'requested',
    Approved = 'approved',
    Rejected = 'rejected',
    Inbound = 'inbound',
    Outbound='outbound'
}

export enum Navigation {
    Requester='requester',
    Approver='approver',
    Inbound='inbound',
    Outbound='outbound'
}

export enum TrackingType {
    Inbound = "inbound",
    Outbound="outbound"
}

export enum PODashboardTabs {
    Unallocated = "unallocated",
    Allocated = "allocated"
}

export enum AssetRequestBulkUploadNotification {
    AssetNameEmpty = "Asset Name cannot be empty",
    PartNumberEmpty = "Part Number cannot be empty",
    SiteCodeEmpty = "Site Code cannot be empty",
    QuantityEmpty = "Quantity cannot be empty",
    RequestedDateEmpty = "Requested Date cannot be empty",
    DueDateEmpty = "Due Date cannot be empty",
    PriorityEmpty = "Priority cannot be empty",
    ApprovedByEmpty = "Approved By cannot be empty",
    ApprovedDateEmpty = "Approved Date cannot be empty",
    RequestTypeEmpty = "Request Type cannot be empty",
    POIdEmpty = "PO Id cannot be empty",

    DueDateMore = "The Requested Date should be less than Due Date",
    RequestDateLess = "The Requested Date should be less than Approved Date",
    ApprovedDateLess = "Approved Date should be greater than Requested Date",
    DueDateLess = "Due Date should be greater than Requested Date",

    InvalidDueDate = "InValid Due Date",
    InvalidRequestedDate = "InValid Requested Date",
    InvalidApprovedDate = "InvalidApprovedDate",

    InvalidPOId = "Invalid PO Id",
    InvalidCombination = "Invalid Asset Name and Part Number combination",
    InvalidSiteCode = "Invalid Site Code",

    Duplicate = "Duplicates are in highlighted rows",

    QuantityNumber = "Quantity should be a number",
    RequestedDateFormat = "Incorrect Requested Date format",
    DueDateInvalid = "Incorrect Due Date format",
    ApprovedDateInvalid = "Incorrect Approved Date format",
    TransferFromSiteCode = "If the Request Type is a transfer, Vendor shouldn't be empty",
    ValidFromSiteCode = "If the Request Type is a transfer, a valid 'From Site Code' is required",
    NewOrTransfer = "Request Type must be either New or Transfer",
    PriorityInvalid = "Priority must be either High, Medium or Low",
    ValidVendor ="If the Request Type is a transfer, a valid 'Vendor' is required",
    DueDateEmptyin = "Incorrect Due Date format",
    ZeroRecordsFound = "Please upload at least one record",
    InventoryLocationRequired = "Inventory Location is mandatory when the vendor is Palco",
    InvalidInventoryLocation ="Invalid Inventory Location"
}

export enum VendorOptions {
    Palco = "Palco",
    Myraid="Myriad"
}

export enum PalcoColumns {
    PartNumber = 'Part Number',
    PONumber = 'PO Number',
    CaseNumber = 'Case Number',
    IUPCode = 'IUP Code',
    ProjectDescription = 'Project Description',
    InventoryLocation = 'Inventory Location',
    Qty = 'Qty',
    Description = 'Description'
}

export enum MyriadColumns {
    Item = 'Item',
    DescriptionSales = 'Description (Sales)',
    Manufacturer = 'Manufacturer',
    CurrentAvailableStock = 'Current Available Stock',
    Total = 'Total',
    QuantityCommited = 'Quantity Committed'
}

export enum TrackingStaus {
    PreTransit = "Pre Transit",
    InTransit = "In Transit",
    OutForDelivery = "Out For Delivery",
    Delivered = "Delivered"
}

export enum PODashboardStaus {
    Shipped = 'Shipped',
    InWarehouse = 'In Warehouse',
    ShipTOSite = "Ship-to-Site",
    Delivered = "Delivered-to-Site",
    Ordered = "Ordered"
}

export enum PODashboardFilters{
    SiteCode="SiteCode",
    ProjectType="ProjectType",
    Vendor="Vendor",
    Manufacturer='Manufacturer',
    Status='Status',
    UnallocatedPOSitecode='UnallocatedPOSitecode',
    UnallocatedPOVendor='UnallocatedPOVendor'
}

export enum RequestStatus {
    Requested = 'Requested',
    Approved = 'Approved',
    Ordered = 'Ordered',
    Inbound = 'Inbound',
    Outbound='Outbound',
    Shipped = 'Shipped',
    InWarehouse = 'In warehouse',
    ShipToSite = 'Ship-to-site',
    DeliveredToSite = 'Delivered-to-site',
    Saved = 'Saved',
    Rejected = 'Rejected',
    Delivered='Delivered'
}

export enum StageClassName {
    Requested = 'requested-stage',
    Approved = 'approved-stage',
    Inbound = 'inbound-stage',
    Outbound = 'outbound-stage',
    Rejected = 'rejected-stage'
}


export enum AuditHistoryLabelNames{
}