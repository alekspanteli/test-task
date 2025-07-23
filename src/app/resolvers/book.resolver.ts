import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InMemoryBookService } from '../services/in-memory-book.service';
import { IBook } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<IBook | undefined> {
  constructor(private bookService: InMemoryBookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBook | undefined> {
    const id = route.paramMap.get('id');
    if (id && id !== 'new') {
      return this.bookService.getBook(+id);
    }
    return of(undefined);
  }
}
