import { IStorageEngine } from "./iStorageEngine";
import * as path from "path";
import * as os from "os";
import * as admin from "firebase-admin";
import { initializeIfNotAlreadyInitialized } from "../../utilities/firebaseUtil";
import * as fs from "fs-extra";
import * as util from "util";

export class FirebaseCloudStorageEngine implements IStorageEngine {
    public async init(): Promise<FirebaseCloudStorageEngine> {
        await initializeIfNotAlreadyInitialized();
        return this;
    }
    public async getFileAsString(storagePath: string): Promise<string> {
        const destination = path.join(os.tmpdir(), storagePath);
        const bucket = admin.storage().bucket();
        await bucket.file(storagePath).download({ destination });
        const readFileAsync = util.promisify(fs.readFile);
        return readFileAsync(destination).then(x => <string>x);
    }
}
