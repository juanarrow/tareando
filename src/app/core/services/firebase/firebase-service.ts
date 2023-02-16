import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { GoogleAuthProvider, FacebookAuthProvider, Unsubscribe, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp,  deleteApp } from "firebase/app";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { getFirestore, addDoc, collection, updateDoc, doc, onSnapshot, getDoc, DocumentData} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Auth, getAuth, OAuthCredential, createUserWithEmailAndPassword, signInWithCredential, signInAnonymously, SignInMethod, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { HttpClientProvider } from "src/app/core";

export interface FileUploaded{
  path:string,
  file:string
};

export interface FirebaseDocument{
  id:string;
  data:DocumentData;
}

export interface FirestoreImages{

}
export const FIRESTORE_TASKS_COLLECTION = 'tareando-tasks';
export const FIRESTORE_PEOPLE_COLLECTION = 'tareando-people';
export const FIRESTORE_ASSIGNMENTS_COLLECTION = 'tareando-assignments';
export const FIRESTORE_IMAGES_COLLECTION = 'tareando-images';
export const FIRESTORAGE_PREFIX_PATH = 'tareando-images';


@Injectable({providedIn: 'root'})
export abstract class FirebaseService{

  protected active=false;
  protected app;
  protected db;
  protected webStorage;
  protected auth:Auth;
  protected analytics = null;
  protected user:User;
  protected _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();

  public abstract init();
  public abstract fileUpload(blob: Blob, mimeType:string, prefix:string, extension:string): Promise<FileUploaded>;
  public abstract imageUpload(blob: Blob): Promise<FileUploaded>;
  public abstract createDocument(collectionName:string, data:any):Promise<string>;
  public abstract createDocumentWithId(collectionName:string, data:any, docId:string):Promise<void>;
  public abstract updateDocument(collectionName:string, document:string, data:any):Promise<void>;
  public abstract getDocuments(collectionName:string):Promise<FirebaseDocument[]>;
  public abstract getDocument(collectionName:string, document:string):Promise<FirebaseDocument>;
  public abstract getDocumentsBy(collectionName:string, field:string, value:any):Promise<FirebaseDocument[]>;
  public abstract deleteDocument(collectionName:string, docId:string):Promise<void>;
  public abstract subscribeToCollection(collectionName, subject: BehaviorSubject<any[]>, mapFunction:(el:DocumentData)=>any):Unsubscribe
  public abstract setUserAndEmail(uid:string, email:string);
  public abstract createUserWithEmailAndPassword(email:string, password:string):Promise<UserCredential>;
  public abstract connectUserWithEmailAndPassword(email:string, password:string):Promise<UserCredential>;
  public abstract signOut();
  public abstract signOut(signInAnon:boolean);
  public abstract isUserConnected():Promise<boolean>;
  public abstract isUserConnectedAnonymously():Promise<boolean>;
  public abstract connectAnonymously():Promise<void>;
  public abstract deleteUser():Promise<void>;

  public getUser():User{
    return this.user;
  }

}
