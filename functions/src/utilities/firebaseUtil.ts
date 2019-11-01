import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs-extra";
import { STR_CONSTANTS } from "./stringNamesReference";

const configFilePath = STR_CONSTANTS.FS_PATH.FB_PRIVATE_KEY_PATH;
const databaseURL = STR_CONSTANTS.URLS.FIRESTORE_URL;

export async function initializeIfNotAlreadyInitialized(): Promise<void> {
    if (!admin.apps.length) {
        if (process.env.NODE_ENV == "production") {
            admin.initializeApp(functions.config().firebase);
        } else {
            if (!fs.ensureFile(configFilePath)) {
                throw new Error(
                    "Firebase private key file not present. Cannot initialize"
                );
            }
            const config = await fs.readJson(configFilePath);
            admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: databaseURL
            });
        }
    }
    return;
}
