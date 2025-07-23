import { Routes } from '@angular/router';
import { BookResolver } from './resolvers/book.resolver';

export const routes: Routes = [
  {
    path: 'library',
    loadComponent: () =>
      import('./components/book-list/book-list.component').then(m => m.BookListComponent)
  },
  {
    path: 'library/:id',
    loadComponent: () =>
      import('./components/book-detail/book-detail.component').then(m => m.BookDetailComponent),
    resolve: { book: BookResolver }
  },
  { path: '', redirectTo: '/library', pathMatch: 'full' }
];
