import { Resolvers } from "../generated/types";

export const baseResolvers: Resolvers = {
    Query: {
        hello: () => "Hello!"
    },
    Mutation: {
        hello: () => "Hello from Mutation!"
    }
};
