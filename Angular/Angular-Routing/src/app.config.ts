import { ApplicationConfig } from "@angular/core";
import { routes } from "./app/app.routes";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({
            paramsInheritanceStrategy: 'always',
        })),
    ],  
};