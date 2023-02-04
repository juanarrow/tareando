
export interface Assignment{
    id:number;
    docId?:string;
    personId:string;
    taskId:string;
    createdAt:string; // ISO 8601 YYYY-MM-DDTHH:mm:ss+HH:MM
    dateTime:string; // ISO 8601 YYYY-MM-DDTHH:mm:ss+HH:MM
}