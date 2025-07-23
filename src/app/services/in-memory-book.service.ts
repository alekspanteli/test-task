import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IBook } from '../models/book.model';
import { IBookService } from './book.service';

@Injectable({ providedIn: 'root' })
export class InMemoryBookService extends IBookService {
  private books$ = new BehaviorSubject<IBook[]>([
    { id: 1, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' }
  ]);

  getBooks(): Observable<IBook[]> {
    return this.books$.asObservable();
  }

  getBook(id: number): Observable<IBook | undefined> {
    const book = this.books$.value.find(b => b.id === id);
    return of(book);
  }

  addBook(book: IBook): Observable<IBook> {
    const books = this.books$.value;
    book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    this.books$.next([...books, book]);
    return of(book);
  }

  updateBook(book: IBook): Observable<IBook> {
    const books = this.books$.value.map(b => b.id === book.id ? book : b);
    this.books$.next(books);
    return of(book);
  }

  deleteBook(id: number): Observable<void> {
    const books = this.books$.value.filter(b => b.id !== id);
    this.books$.next(books);
    return of(void 0);
  }
}
