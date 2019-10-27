import { ProductAndFacilityDataSource } from "../../../dataSources/productAndFacilitySpecDataSource";
import { ProductSpec } from "../../../apollo/generated/types";
import { ProductionFacility } from "./baseProductionFacility";
import { User } from "../../../utilities/user";
import { GenericProductionFacility } from "./genericProductionFacility";
import { ProductionFacilityWithBuiltInBooster } from "./productionFacilityWithBuiltInBooster";

const DEFAULT_WORKER_CAP = 5;

export class ProductionFacilityFactory {
    constructor(private ds: ProductAndFacilityDataSource, private user: User) {}

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

        const upgradedFacilities = this.user.getUpgradedFacilities();
        if (upgradedFacilities.has(prod.facility)) {
            return new ProductionFacilityWithBuiltInBooster(
                workerCap,
                qtyRequired,
                prod,
                this.user.getHappinessBooster(),
                upgradedFacilities.get(prod.facility)
            );
        } else {
            return new GenericProductionFacility(
                workerCap,
                qtyRequired,
                prod,
                this.user.getHappinessBooster()
            );
        }
    }
}
