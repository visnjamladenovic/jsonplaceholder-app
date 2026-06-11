import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery = '';
  loading = true;
  error = '';
  deleteId: number | null = null;
  successMessage = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = '';
    this.postService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Greška pri učitavanju postova.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.id.toString().includes(q)
      );
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilter();
  }

  confirmDelete(id: number): void {
    this.deleteId = id;
  }

  cancelDelete(): void {
    this.deleteId = null;
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
        this.applyFilter();
        this.deleteId = null;
        this.showSuccess('Post uspješno obrisan!');
      },
      error: () => {
        this.error = 'Greška pri brisanju posta.';
        this.deleteId = null;
      }
    });
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }

  viewPost(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  editPost(id: number): void {
    this.router.navigate(['/posts', id, 'edit']);
  }

  get resultCount(): string {
    const total = this.filteredPosts.length;
    return this.searchQuery
      ? `${total} rezultat${total === 1 ? '' : 'a'} za "${this.searchQuery}"`
      : `${total} postova ukupno`;
  }
}
