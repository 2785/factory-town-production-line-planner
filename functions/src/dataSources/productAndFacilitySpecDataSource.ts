import { IDatabaseEngine } from "./backEndDataAccess/iDataBaseEngine";
import { ProductSpec, Product } from "../apollo/generated/types";

const PRODUCT_RECIPE_PATH = "gameData/products";

export class ProductAndFacilityDataSource {
    constructor(private dbEngine: IDatabaseEngine) {}
    public getProductRecipe(): Promise<ProductSpec[]> {
        return this.dbEngine.getByPath<ProductSpec[]>(PRODUCT_RECIPE_PATH);
    }

    public getProductSpec(product: Product) {
        return this.dbEngine.getByPath<ProductSpec>(
            `${PRODUCT_RECIPE_PATH}/${product}`
        );
    }
}
