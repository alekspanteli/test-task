import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IBook } from '../../models/book.model';
import { InMemoryBookService } from '../../services/in-memory-book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnDestroy {
  books: IBook[] = [];
  notification = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private bookService: InMemoryBookService, private router: Router) {
    this.subscriptions.add(
      this.bookService.getBooks().subscribe(data => this.books = data)
    );

    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Use window.history.state to get navigation state after navigation
          if (window.history.state?.action === 'added') {
            this.notification = 'Book added!';
          } else if (window.history.state?.action === 'edited') {
            this.notification = 'Book updated!';
          }
        }
      })
    );
  }

  editBook(id: number) {
    // Navigate to edit page without state
    this.router.navigate(['/library', id]);
  }

  addBook() {
    // Navigate to add page without state
    this.router.navigate(['/library', 'new']);
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.subscriptions.add(
        this.bookService.deleteBook(id).subscribe(() => {
          this.notification = 'Book deleted!';
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
