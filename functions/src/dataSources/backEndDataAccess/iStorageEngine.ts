export interface IStorageEngine {
    getFileAsString(storagePath: string): Promise<string>;
}
