import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isEdit = false;
  postId: number | null = null;
  loading = false;
  loadingData = false;
  error = '';
  success = '';

  formData = {
    userId: 1,
    title: '',
    body: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.postId = Number(id);
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number): void {
    this.loadingData = true;
    this.postService.getById(id).subscribe({
      next: (post) => {
        this.formData = { userId: post.userId, title: post.title, body: post.body };
        this.loadingData = false;
      },
      error: () => { this.error = 'Greška pri učitavanju posta.'; this.loadingData = false; }
    });
  }

  get isValid(): boolean {
    return this.formData.title.trim().length >= 3 && this.formData.body.trim().length >= 10;
  }

  get titleCharCount(): number { return this.formData.title.trim().length; }
  get bodyCharCount(): number { return this.formData.body.trim().length; }

  submit(): void {
    if (!this.isValid) return;
    this.loading = true;
    this.error = '';

    if (this.isEdit && this.postId) {
      this.postService.update(this.postId, { ...this.formData, id: this.postId }).subscribe({
        next: (updated) => {
          this.loading = false;
          this.success = 'Post uspješno ažuriran!';
          setTimeout(() => this.router.navigate(['/posts', this.postId]), 1500);
        },
        error: () => { this.error = 'Greška pri ažuriranju.'; this.loading = false; }
      });
    } else {
      this.postService.create(this.formData).subscribe({
        next: (created) => {
          this.loading = false;
          this.success = `Post kreiran (ID: ${created.id})!`;
          setTimeout(() => this.router.navigate(['/posts']), 1500);
        },
        error: () => { this.error = 'Greška pri kreiranju.'; this.loading = false; }
      });
    }
  }

  get pageTitle(): string {
    return this.isEdit ? `Uredi post #${this.postId}` : 'Novi post';
  }

  get submitLabel(): string {
    return this.loading ? 'Sačuvaj...' : (this.isEdit ? 'Ažuriraj post' : 'Kreiraj post');
  }
}
