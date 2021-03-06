import { IDatabaseEngine, DatabaseWriteResponse } from "./iDataBaseEngine";
import { initializeIfNotAlreadyInitialized } from "../../utilities/firebaseUtil";
import * as admin from "firebase-admin";

export class FirestoreDbEngine implements IDatabaseEngine {
    private db: FirebaseFirestore.Firestore;

    async init(): Promise<FirestoreDbEngine> {
        await initializeIfNotAlreadyInitialized();
        this.db = admin.firestore();
        return this;
    }

    async getByPath<T>(path: string, suppressLog: boolean = false): Promise<T> {
        const docRef = this.db.doc(path);
        return docRef
            .get()
            .then(getDoc => {
                if (!getDoc.exists) {
                    if (!suppressLog) {
                        console.log(
                            `no entry exists at the required path: "${path}"`
                        );
                    }
                    return null;
                } else {
                    return <T>getDoc.data();
                }
            })
            .catch(e => {
                console.error(`Error getting document at path: "${path}"`, e);
                return null;
            });
    }

    addByPath<T>(path: string, data: T): Promise<DatabaseWriteResponse> {
        const docRef = this.db.doc(path);
        return docRef
            .set(data, { merge: true })
            .then(updateDoc => {
                return <DatabaseWriteResponse>{
                    timeStamp: updateDoc.writeTime.seconds
                };
            })
            .catch(e => {
                console.error(`Error updating document at path: "${path}"`, e);
                return <DatabaseWriteResponse>{ timeStamp: null };
            });
    }

    overWriteByPath<T>(path: string, data: T): Promise<DatabaseWriteResponse> {
        const docRef = this.db.doc(path);
        return docRef
            .set(data)
            .then(updateDoc => {
                return <DatabaseWriteResponse>{
                    timeStamp: updateDoc.writeTime.seconds
                };
            })
            .catch(e => {
                console.error(
                    `Error overwriting document at path: "${path}"`,
                    e
                );
                return <DatabaseWriteResponse>{ timeStamp: null };
            });
    }
}
