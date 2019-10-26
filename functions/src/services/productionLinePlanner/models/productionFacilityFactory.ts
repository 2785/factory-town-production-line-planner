import { ProductAndFacilityDataSource } from "../../../dataSources/productAndFacilitySpecDataSource";
import { ProductSpec } from "../../../apollo/generated/types";
import {
    ProductionFacility,
    BaseProductionFacility
} from "./baseProductionFacility";

export class ProductionFacilityFactory {
    constructor(private ds: ProductAndFacilityDataSource) {}

    getFacility(prod: ProductSpec, qtyRequired: number): ProductionFacility {
        return new BaseProductionFacility(5, qtyRequired, prod);
    }
}
