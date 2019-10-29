import { gql } from "apollo-server";

export const baseTypeDef = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        hello: String!
    }

    type Mutation {
        hello: String!
    }
`;
