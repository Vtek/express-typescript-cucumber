import { Website } from "../models/Website";

export interface IConfiguration {
    fileName: string;
}

export interface IWebsiteRepository {
    search(value: string): Promise<Website[]>
    exists(): Promise<boolean>;
    createTable(): Promise<void>;
    add(website: Website): Promise<void>;
    close(): Promise<void>;
}