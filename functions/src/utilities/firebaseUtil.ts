import * as admin from "firebase-admin";

export function initializeIfNotAlreadyInitialized(): void {
    if (!admin.apps.length) {
        admin.initializeApp({});
    }
    return;
}
