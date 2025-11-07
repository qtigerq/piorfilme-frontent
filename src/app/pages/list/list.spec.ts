import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { List } from './list';
import { MovieService } from '../../service/MovieService';
import { Movie } from '../../model/Movie';

class MovieServiceMock {
  getPaginatedMovies = jasmine.createSpy('getPaginatedMovies');
}

function createMovie(
  id: number,
  title = 'Test Movie',
  year = 2020,
  winner = false
): Movie {
  return {
    id,
    title,
    movieYear: year,
    producers: 'Producer',
    studios: 'Studio',
    winner
  };
}

describe('List Component', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let movieService: MovieServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List, HttpClientTestingModule],
      providers: [{ provide: MovieService, useClass: MovieServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as unknown as MovieServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPaginatedMovies with default params', () => {
    movieService.getPaginatedMovies.and.returnValue(of({ content: [], totalElements: 0 }));

    component.loadMovies({ first: 0, rows: 10 });

    expect(movieService.getPaginatedMovies).toHaveBeenCalledWith(0, 10, null, 'title,desc');
  });

  it('should update movies and totalElements after successful load', () => {
    const mockResponse = {
      content: [createMovie(1)],
      totalElements: 1
    };
    movieService.getPaginatedMovies.and.returnValue(of(mockResponse));

    component.loadMovies({ first: 0, rows: 10 });

    expect(component.movies).toEqual(mockResponse.content);
    expect(component.totalElements).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should compute sorting descending correctly', () => {
    movieService.getPaginatedMovies.and.returnValue(of({ content: [], totalElements: 0 }));

    component.loadMovies({ sortField: 'movieYear', sortOrder: -1 });

    expect(movieService.getPaginatedMovies).toHaveBeenCalledWith(
      0,
      10,
      null,
      'movieYear,desc'
    );
  });

  it('should extract filters correctly', () => {
    const filters = { title: { value: 'Matrix' } };
    movieService.getPaginatedMovies.and.returnValue(of({ content: [], totalElements: 0 }));

    component.loadMovies({ filters });

    expect(movieService.getPaginatedMovies).toHaveBeenCalledWith(
      0,
      10,
      filters,
      'title,desc'
    );
  });

  it('should handle API errors and stop loading', () => {
    movieService.getPaginatedMovies.and.returnValue(throwError(() => new Error('fail')));

    component.loadMovies({ first: 0, rows: 10 });

    expect(component.loading).toBeFalse();
    expect(component.movies).toEqual([]);
  });

  it('should calculate current page from first and rows', () => {
    movieService.getPaginatedMovies.and.returnValue(of({ content: [], totalElements: 0 }));

    component.loadMovies({ first: 30, rows: 10 });

    expect(movieService.getPaginatedMovies).toHaveBeenCalledWith(3, 10, null, 'title,desc');
  });

  it('should update loading state correctly during API call', () => {
    const mockResponse = { content: [createMovie(1)], totalElements: 1 };
    movieService.getPaginatedMovies.and.returnValue(of(mockResponse));

    expect(component.loading).toBeFalse();
    component.loadMovies({ first: 0, rows: 10 });
    expect(component.loading).toBeFalse();
  });
});
