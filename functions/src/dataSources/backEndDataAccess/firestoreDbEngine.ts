import { IDatabaseEngine } from "./iDataBaseEngine";
import { initializeIfNotAlreadyInitialized } from "../../utilities/firebaseUtil";
import * as admin from "firebase-admin";

export class firestoreDbEngine implements IDatabaseEngine {
    private db: FirebaseFirestore.Firestore;

    constructor() {
        initializeIfNotAlreadyInitialized();
        this.db = admin.firestore();
    }
}
