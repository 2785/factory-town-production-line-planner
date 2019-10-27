import { BaseProductionFacility } from "./baseProductionFacility";
import { ProductSpec } from "../../../apollo/generated/types";

export class ProductionFacilityWithBuiltInBooster extends BaseProductionFacility {
    constructor(
        workerCap: number,
        qtyRequired: number,
        prod: ProductSpec,
        happinessBooster: number,
        private builtInBooster: number
    ) {
        super(prod, workerCap, qtyRequired, happinessBooster);
    }

    protected _getFullCapacity(): number {
        return (
            this.baseProductionSpeed *
            (1.0 + 0.25 * (this.workerCap - 1) + this.builtInBooster)
        );
    }

    // protected _getFacilityCountAndWorkerDistribution(): number[] {
    //     const fullSpeed = this.fullCapacity;
    //     let fullFacilityCount = Math.floor(this.qtyRequired / fullSpeed);
    //     const remainder = this.qtyRequired % fullSpeed;
    //     if (remainder == 0) {
    //         return new Array(fullFacilityCount).fill(this.workerCap);
    //     } else {
    //         let workerCount = remainder;
    //     }
    // }

    protected _getWorkerCount(remainder: number): number {
        const singleWorkerSpeed =
            this.baseProductionSpeed * (1 + this.builtInBooster);
        return remainder > singleWorkerSpeed
            ? Math.ceil(
                  (remainder - singleWorkerSpeed) /
                      this.baseProductionSpeed /
                      0.25
              ) + 1
            : 1;
    }

    protected _getActualProduction(): number {
        const lastFacilityWorkerCount = this.workerDistribution[
            this.workerDistribution.length - 1
        ];
        const lastFacilityProduction =
            lastFacilityWorkerCount == this.workerCap
                ? this.fullCapacity
                : this.baseProductionSpeed *
                  (1 +
                      0.25 * (lastFacilityWorkerCount - 1) +
                      this.builtInBooster);
        return (
            (this.workerDistribution.length - 1) * this.fullCapacity +
            lastFacilityProduction
        );
    }
}
