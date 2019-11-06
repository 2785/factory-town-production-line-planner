import { IDatabaseEngine } from "../../dataSources/backEndDataAccess/iDataBaseEngine";
import * as path from "path";
import * as os from "os";
import { initializeIfNotAlreadyInitialized } from "../../utilities/firebaseUtil";
import * as admin from "firebase-admin";
import * as csv from "csvtojson";
import {
    Product,
    Facility,
    ProductSpec,
    FacilitySpec
} from "../../apollo/generated/types";
import { STR_CONSTANTS } from "../../utilities/stringNamesReference";

export class DataProcessor {
    constructor(private dbEngine: IDatabaseEngine) {}

    public upsertProductRecipes(bucketPath: string): Promise<void> {
        return this.insertData(this.processProductRecipe, bucketPath);
    }

    public upsertFacilitySpecs(bucketPath: string) {
        return this.insertData(this.processFacilitySpec, bucketPath);
    }

    public async insertData<T, U>(
        fn: (data: T[]) => U[],
        bucketPath: string
    ): Promise<void> {
        const tmpFilePath = path.join(os.tmpdir(), bucketPath);
        const bucket = admin.storage().bucket();
        await bucket.file(bucketPath).download({ destination: tmpFilePath });
        const prodRecipe = fn(await this.readCsvFile(tmpFilePath));
        await this.dbEngine.overWriteByPath(
            STR_CONSTANTS.DB_PATH.PRODUCT_RECIPE_PATH,
            prodRecipe
        );
        return;
    }

    private async readCsvFile<T>(csvFilePath: string): Promise<T[]> {
        const destination = path.join(os.tmpdir(), csvFilePath);
        await initializeIfNotAlreadyInitialized();
        const bucket = admin.storage().bucket();
        await bucket.file(csvFilePath).download({ destination });
        const csvFile: T[] = await csv().fromFile(csvFilePath);
        return csvFile;
    }

    private processProductRecipe(
        recipes: ProductRecipeCsvFormat[]
    ): ProductSpec[] {
        return recipes.map(row => {
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
                            count: parseInt(row[ingrdCount])
                        });
                    }
                }
            }
            return productSpec;
        });
    }

    private processFacilitySpec(
        facilities: FacilitySpecCsvFormat[]
    ): FacilitySpec[] {
        return facilities.map(
            f =>
                <FacilitySpec>{
                    name: f.Facility,
                    workerCap: parseInt(f.WorkerCap)
                }
        );
    }
}

interface ProductRecipeCsvFormat {
    Product: Product;
    ProductionTime: string;
    BaseProduct: string;
    ProductionFacility: Facility;
    ProductionQuantity: string;
    R1: Product;
    R1C: string;
    R2: Product;
    R2C: string;
    R3: Product;
    R3C: string;
    R4: Product;
    R4C: string;
    R5: Product;
    R5C: string;
}

interface FacilitySpecCsvFormat {
    Facility: Facility;
    WorkerCap: string;
}
