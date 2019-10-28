import {
    BaseProductionFacility,
    ProductionFacility
} from "./baseProductionFacility";
import { ProductSpec } from "../../../apollo/generated/types";

export class GenericProductionFacility extends BaseProductionFacility
    implements ProductionFacility {
    constructor(
        workerCap: number,
        qtyRequired: number,
        prod: ProductSpec,
        happinessBooster: number
    ) {
        super(prod, workerCap, qtyRequired, happinessBooster);
    }

    // protected _getBaseProductionSpeed(): number {
    //     return (
    //         (this.prod.productionCount / this.prod.productionTime) *
    //         this.happinessBooster
    //     );
    // }

    protected _getFullCapacity(): number {
        return this.baseProductionSpeed * (1.0 + 0.25 * (this.workerCap - 1));
    }

    protected _getWorkerCount(remainder: number): number {
        return remainder > this.baseProductionSpeed
            ? Math.ceil(
                  (remainder - this.baseProductionSpeed) /
                      this.baseProductionSpeed /
                      0.25
              ) + 1
            : 1;
    }

    // protected _getFacilityCountAndWorkerDistribution(): number[] {
    //     const fullSpeed = this.fullCapacity;
    //     let fullFacilityCount = Math.floor(this.qtyRequired / fullSpeed);
    //     const remainder = this.qtyRequired % fullSpeed;
    //     if (remainder == 0) {
    //         return new Array(fullFacilityCount).fill(this.workerCap);
    //     } else {
    //         let workerCount = this._getWorkerCount(remainder);
    //         if (workerCount == this.workerCap) {
    //             fullFacilityCount += 1;
    //             workerCount = 0;
    //             return new Array(fullFacilityCount).fill(this.workerCap);
    //         } else {
    //             const workerCountArr = new Array(fullFacilityCount).fill(
    //                 this.workerCap
    //             );
    //             workerCountArr.push(workerCount);
    //             return workerCountArr;
    //         }
    //     }
    // }

    public _getActualProduction(): number {
        const lastFacilityWorkerCount = this.workerDistribution[
            this.workerDistribution.length - 1
        ];
        const lastFacilityProduction =
            lastFacilityWorkerCount == this.workerCap
                ? this.fullCapacity
                : this.baseProductionSpeed *
                  (1.0 + 0.25 * (lastFacilityWorkerCount - 1));
        return (
            (this.workerDistribution.length - 1) * this.fullCapacity +
            lastFacilityProduction
        );
    }
}
