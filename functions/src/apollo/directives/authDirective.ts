import { SchemaDirectiveVisitor } from "apollo-server";
import {
    GraphQLObjectType,
    defaultFieldResolver,
    GraphQLField,
    GraphQLFieldMap
} from "graphql";
import { Role, AuthDirectiveResolver } from "../generated/types";
import { ApolloServerContext } from "../server";

interface GqlObjectTypeWithAuthWrapper extends GraphQLObjectType {
    _authFieldsWrapped?: boolean;
    _requiredAuthRole?: Role;
}

interface GqlFieldTypeWithAuthWrapper
    extends GraphQLField<any, ApolloServerContext> {
    _authFieldsWrapped?: boolean;
    _requiredAuthRole?: Role;
}

export class AuthDirective extends SchemaDirectiveVisitor {
    args: { requires: Role };

    visitObject(type: GqlObjectTypeWithAuthWrapper) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRole = this.args.requires;
    }

    visitFieldDefinition(
        type: GqlFieldTypeWithAuthWrapper,
        details: { objectType: GraphQLObjectType }
    ) {
        this.ensureFieldsWrapped(details.objectType);
        type._requiredAuthRole = this.args.requires;
    }

    ensureFieldsWrapped(objectType: GqlObjectTypeWithAuthWrapper) {
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();
        for (const fieldName in fields) {
            const field: GqlFieldTypeWithAuthWrapper = fields[fieldName];
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function(parent, args, context, info) {
                console.log("checking role...");
                const requiredRole =
                    field._requiredAuthRole || objectType._requiredAuthRole;
                console.log(`Required Role: ${requiredRole}`);
                console.log(`User: \n${JSON.stringify(context)}`);
                if (requiredRole && !context.user.hasRole(requiredRole))
                    throw new Error("not authorized");
                else return resolve.apply(this, [parent, args, context, info]);
            };
        }
    }
}
