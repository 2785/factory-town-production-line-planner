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

export abstract class BaseProductionFacility implements ProductionFacility {
    protected baseProductionSpeed: number;
    protected workerDistribution: number[];
    protected fullCapacity: number;
    protected actualProduction: number;
    protected prod: ProductSpec;
    protected workerCap: number;
    protected qtyRequired: number;
    protected happinessBooster: number;

    constructor(
        prod: ProductSpec,
        workerCap: number,
        qtyRequired: number,
        happinessBooster: number
    ) {
        this.prod = prod;
        this.workerCap = workerCap;
        this.qtyRequired = qtyRequired;
        this.happinessBooster = happinessBooster;
        this.baseProductionSpeed =
            (prod.productionCount / prod.productionTime) * happinessBooster;
        this.fullCapacity = this._getFullCapacity();
        this.workerDistribution = this._getFacilityCountAndWorkerDistribution();
        this.actualProduction = this._getActualProduction();
    }

    // protected abstract _getBaseProductionSpeed(): number;
    protected abstract _getFullCapacity(): number;
    // protected abstract _getFacilityCountAndWorkerDistribution(): number[];
    protected abstract _getActualProduction(): number;
    protected abstract _getWorkerCount(remainder: number): number;

    protected _getFacilityCountAndWorkerDistribution(): number[] {
        const fullSpeed = this.fullCapacity;
        let fullFacilityCount = Math.floor(this.qtyRequired / fullSpeed);
        const remainder = this.qtyRequired % fullSpeed;
        if (remainder == 0) {
            return new Array(fullFacilityCount).fill(this.workerCap);
        } else {
            let workerCount = this._getWorkerCount(remainder);
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
