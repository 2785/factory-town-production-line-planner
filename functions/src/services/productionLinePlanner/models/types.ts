import { Product, ProductionStep } from "../../../apollo/generated/types";

export interface ProductionLineState {
    steps: ProductionStep[];
    fulfillment: Map<Product, FulfillmentState>;
}

export class FulfillmentState {
    constructor(
        public item: Product,
        public qtyRequired: number,
        public qtyFulfilled: number
    ) {}
    getQtyToFulfill(): number {
        return this.qtyRequired - this.qtyFulfilled;
    }
    checkIfFulfilled(): boolean {
        return this.qtyFulfilled >= this.qtyRequired;
    }
}
