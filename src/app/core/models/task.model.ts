export interface Task {
    id:number;
    docId?:string;
    name:string;
    durationInSecs:number;
    picture:string;
}

export interface FirebaseTask extends Task{
    docId:string;
}
