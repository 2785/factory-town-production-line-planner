import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs-extra";

const configFilePath = "fbCred.json";
const databaseURL = "https://factory-town-prod-line-planner.firebaseio.com";

export async function initializeIfNotAlreadyInitialized(): Promise<void> {
    if (!admin.apps.length) {
        if (process.env.NODE_ENV == "production") {
            admin.initializeApp(functions.config().firebase);
        } else {
            const config = await fs.readJson(`src/utilities/${configFilePath}`);
            admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: databaseURL
            });
        }
    }
    return;
}
