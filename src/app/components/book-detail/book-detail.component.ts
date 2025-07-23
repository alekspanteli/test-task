import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../../models/book.model';
import { InMemoryBookService } from '../../services/in-memory-book.service';

@Component({
  selector: 'app-book-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
  form: FormGroup;
  bookId: number | null = null;
  notification = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: InMemoryBookService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(0)]],
      genre: ['', Validators.required]
    });
  }

  ngOnInit() {
    const book: IBook | undefined = this.route.snapshot.data['book'];
    if (book) {
      this.bookId = book.id;
      this.form.patchValue(book);
    }
  }

  save() {
    if (this.form.invalid) return;
    const book: IBook = { ...this.form.value, id: this.bookId ?? 0 };
    if (this.bookId) {
      this.bookService.updateBook(book).subscribe(() => {
        this.notification = 'Book updated!';
        this.router.navigate(['/library']);
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.notification = 'Book added!';
        this.router.navigate(['/library']);
      });
    }
  }
}
