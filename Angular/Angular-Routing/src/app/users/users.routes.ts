import { Routes } from "@angular/router";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { TasksComponent } from "../tasks/tasks.component";

export const routes: Routes = [
            {
                path: '', // <your-domain>/users/<userId>
                redirectTo: 'tasks',
                pathMatch: 'prefix',
            },
            {
                path: 'tasks', // <your-domain>/users/<userId>/tasks
                component: TasksComponent
            },
            {
                path: 'tasks/new', // <your-domain>/users/<userId>/tasks/new
                component: NewTaskComponent,
            }
        ];