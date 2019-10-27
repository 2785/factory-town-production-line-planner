import {
    ProductSpec,
    ProductionStep,
    FacilityWorkerCount,
    Ingredient
} from "../../../apollo/generated/types";

export interface ProductionFacility {
    getProductionStep(): ProductionStep;
    getIngredients(): Ingredient[];
    getActualProduction(): number;
}

export class BaseProductionFacility implements ProductionFacility {
    private baseProductionSpeed: number;
    private workerDistribution: number[];
    private fullCapacity: number;
    private actualProduction: number;
    constructor(
        private workerCap: number,
        private qtyRequired: number,
        private prod: ProductSpec,
        happinessBooster: number = 1.0
    ) {
        this.baseProductionSpeed =
            (prod.productionCount / prod.productionTime) * happinessBooster;
        this.fullCapacity = this._getFullCapacity();
        this.workerDistribution = this._getFacilityCountAndWorkerDistribution();
        this.actualProduction = this._getActualProduction();
    }

    protected _getFullCapacity(): number {
        return this.baseProductionSpeed * (1.0 + 0.25 * (this.workerCap - 1));
    }

    protected _getFacilityCountAndWorkerDistribution(): number[] {
        const fullSpeed = this.fullCapacity;
        let fullFacilityCount = Math.floor(this.qtyRequired / fullSpeed);
        const remainder = this.qtyRequired % fullSpeed;
        if (remainder == 0) {
            return new Array(fullFacilityCount).fill(this.workerCap);
        } else {
            let workerCount =
                remainder > this.baseProductionSpeed
                    ? Math.ceil(
                          (remainder - this.baseProductionSpeed) /
                              this.baseProductionSpeed /
                              0.25
                      ) + 1
                    : 1;
            if (workerCount == this.workerCap) {
                fullFacilityCount += 1;
                workerCount = 0;
                return new Array(fullFacilityCount).fill(this.workerCap);
            } else {
                const workerCountArr = new Array(fullFacilityCount).fill(
                    this.workerCap
                );
                workerCountArr.push(workerCount);
                return workerCountArr;
            }
        }
    }

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

    public getProductionStep(): ProductionStep {
        const workerCount = this._getFacilityCountAndWorkerDistribution();
        const facilityDetail = workerCount.map(
            (count, ind) =>
                <FacilityWorkerCount>{
                    facilityNumber: ind + 1,
                    workerCount: count
                }
        );
        return <ProductionStep>{
            facility: this.prod.facility,
            product: this.prod.name,
            facilityCount: workerCount.length,
            workerCount: facilityDetail
        };
    }

    public getActualProduction(): number {
        return this.actualProduction;
    }

    public getIngredients(): Ingredient[] {
        return this.prod.ingredients
            ? this.prod.ingredients.map(
                  x =>
                      <Ingredient>{
                          product: x.product,
                          count: x.count * this.actualProduction
                      }
              )
            : [];
    }
}
