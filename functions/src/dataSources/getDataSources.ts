import { ProductAndFacilityDataSource } from "./productAndFacilitySpecDataSource";
import { UserDataSource } from "./userDataSource";
import { FirestoreDbEngine } from "./backEndDataAccess/firestoreDbEngine";

export enum Database {
    FIRESTORE
}

export async function getDataSources(
    db: Database
): Promise<{
    productAndFacilityDataSource: ProductAndFacilityDataSource;
    userDataSource: UserDataSource;
}> {
    // perform db check if different dbs are implemented in the future
    const dbEngine = await new FirestoreDbEngine().init();
    const recipeSource = new ProductAndFacilityDataSource(dbEngine);
    try {
        await recipeSource.init();
    } catch (e) {
        console.warn(
            `ProductAndFacilityDataSource initialized without data: \n${e}`
        );
    }
    return {
        productAndFacilityDataSource: await new ProductAndFacilityDataSource(
            dbEngine
        ).init(),
        userDataSource: new UserDataSource(dbEngine)
    };
}
