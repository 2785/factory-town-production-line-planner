import { Role } from "../apollo/generated/types";

export class User {
    constructor(private roles: Role[], private id?: string) {}
    public hasRole(role: Role): boolean {
        return this.roles.includes(role);
    }
}
