import { ProductAndFacilityDataSource } from "../../dataSources/productAndFacilitySpecDataSource";
import { ProductionLineState, FulfillmentState } from "./models/types";
import { ProductionFacilityFactory } from "./models/productionFacilityFactory";
import { Product, ProductionStep } from "../../apollo/generated/types";

export class ProductionLinePlannerService {
    private facilityFactory: ProductionFacilityFactory;
    constructor(private ds: ProductAndFacilityDataSource) {
        this.facilityFactory = new ProductionFacilityFactory(ds);
    }

    public getProductionLine(
        endProduct: Product,
        count: number
    ): ProductionStep[] {
        const beginningState: ProductionLineState = {
            steps: [],
            fulfillment: new Map<Product, FulfillmentState>()
        };
        const prod = this.ds.getProductSpec(endProduct);

        beginningState.fulfillment.set(
            endProduct,
            new FulfillmentState(
                endProduct,
                (count / prod.productionTime) * prod.productionCount,
                0
            )
        );
        const endState = this.recursiveFulfillProduction(beginningState);
        return endState.steps;
    }

    private recursiveFulfillProduction(
        currentState: ProductionLineState
    ): ProductionLineState {
        const voidArr = Array.from(currentState.fulfillment.values())
            .filter(item => !item.checkIfFulfilled())
            .map(itemToFulfill => {
                const productSpec = this.ds.getProductSpec(itemToFulfill.item);
                const facility = this.facilityFactory.getFacility(
                    productSpec,
                    itemToFulfill.getQtyToFulfill()
                );
                const step = facility.getProductionStep();
                const ingredients = facility.getIngredients();
                const production = facility.getActualProduction();
                currentState.steps.push(step);
                itemToFulfill.qtyFulfilled += production;
                ingredients.forEach(ingredient => {
                    if (currentState.fulfillment.has(ingredient.product)) {
                        const currentRequirement = currentState.fulfillment.get(
                            ingredient.product
                        );
                        currentRequirement.qtyRequired += ingredient.count;
                        currentState.fulfillment.set(
                            ingredient.product,
                            currentRequirement
                        );
                    } else {
                        const newFulfillmentRequirement = new FulfillmentState(
                            ingredient.product,
                            ingredient.count,
                            0
                        );
                        currentState.fulfillment.set(
                            ingredient.product,
                            newFulfillmentRequirement
                        );
                    }
                });
            });
        return voidArr.length
            ? this.recursiveFulfillProduction(currentState)
            : currentState;
    }
}
