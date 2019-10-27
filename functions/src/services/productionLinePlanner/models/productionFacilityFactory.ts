import { ProductAndFacilityDataSource } from "../../../dataSources/productAndFacilitySpecDataSource";
import { ProductSpec } from "../../../apollo/generated/types";
import {
    ProductionFacility,
    BaseProductionFacility
} from "./baseProductionFacility";

const DEFAULT_WORKER_CAP = 5;

export class ProductionFacilityFactory {
    constructor(private ds: ProductAndFacilityDataSource) {}

    public getFacility(
        prod: ProductSpec,
        qtyRequired: number
    ): ProductionFacility {
        const facilityDetail = this.ds.getFacilityDetailOrDefault(
            prod.facility
        );

        const workerCap = facilityDetail
            ? facilityDetail.workerCap
            : DEFAULT_WORKER_CAP;

        return new BaseProductionFacility(workerCap, qtyRequired, prod);
    }
}
