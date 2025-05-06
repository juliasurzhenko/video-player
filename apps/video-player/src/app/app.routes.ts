import { Route } from '@angular/router';
// import { AppComponent } from './app.component';
import { ClipsComponent } from './components/clips/clips.component';


export const appRoutes: Route[] = [
    {
        path: 'clips',
        component: ClipsComponent,
      },
      {
        path: '**',
        redirectTo: 'clips',
      },
    
];
