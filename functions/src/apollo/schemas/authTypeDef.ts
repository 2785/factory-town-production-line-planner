import { gql } from "apollo-server";

export const authTypeDef = gql`
    directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

    enum Role {
        ADMIN
        USER
        CONTRIBUTOR
        VISITOR
    }
`;
