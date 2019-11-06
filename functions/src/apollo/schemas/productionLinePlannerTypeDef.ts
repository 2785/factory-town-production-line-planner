import { gql } from "apollo-server";

export const productionLinePlannerTypeDef = gql`
    extend type Query {
        getProductionLine(requirement: EndProductSpec): ProductionLineResponse!
    }

    input EndProductSpec {
        product: Product!
        count: Float = 0
    }

    type ProductionLineResponse {
        productionSteps: [ProductionStep]!
    }

    type ProductionStep {
        facility: Facility!
        product: Product!
        facilityCount: Int!
        workerCount: [FacilityWorkerCount!]!
    }

    type FacilityWorkerCount {
        facilityNumber: Int!
        workerCount: Int!
    }
`;

export const userSpecificMutation = gql`
    extend type Mutation {
        createUser(id: String): UserData
        addFacilityBooster(facility: Facility!, booster: Float!): UserData
            @auth(requires: USER)
        setWorldHappinessBooster(booster: Float!): UserData
            @auth(requires: USER)
    }

    type UserData {
        id: String!
        worldHappiness: Float!
        facilityBoosters: [FacilityWithBooster]!
    }

    type FacilityWithBooster {
        facility: Facility
        booster: Float
    }
`;

export const genericTypes = gql`
    type ProductSpec {
        name: Product!
        facility: Facility!
        baseProduct: Boolean!
        productionCount: Float!
        productionTime: Float!
        ingredients: [Ingredient]
    }

    type FacilitySpec {
        name: Facility!
        workerCap: Int
    }

    type Ingredient {
        product: Product!
        count: Float!
    }
`;
