import { Resolvers, ProductionLineResponse } from "../generated/types";

export const productionLinePlannerResolver: Resolvers = {
    Query: {
        getProductionLine: (obj, args, context, info) => {
            const res: ProductionLineResponse = { productionSteps: [] };
            return Promise.resolve(res);
        },
        hello: () => Promise.resolve("Hello!")
    },
    Mutation: {
        addProduct: (obj, args, context, info): boolean => {
            return false;
        },
        addSpecialFacility: (obj, args, context, info) => {
            return Promise.resolve(false);
        }
    }
};
