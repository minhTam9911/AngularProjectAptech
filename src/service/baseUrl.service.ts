import { Injectable } from "@angular/core";

@Injectable()
export class BaseUrl {
    private base_url: String = "http://localhost:5050/";
    public getBaseUrl(): String { return this.base_url; }
    
}