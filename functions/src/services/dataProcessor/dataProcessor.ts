import { IDatabaseEngine } from "../../dataSources/backEndDataAccess/iDataBaseEngine";
import * as path from "path";
import * as os from "os";
import { initializeIfNotAlreadyInitialized } from "../../utilities/firebaseUtil";
import * as admin from "firebase-admin";

export class DataProcessor {
    constructor(private dbEngine: IDatabaseEngine) {}

    private async processAndUploadCsv<T>(dbPath: string, csvFilePath: string) {
        const destination = path.join(os.tmpdir(), csvFilePath);
        await initializeIfNotAlreadyInitialized();
        const bucket = admin.storage().bucket();
        await bucket.file(csvFilePath).download({ destination });
        // const csvFile: T[] = await csv;
    }
}
