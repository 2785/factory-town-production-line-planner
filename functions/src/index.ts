import { generateApolloServer } from "./apollo/server";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { getDataSources, Database } from "./dataSources/getDataSources";
import { initializeIfNotAlreadyInitialized } from "./utilities/firebaseUtil";
import * as csv from "csvtojson";
import { Product, Facility, ProductSpec } from "./apollo/generated/types";
import * as path from "path";
import * as os from "os";
import { FirestoreDbEngine } from "./dataSources/backEndDataAccess/firestoreDbEngine";
import { ProductAndFacilityDataSource } from "./dataSources/productAndFacilitySpecDataSource";
import { STR_CONSTANTS } from "./utilities/stringNamesReference";
import { DataProcessor } from "./services/dataProcessor/dataProcessor";

const server = generateApolloServer();
// server.listen().then(({ url }) => {
//     console.log(`ready at ${url}`);
// });

const RECIPE_FILE_NAME = "productRecipe.csv";

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

interface CsvFileFormat {
    Product: Product;
    ProductionTime: string;
    BaseProduct: string;
    ProductionFacility: Facility;
    ProductionQuantity: string;
    R1: Product;
    R1C: number;
    R2: Product;
    R2C: number;
    R3: Product;
    R3C: number;
    R4: Product;
    R4C: number;
    R5: Product;
    R5C: number;
}
