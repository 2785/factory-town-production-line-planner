import { IDatabaseEngine } from "./backEndDataAccess/iDataBaseEngine";
import {
    ProductSpec,
    Product,
    Facility,
    FacilitySpec
} from "../apollo/generated/types";

const PRODUCT_RECIPE_PATH = "gameData/products";
const FACILITY_DETAIL_PATH = "gameData/specialFacility";

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

    public async getFacilityDetailOrDefault(
        facility: Facility
    ): Promise<FacilitySpec | null> {
        const dbResponse = await this.dbEngine.getByPath<FacilitySpec>(
            `${FACILITY_DETAIL_PATH}/${facility}`
        );
        return dbResponse ? dbResponse : null;
    }

    public async setProductRecipe(productRecipes: ProductSpec[]) {
        return this.dbEngine.overWriteByPath<ProductSpec[]>(
            PRODUCT_RECIPE_PATH,
            Object.assign({}, productRecipes)
        );
    }
}
