import { ProductAndFacilityDataSource } from "./productAndFacilitySpecDataSource";
import { UserDataSource } from "./userDataSource";
import { firestoreDbEngine } from "./backEndDataAccess/firestoreDbEngine";

export enum Database {
    FIRESTORE
}

export async function getDataSources(
    db: Database
): Promise<{
    productRecipeDataSource: ProductAndFacilityDataSource;
    userDataSource: UserDataSource;
}> {
    // perform db check if different dbs are implemented in the future
    const dbEngine = new firestoreDbEngine();
    return {
        productRecipeDataSource: new ProductAndFacilityDataSource(dbEngine),
        userDataSource: new UserDataSource(dbEngine)
    };
}
