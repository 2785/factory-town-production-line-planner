import { generateApolloServer } from "./apollo/server";
import * as functions from "firebase-functions";
import { Request, Response } from "express";
import { STR_CONSTANTS } from "./utilities/stringNamesReference";
import { getStorageTriggerPkg } from "./dataSources/getStorageTriggerPkg";

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
        if (!Object.values(STR_CONSTANTS.STORAGE_PATH).includes(fileName)) {
            return;
        } else {
            const pkg = await getStorageTriggerPkg();
            switch (fileName) {
                case STR_CONSTANTS.STORAGE_PATH.FACILITY:
                    return pkg.dataProcessor.upsertFacilitySpecs(fileName);
                case STR_CONSTANTS.STORAGE_PATH.RECIPE:
                    return pkg.dataProcessor.upsertProductRecipes(fileName);
                default:
                    console.error(
                        "I do not know how the logic managed to get here but nothing got uploaded"
                    );
                    return;
            }
        }
    });
