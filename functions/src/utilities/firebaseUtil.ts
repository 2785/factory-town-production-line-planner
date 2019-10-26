import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export function initializeIfNotAlreadyInitialized(): void {
    if (!admin.apps.length) {
        admin.initializeApp(functions.config().firebase);
    }
    return;
}
