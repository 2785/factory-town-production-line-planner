import { typeDefs } from "./schemas/baseSchema";
import { ApolloServer } from "apollo-server";
import {
    MutationAddProductArgs,
    MutationAddSpecialFacilityArgs,
    Resolvers,
    ProductionLineResponse,
    Role
} from "./generated/types";
import { AuthDirective } from "./directives/authDirective";

const resolvers: Resolvers = {
    Query: {
        getProductionLine: (obj, args, context, info) => {
            const res: ProductionLineResponse = { productionSteps: [] };
            return Promise.resolve(res);
        }
    },
    Mutation: {
        addProduct: (obj, args, context, info): boolean => {
            return false;
        },
        addSpecialFacility: (obj, args, context, info): boolean => {
            return false;
        }
    }
};

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//     directiveResolvers
// });

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: { auth: AuthDirective },
    context: async ({ req }) => {
        // console.log(req);
        return { user: await getUser(req.headers.authToken) };
    }
});

async function getUser(authToken?: string): Promise<User> {
    return new User(authToken);
}

class User {
    constructor(authToken?) {
        this.roles = authToken
            ? authToken == "carrot"
                ? [Role.Admin]
                : [Role.User]
            : [Role.User];
    }
    private roles: Role[];
    public hasRole(role: Role): boolean {
        return this.roles.includes(role);
    }
}

export interface ApolloServerContext {
    user: User;
}