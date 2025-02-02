import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}


export const routes: Routes = [
    {
        path: '', // <your-domain>/ (root path)
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId', // <your-domain>/users/<userId>
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: {
            message: "Hello!"
        },
        resolve: {
            userName: resolveUserName
        }
    },
    {
        path: '**', // <your-domain>/anything-else
        component: NotFoundComponent,
    }
];