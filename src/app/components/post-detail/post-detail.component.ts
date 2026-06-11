import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  error = '';
  showDeleteConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getById(id).subscribe({
      next: (post) => { this.post = post; this.loading = false; },
      error: () => { this.error = 'Post nije pronađen.'; this.loading = false; }
    });
  }

  deletePost(): void {
    if (!this.post) return;
    this.postService.delete(this.post.id).subscribe({
      next: () => this.router.navigate(['/posts'], { queryParams: { deleted: this.post!.id } }),
      error: () => { this.error = 'Greška pri brisanju.'; this.showDeleteConfirm = false; }
    });
  }
}
