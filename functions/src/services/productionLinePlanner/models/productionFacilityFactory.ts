import { ProductAndFacilityDataSource } from "../../../dataSources/productAndFacilitySpecDataSource";
import { ProductSpec } from "../../../apollo/generated/types";
import {
    ProductionFacility,
    BaseProductionFacility
} from "./baseProductionFacility";

const DEFAULT_WORKER_CAP = 5;

export class ProductionFacilityFactory {
    constructor(private ds: ProductAndFacilityDataSource) {}

    async getFacility(
        prod: ProductSpec,
        qtyRequired: number
    ): Promise<ProductionFacility> {
        const facilityDetail = await this.ds.getFacilityDetailOrDefault(
            prod.facility
        );

        const workerCap = facilityDetail
            ? facilityDetail.workerCap
            : DEFAULT_WORKER_CAP;

        return new BaseProductionFacility(workerCap, qtyRequired, prod);
    }
}
