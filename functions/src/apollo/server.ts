import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { Resolvers } from "./generated/types";
import { AuthDirective } from "./directives/authDirective";
import * as express from "express";
import { merge } from "lodash";
import { User } from "../utilities/user";
import { getDataSources, Database } from "../dataSources/getDataSources";
import { ProductAndFacilityDataSource } from "../dataSources/productAndFacilitySpecDataSource";
import { productionLinePlannerResolver } from "./resolvers/productionLinePlannerResolver";
import { UserDataSource } from "../dataSources/userDataSource";
import { baseResolvers } from "./resolvers/baseResolvers";
import { baseTypeDef } from "./schemas/baseTypeDef";
import { authTypeDef } from "./schemas/authTypeDef";
import { productAndFacilityNames } from "./schemas/productAndFacilityNames";
import {
    genericTypes,
    productionLinePlannerTypeDef,
    userSpecificMutation
} from "./schemas/productionLinePlannerTypeDef";

const resolvers: Resolvers = merge(
    baseResolvers,
    productionLinePlannerResolver
);

const schema = makeExecutableSchema({
    typeDefs: [
        baseTypeDef,
        authTypeDef,
        productAndFacilityNames,
        genericTypes,
        productionLinePlannerTypeDef,
        userSpecificMutation
    ],
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    }
});

export async function generateApolloServer() {
    const app = express();

    const {
        productAndFacilityDataSource,
        userDataSource
    } = await getDataSources(Database.FIRESTORE);

    const server = new ApolloServer({
        schema,
        context: async ({ req }): Promise<ApolloServerContext> => {
            console.log("Generating Context...");
            return {
                user: await userDataSource.getUser(req.headers.authtoken),
                recipeDataSource: productAndFacilityDataSource,
                userDataSource: userDataSource
            };
        },
        introspection: true,
        playground: true
    });

    server.applyMiddleware({ app, path: "/", cors: true });
    return app;
}

export interface ApolloServerContext {
    user: User;
    recipeDataSource: ProductAndFacilityDataSource;
    userDataSource: UserDataSource;
}
