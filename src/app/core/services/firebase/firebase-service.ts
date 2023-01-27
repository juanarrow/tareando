import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { GoogleAuthProvider, FacebookAuthProvider, Unsubscribe, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp,  deleteApp } from "firebase/app";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { getFirestore, addDoc, collection, updateDoc, doc, onSnapshot, getDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Auth, getAuth, OAuthCredential, createUserWithEmailAndPassword, signInWithCredential, signInAnonymously, SignInMethod, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { HttpClientProvider } from "src/app/core";



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
  protected isGoogleLogin;
  protected isFacebookLogin;
  protected googleProvider = new GoogleAuthProvider();
  protected facebookProvider = new FacebookAuthProvider();
  protected unsub;
  protected user;

  public abstract init();
  public abstract imageUpload(blob: Blob): Promise<any>;
  public abstract createImagesDocument(data: FirestoreImages): Promise<any>;
  public abstract updateImages(documentId: string, images: FirestoreImages): Promise<string | boolean>;
  public abstract updateMaxImages(documentId: string, max: FirestoreImages): Promise<string | boolean>;
  public abstract subscribeImagesDocument(documentId: string, subject: BehaviorSubject<any>);
  public abstract removeFirestoreListener(listener: any): Promise<any>;
  public abstract getImagesDocument(documentId: string): Promise<string | FirestoreImages>;
  
  public abstract setUserAndEmail(uid:string, email:string);
  public abstract createUserWithEmailAndPassword(email:string, password:string);
  public abstract signOut();
  public abstract signOut(signInAnon:boolean);
  public abstract isUserConnected():Promise<boolean>;
  public abstract isUserConnectedAnonymously():Promise<boolean>;
  public abstract connectAnonymously():Promise<void>;
  public abstract deleteUser():Promise<void>;

}
