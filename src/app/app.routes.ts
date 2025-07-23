import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookResolver } from './resolvers/book.resolver';

export const routes: Routes = [
  { path: 'library', component: BookListComponent },
  { path: 'library/:id', component: BookDetailComponent, resolve: { book: BookResolver } },
  { path: '', redirectTo: '/library', pathMatch: 'full' }
];
