import { ProductRecipeDataSource } from "./productRecipeDataSource";
import { UserDataSource } from "./userDataSource";
import { firestoreDbEngine } from "./backEndDataAccess/firestoreDbEngine";

export enum Database {
    FIRESTORE
}

export async function getDataSources(
    db: Database
): Promise<{
    productRecipeDataSource: ProductRecipeDataSource;
    userDataSource: UserDataSource;
}> {
    // perform db check if different dbs are implemented in the future
    const dbEngine = new firestoreDbEngine();
    return {
        productRecipeDataSource: new ProductRecipeDataSource(dbEngine),
        userDataSource: new UserDataSource(dbEngine)
    };
}
