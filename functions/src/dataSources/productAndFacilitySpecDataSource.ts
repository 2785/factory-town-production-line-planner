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
    private productSpecs: Map<Product, ProductSpec>;
    private specialFacilitySpecs: Map<Facility, FacilitySpec>;

    public async init(): Promise<ProductAndFacilityDataSource> {
        const productData = Object.values(
            await this.dbEngine.getByPath<ProductSpec[]>(PRODUCT_RECIPE_PATH)
        );
        const fd = await this.dbEngine.getByPath<FacilitySpec[]>(
            FACILITY_DETAIL_PATH
        );
        const facilityData = fd ? Object.values(fd) : [];
        this.productSpecs = productData.reduce((map, curr) => {
            map.set(curr.name, curr);
            return map;
        }, new Map<Product, ProductSpec>());
        this.specialFacilitySpecs = facilityData.reduce((map, curr) => {
            map.set(curr.name, curr);
            return map;
        }, new Map<Facility, FacilitySpec>());
        return this;
    }

    public getProductRecipe(): Promise<ProductSpec[]> {
        return this.dbEngine.getByPath<ProductSpec[]>(PRODUCT_RECIPE_PATH);
    }

    public getProductSpec(product: Product) {
        if (!this.productSpecs.has(product)) {
            throw new Error(
                `Required Product ${product.toLocaleLowerCase} is not found in the database`
            );
        } else {
            return this.productSpecs.get(product);
        }
    }

    public getFacilityDetailOrDefault(facility: Facility): FacilitySpec | null {
        if (this.specialFacilitySpecs.has(facility)) {
            return this.specialFacilitySpecs.get(facility);
        } else {
            return null;
        }
    }

    public async setProductRecipe(productRecipes: ProductSpec[]) {
        return this.dbEngine.overWriteByPath<ProductSpec[]>(
            PRODUCT_RECIPE_PATH,
            Object.assign({}, productRecipes)
        );
    }
}
