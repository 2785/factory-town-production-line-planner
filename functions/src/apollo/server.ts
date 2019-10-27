import { typeDefs } from "./schemas/baseSchema";
import { ApolloServer } from "apollo-server-express";
import { Resolvers, ProductionLineResponse, Role } from "./generated/types";
import { AuthDirective } from "./directives/authDirective";
import * as express from "express";
import { merge } from "lodash";
import { User } from "../utilities/user";
import { getDataSources, Database } from "../dataSources/getDataSources";
import { ProductAndFacilityDataSource } from "../dataSources/productAndFacilitySpecDataSource";
import { productionLinePlannerResolver } from "./resolvers/productionLinePlannerResolver";
import { UserDataSource } from "../dataSources/userDataSource";

const baseResolver: Resolvers = {
    Query: {
        hello: () => Promise.resolve("Hello!")
    }
};

const resolvers: Resolvers = merge(baseResolver, productionLinePlannerResolver);

export async function generateApolloServer() {
    const app = express();

    const {
        productAndFacilityDataSource,
        userDataSource
    } = await getDataSources(Database.FIRESTORE);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        schemaDirectives: { auth: AuthDirective },
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
