import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/MovieService';
import { Movie } from '../../model/Movie';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [TableModule, PaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  movies: Movie[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  loading: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {

  }

  loadMovies(event: any) {
    this.loading = true;

    let filters = null;
    if (event && event.filters) {
      filters = event.filters;
    }

    const page = (event.first ?? 0) / (event.rows ?? this.pageSize);
    const size = event.rows ?? this.pageSize;

    const sortField = event.sortField ?? 'title';
    const sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
    const sort = `${sortField},${sortOrder}`;

    this.movieService.getPaginatedMovies(page, size, filters, sort).subscribe({
      next: response => {
        this.movies = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
