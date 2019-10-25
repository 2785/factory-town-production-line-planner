import { typeDefs } from "./schemas/baseSchema";
import { makeExecutableSchema, ApolloServer } from "apollo-server";
import {
  EndProductSpec,
  ProductionStep,
  Product,
  Ingredient,
  Facility
} from "./generated/types";
import { IResolvers } from "graphql-tools";

// const schema = makeExecutableSchema({
//   typeDefs
// });

const resolvers = {
  Query: {
    getProductionLine: (obj, args, context, info): ProductionStep[] => {
      return [];
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

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const server = new ApolloServer({ typeDefs, resolvers });
