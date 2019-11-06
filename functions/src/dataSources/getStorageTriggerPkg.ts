import { DataProcessor } from "../services/dataProcessor/dataProcessor";
import { Database } from "./getFunctionsPkg";
import { FirestoreDbEngine } from "./backEndDataAccess/firestoreDbEngine";
import { FirebaseCloudStorageEngine } from "./backEndDataAccess/firebaseCloudStorageEngine";

export async function getStorageTriggerPkg(
    provider: StorageProvider = StorageProvider.FIREBASE_CLOUD_STORAGE,
    db: Database = Database.FIRESTORE
): Promise<StorageTriggerPkg> {
    const dbEngine = await (async x => {
        switch (x) {
            case Database.FIRESTORE:
                return new FirestoreDbEngine().init();
            default:
                throw new Error(`Requested DB engine not found: ${x}`);
        }
    })(db);

    const storageEngine = await (async x => {
        switch (x) {
            case StorageProvider.FIREBASE_CLOUD_STORAGE:
                return new FirebaseCloudStorageEngine().init();
            default:
                throw new Error(`Requested storage engine not found: ${x}`);
        }
    })(provider);

    return { dataProcessor: new DataProcessor(dbEngine, storageEngine) };
}

interface StorageTriggerPkg {
    dataProcessor: DataProcessor;
}

enum StorageProvider {
    FIREBASE_CLOUD_STORAGE
}
