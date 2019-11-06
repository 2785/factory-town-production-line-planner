import { generateApolloServer } from "./apollo/server";
import * as functions from "firebase-functions";
import { Request, Response } from "express";
import { initializeIfNotAlreadyInitialized } from "./utilities/firebaseUtil";
import { FirestoreDbEngine } from "./dataSources/backEndDataAccess/firestoreDbEngine";
import { STR_CONSTANTS } from "./utilities/stringNamesReference";
import { DataProcessor } from "./services/dataProcessor/dataProcessor";

export const apolloServer = functions.https.onRequest(
    async (req: Request, res: Response) => {
        const app = await generateApolloServer();
        return app(req, res);
    }
);

export const processRecipe = functions.storage
    .bucket()
    .object()
    .onFinalize(async obj => {
        const fileName = obj.name;
        if (
            fileName != STR_CONSTANTS.STORAGE_PATH.FACILITY &&
            fileName != STR_CONSTANTS.STORAGE_PATH.RECIPE
        ) {
            return;
        } else {
            await initializeIfNotAlreadyInitialized();
            const dbEngine = await new FirestoreDbEngine().init();

            const dataProcessor = new DataProcessor(dbEngine);

            switch (fileName) {
                case STR_CONSTANTS.STORAGE_PATH.FACILITY:
                    return dataProcessor.upsertFacilitySpecs(fileName);
                case STR_CONSTANTS.STORAGE_PATH.RECIPE:
                    return dataProcessor.upsertProductRecipes(fileName);
                default:
                    console.error(
                        "I do not know how the logic managed to get here but nothing got uploaded"
                    );
            }
        }
    });
