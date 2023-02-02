import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FirebaseDocument, FirebaseService, FIRESTORAGE_PREFIX_PATH, FirestoreImages, FIRESTORE_IMAGES_COLLECTION } from "../firebase-service";
import { initializeApp,  deleteApp, getApp } from "firebase/app";
import { setUserId, setUserProperties } from "firebase/analytics";
import { getFirestore, addDoc, collection, updateDoc, doc, onSnapshot, getDoc, setDoc, query, where, getDocs, Unsubscribe} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth, deleteUser, signInAnonymously, signOut, signInWithEmailAndPassword, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { HttpClientProvider } from "src/app/core";



@Injectable({providedIn: 'root'})
export class FirebaseWebService extends FirebaseService implements OnDestroy{
  constructor() {
    super();
    this.init();
    
  }
  async init(){
    const firebaseConfig = {
      apiKey: "AIzaSyB24hwqAcC4O3vJOW1LpulCOMOKLxpUM2I",
      authDomain: "tareando-d2e34.firebaseapp.com",
      projectId: "tareando-d2e34",
      storageBucket: "tareando-d2e34.appspot.com",
      messagingSenderId: "814431877695",
      appId: "1:814431877695:web:e55309685f5827d3b0968a",
      measurementId: "G-BPNBWB3QXT"
    };
    
      // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.webStorage = getStorage(this.app);
    this.auth = initializeAuth(getApp(), { persistence: indexedDBLocalPersistence });      
    //this.auth = getAuth(this.app);
    this.active = true;
    this.auth.onAuthStateChanged(async user=>{
      this.user = user;
      if(user){
        this._isLogged.next(true);
        this.setUserAndEmail(user.uid, user.email);
      }
      else{
        this._isLogged.next(false);
      }
      console.log(user);
    });
  }

  public imageUpload(blob: Blob): Promise<any> {
    return new Promise(async (resolve, reject) => {
      var freeConnection = false;
      if(this.auth.currentUser==null){
        try {

          await signInAnonymously(this.auth);
          freeConnection = true;
        } catch (error) {
          reject(error);
        }
      }
      const path = FIRESTORAGE_PREFIX_PATH+"/"+Date.now() + '.jpg';
      const storageRef = ref(this.webStorage, path);
      const metadata = {
        contentType: 'image/jpeg',
      };
      uploadBytes(storageRef, blob).then(async (snapshot) => {
        getDownloadURL(storageRef).then(async downloadURL => {
          if(freeConnection)
              await signOut(this.auth);
          resolve({
            path,
            image: downloadURL,
          });
        }).catch(async error=>{
          if(freeConnection)
              await signOut(this.auth);
          reject(error);
        });
      }).catch(async (error) => {
        if(freeConnection)
              await signOut(this.auth);
        reject(error);
      });
    });
  }

  ngOnDestroy(): void {
    deleteApp(this.app).then(value=>{
      this.analytics = null;
      this.active = false;
    }).catch(reason=>{
      console.log("Error disconnecting Firebase app: ", reason);
    });
  }

  async setUserAndEmail(uid:string, email:string){
    if(this.analytics){
      await setUserId(this.analytics, uid);
      await setUserProperties(this.analytics, {email:email || 'anonymous'});
    }
  }

  public createDocument(collectionName:string, data:any):Promise<string>{
    return new Promise((resolve,reject)=>{
      const collectionRef = collection(this.db, collectionName);
      addDoc(collectionRef, data).then(docRef => resolve(docRef.id)
      ).catch(err =>  reject(err));
    });
  }

  public updateDocument(collectionName:string, document:string, data:any):Promise<void>{
    return new Promise(async (resolve,reject)=>{
      const collectionRef = collection(this.db, collectionName);
      setDoc(doc(collectionRef,document),data).then(docRef => resolve()
      ).catch(err =>  reject(err));
    });
  }

  public getDocuments(collectionName:string):Promise<FirebaseDocument[]>{
    return new Promise(async (resolve, reject)=>{
      const querySnapshot = await getDocs(collection(this.db, collectionName));
      resolve(querySnapshot.docs.map<FirebaseDocument>(doc=>{
        return {id:doc.id, data:doc.data()}}));
    });
  }

  public getDocument(collectionName:string, document:string):Promise<FirebaseDocument>{
    return new Promise(async (resolve, reject)=>{
      const docRef = doc(this.db, collectionName, document);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        resolve({id:docSnap.id, data:docSnap.data()});
      } else {
        // doc.data() will be undefined in this case
        reject('document does not exists');
      }
    });
  }

  public getDocumentBy(collectionName:string, field:string, value:any):Promise<FirebaseDocument[]>{
    return new Promise(async (resolve, reject)=>{
      const q = query(collection(this.db, collectionName), where(field, "==", value));

      const querySnapshot = await getDocs(q);
      resolve(querySnapshot.docs.map<FirebaseDocument>(doc=>{
        return {id:doc.id, data:doc.data()}}));
    });
  }

  public subscribeToCollection(collectionName, subject: BehaviorSubject<FirebaseDocument[]>):Unsubscribe{
    return onSnapshot(collection(this.db, collectionName), (snapshot) => {
      subject.next(snapshot.docs.map<FirebaseDocument>(doc=>{
        return {id:doc.id, data:doc.data()}}));
      }, error=>{});
  }
  
  public async signOut(signInAnon:boolean=false) {
    try {
      await this.auth.signOut();
      if(signInAnon)
        await this.connectAnonymously();
    } catch (error) {
      console.log(error);
    }
  }

  public isUserConnected():Promise<boolean>{
    const response = new Promise<boolean>(async (resolve, reject)=>{
      resolve(this.auth.currentUser != null)
    });
    return response;
  }

  public isUserConnectedAnonymously():Promise<boolean>{
    const response = new Promise<boolean>(async (resolve, reject)=>{
      resolve(this.auth.currentUser != null && this.auth.currentUser.isAnonymous);
    });
    return response;
    
  }

  public async connectAnonymously():Promise<void>{
    const response = new Promise<void>(async (resolve, reject) => {
      if(! (await this.isUserConnected()) && !(await this.isUserConnectedAnonymously())){
        await signInAnonymously(this.auth).catch(error=>reject(error));
        resolve();
      }
      else if(await this.isUserConnectedAnonymously())
        resolve();
      else
        reject("An user is already connected");

    });
    return response;
  }

  public async createUserWithEmailAndPassword(email:string, password:string){
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.log(`Email address ${email} already in use.`);
          break;
        case 'auth/invalid-email':
          console.log(`Email address ${email} is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          console.log(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  }
  
  public async connectUserWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      
    }    
  }

  public deleteUser():Promise<void>{
    return deleteUser(this.user);
  }
}
