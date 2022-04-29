declare module "nukleon" {
  export class Database {
    constructor(file?: string);
    private file: string;
    public setBackup(filePath: string): void;
    public loadBackup(): void;
    public set(data: string, value: any): void;
    public fetch(data: string): any;
    public get(data: string): any;
    public destroy(): object;
    public remove(data: string): void;
    public add(data: string, value: number): void;
    public subtract(data: string, value: number): void;
    public has(data: string): boolean;
    public clear(): void;
    public fetchAll(): object;
    public all(): object;
    public deleteEach(data: string): void;
    public push(array: string, value: any): void;
    public arrayFetch(array: any, number: any): void;
    public objectFetch(object: any, key: any): void;
    public math(data: any, operator: any, value: number): void;
    public delete(array: string, index: number | string): void;
    public deleteKey(object: string, key: string): void;
  }
}