import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBook } from '../../models/book.model';
import { InMemoryBookService } from '../../services/in-memory-book.service';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent {
  books: IBook[] = [];
  notification = '';

  constructor(private bookService: InMemoryBookService, private router: Router) {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  editBook(id: number) {
    this.router.navigate(['/books', id]);
  }

  addBook() {
    this.router.navigate(['/books', 'new']);
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.notification = 'Book deleted!';
      });
    }
  }
}
