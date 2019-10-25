export interface IDatabaseEngine {
    getByPath<T>(path: string): Promise<T>;
    overWriteByPath<T>(path: string, data: T): Promise<DatabaseWriteResponse>;
    addByPath<T>(path: string, data: T): Promise<DatabaseWriteResponse>;
}

interface DatabaseWriteResponse {
    timeStamp: number;
}
