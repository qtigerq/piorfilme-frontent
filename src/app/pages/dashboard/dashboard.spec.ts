import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Dashboard } from './dashboard';
import { MovieService } from '../../service/MovieService';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from '../../model/Movie';

function createMovie(
  id: number,
  title = 'Test Movie',
  year = 2000,
  producer = 'Producer',
  studio = 'Studio',
  winner = true
): Movie {
  return { id, title, movieYear: year, producers: producer, studios: studio, winner };
}

function createYearWinner(year: number, winnerCount: number) {
  return { year, winnerCount };
}

function createStudio(name: string, winCount: number) {
  return { name, winCount };
}

function createWinInterval(producer: string, interval: number, prev: number, next: number) {
  return { producer, interval, previousWin: prev, followingWin: next };
}

class MovieServiceMock {
  getYearsWithMultipleWinners = jasmine.createSpy('getYearsWithMultipleWinners');
  getStudiosWithWinCount = jasmine.createSpy('getStudiosWithWinCount');
  getMaxMinWinIntervalForProducers = jasmine.createSpy('getMaxMinWinIntervalForProducers');
  getWinnersByYear = jasmine.createSpy('getWinnersByYear');
}

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let movieService: MovieServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: MovieService, useClass: MovieServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as unknown as MovieServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch years with multiple winners and set loading correctly', () => {
    const mockYears = { years: [createYearWinner(2000, 2)] };
    movieService.getYearsWithMultipleWinners.and.returnValue(of(mockYears));

    component.getYearsWithMultipleWinners();

    expect(component.loadingGetYearsWithMultipleWinners).toBeFalse();
    expect(component.yearsWithMultipleWinners).toEqual(mockYears);
    expect(movieService.getYearsWithMultipleWinners).toHaveBeenCalled();
  });

  it('should fetch top 3 studios sorted by win count', () => {
    const mockStudios = {
      studios: [
        createStudio('Studio A', 5),
        createStudio('Studio B', 10),
        createStudio('Studio C', 3),
        createStudio('Studio D', 8)
      ]
    };
    movieService.getStudiosWithWinCount.and.returnValue(of(mockStudios));

    component.getStudiosWithWinCount();

    expect(component.loadingGetStudiosWithWinCount).toBeFalse();
    expect(component.studiosWithWinCount.studios.length).toBe(3);
    expect(component.studiosWithWinCount.studios[0].name).toBe('Studio B'); // maior
    expect(component.studiosWithWinCount.studios[1].name).toBe('Studio D'); // segundo maior
    expect(component.studiosWithWinCount.studios[2].name).toBe('Studio A'); // terceiro maior
  });

  it('should fetch max/min win interval for producers', () => {
    const mockInterval = {
      max: [createWinInterval('Prod A', 10, 2000, 2010)],
      min: [createWinInterval('Prod B', 1, 2015, 2016)]
    };
    movieService.getMaxMinWinIntervalForProducers.and.returnValue(of(mockInterval));

    component.getMaxMinWinIntervalForProducers();

    expect(component.loadingGetMaxMinWinIntervalForProducers).toBeFalse();
    expect(component.maxMinWinIntervalForProducers).toEqual(mockInterval);
  });

  it('should fetch winners by year and update loading', () => {
    const mockWinners = {
      winners: [
        createMovie(1, 'Movie A', 2000),
        createMovie(2, 'Movie B', 2001)
      ]
    };
    movieService.getWinnersByYear.and.returnValue(of(mockWinners));

    component.getWinnerSearch = 2000;
    component.getWinnersByYear();

    expect(component.loadingGetWinnersByYear).toBeFalse();
    expect(component.winnersByYear).toEqual(mockWinners);
    expect(movieService.getWinnersByYear).toHaveBeenCalledWith(2000);
  });

  it('should not call getWinnersByYear if getWinnerSearch is null', () => {
    movieService.getWinnersByYear.calls.reset();
    component.getWinnerSearch = 0;
    component.getWinnersByYear();

    expect(movieService.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('should handle errors and set loading to false', () => {
    movieService.getYearsWithMultipleWinners.and.returnValue(throwError(() => new Error('fail')));
    movieService.getStudiosWithWinCount.and.returnValue(throwError(() => new Error('fail')));
    movieService.getMaxMinWinIntervalForProducers.and.returnValue(throwError(() => new Error('fail')));
    movieService.getWinnersByYear.and.returnValue(throwError(() => new Error('fail')));

    component.getYearsWithMultipleWinners();
    component.getStudiosWithWinCount();
    component.getMaxMinWinIntervalForProducers();
    component.getWinnerSearch = 2000;
    component.getWinnersByYear();

    expect(component.loadingGetYearsWithMultipleWinners).toBeFalse();
    expect(component.loadingGetStudiosWithWinCount).toBeFalse();
    expect(component.loadingGetMaxMinWinIntervalForProducers).toBeFalse();
    expect(component.loadingGetWinnersByYear).toBeFalse();
  });
});
