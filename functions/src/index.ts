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
        const tempFilePath = path.join(os.tmpdir(), RECIPE_FILE_NAME);
        if (obj.name != RECIPE_FILE_NAME) {
            return;
        }
        await initializeIfNotAlreadyInitialized();
        const dbEngine = await new FirestoreDbEngine().init();
        const recipeSource = new ProductAndFacilityDataSource(dbEngine);
        const bucket = admin.storage().bucket();
        await bucket
            .file(RECIPE_FILE_NAME)
            .download({ destination: tempFilePath });
        const file: CsvFileFormat[] = await csv().fromFile(tempFilePath);
        const recipes = file
            .filter(row => row.ProductionTime)
            .map(row => {
                const productSpec: ProductSpec = {
                    baseProduct: row.BaseProduct == "TRUE",
                    facility: row.ProductionFacility,
                    name: row.Product,
                    productionCount: parseInt(row.ProductionQuantity),
                    productionTime: parseFloat(row.ProductionTime)
                };
                if (!productSpec.baseProduct) {
                    productSpec.ingredients = [];
                    for (let i = 1; i <= 5; i++) {
                        const ingrd = `R${i}`;
                        const ingrdCount = `R${i}C`;
                        if (row[ingrd] && row[ingrdCount]) {
                            productSpec.ingredients.push({
                                product: row[ingrd],
                                count: row[ingrdCount]
                            });
                        }
                    }
                }
                return productSpec;
            });
        await recipeSource.setProductRecipe(recipes);
        return;
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
