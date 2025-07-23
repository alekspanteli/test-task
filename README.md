# Book Library 📚

A simple Angular application to manage a collection of books. This app allows users to list, add, edit, and delete books. Built using Angular best practices, including modular architecture, lazy loading, dependency injection, and reactive forms.

> Generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.

---

## 🚀 Features

- List, create, update, and delete books.
- Lazy-loaded `LibraryModule` at route `/library`.
- Reactive forms for adding/editing books.
- Two book service implementations (HTTP and in-memory).
- Route resolver for preloading book data.
- Global HTTP error handling with interceptor.
- Confirmation on delete.
- Notification and logging services.
- (Optional) Unit tests for services/components.

---

## 🏗️ Project Structure Highlights

| Module | Purpose |
|--------|---------|
| `CoreModule` | Singleton services like `BookService`, `LoggerService`, `NotificationService` |
| `LibraryModule` | Feature module for managing books (lazy-loaded at `/library`) |
| `SharedModule` | Reusable components, directives, and pipes (if needed) |

---

## 🔁 Book Service Implementations

| Service | Description |
|---------|-------------|
| `HttpBookService` | Connects to a mock REST API (e.g., json-server) via HTTP |
| `InMemoryBookService` | Uses an in-app array for local testing/development |

Easily switch between them by updating the provider in `CoreModule`.

---

## 💡 Design Principles Used

- **SOLID principles**: Interfaces, single-responsibility services, dependency injection.
- **Angular best practices**: Lazy loading, interceptors, route resolvers, reactive forms.
- **Clean architecture**: Feature modules, service abstractions, testing support.
- **Separation of concerns**: UI, logic, data access are all decoupled.

---

## 🧪 Testing

To run unit tests using [Karma](https://karma-runner.github.io):

```bash
ng test
