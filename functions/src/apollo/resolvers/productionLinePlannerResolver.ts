import { Resolvers, ProductionLineResponse } from "../generated/types";
import { ApolloServerContext } from "../server";
import { ProductionLinePlannerService } from "../../services/productionLinePlanner/productionLinePlannerService";

export const productionLinePlannerResolver: Resolvers = {
    Query: {
        getProductionLine: (obj, args, context: ApolloServerContext, info) => {
            const serviceProvider = new ProductionLinePlannerService(
                context.recipeDataSource
            );

            const res: ProductionLineResponse = {
                productionSteps: serviceProvider.getProductionLine(
                    args.requirement.product,
                    args.requirement.count
                )
            };
            return Promise.resolve(res);
        },
        hello: () => Promise.resolve("Hello!")
    },
    Mutation: {
        addProduct: (obj, args, context: ApolloServerContext, info) => {
            return false;
        },
        addSpecialFacility: (obj, args, context: ApolloServerContext, info) => {
            return Promise.resolve(false);
        }
    }
};
