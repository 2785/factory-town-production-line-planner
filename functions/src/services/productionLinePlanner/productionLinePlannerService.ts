import { ProductAndFacilityDataSource } from "../../dataSources/productAndFacilitySpecDataSource";
import { ProductionLineState, FulfillmentState } from "./models/types";
import { ProductionFacilityFactory } from "./models/productionFacilityFactory";

export class ProductionLinePlannerService {
    private facilityFactory: ProductionFacilityFactory;
    constructor(private ds: ProductAndFacilityDataSource) {}
    private recursiveFulfillProduction(
        currentState: ProductionLineState
    ): Promise<ProductionLineState> {
        return Promise.all(
            Array.from(currentState.fulfillment.values())
                .filter(item => !item.checkIfFulfilled())
                .map(async itemToFulfill => {
                    const productSpec = await this.ds.getProductSpec(
                        itemToFulfill.item
                    );
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
                })
        ).then(voidArr =>
            voidArr.length
                ? this.recursiveFulfillProduction(currentState)
                : currentState
        );
    }
}
