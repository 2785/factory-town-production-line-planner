import { IDatabaseEngine } from "./backEndDataAccess/iDataBaseEngine";
import { ProductSpec } from "../apollo/generated/types";

const PRODUCT_RECIPE_PATH = "gameData/products";

export class ProductRecipeDataSource {
    constructor(private dbEngine: IDatabaseEngine) {}
    public getProductRecipe(): Promise<ProductSpec[]> {
        return this.dbEngine.getByPath<ProductSpec[]>(PRODUCT_RECIPE_PATH);
    }
}
