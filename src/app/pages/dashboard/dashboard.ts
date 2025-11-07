import { WinInterval } from './../../model/WinInterval';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/MovieService';
import { TableModule } from 'primeng/table';
import { YearWinnersCount } from '../../model/YearWinnersCount';
import { StudiosWithWinCount } from '../../model/StudiosWithWinCount';
import { InputIcon } from 'primeng/inputicon';
import { WinnersByYear } from '../../model/WinnersByYear';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, InputIcon, FormsModule, InputTextModule, InputNumberModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  yearsWithMultipleWinners: YearWinnersCount = { years: [] };
  studiosWithWinCount: StudiosWithWinCount = { studios: [] };
  maxMinWinIntervalForProducers: WinInterval = { min: [], max: []};
  winnersByYear: WinnersByYear = { winners: [] };
  loadingGetYearsWithMultipleWinners: boolean = false;
  loadingGetStudiosWithWinCount: boolean = false;
  loadingGetMaxMinWinIntervalForProducers: boolean = false;
  loadingGetWinnersByYear: boolean = false;
  getWinnerSearch: number = (new Date).getFullYear();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMaxMinWinIntervalForProducers();
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getWinnersByYear();
  }

  getYearsWithMultipleWinners() {
    this.loadingGetYearsWithMultipleWinners = true;
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: response => {
        this.yearsWithMultipleWinners = response;
        this.loadingGetYearsWithMultipleWinners = false;
      },
      error: () => {
        this.loadingGetYearsWithMultipleWinners = false;
      }
    });
  }

  getStudiosWithWinCount() {
    this.loadingGetStudiosWithWinCount = true;
    this.movieService.getStudiosWithWinCount().subscribe({
      next: response => {
        const sortedStudios = response.studios.sort((a, b) => b.winCount - a.winCount);
        this.studiosWithWinCount = { studios: sortedStudios.slice(0, 3)};
        this.loadingGetStudiosWithWinCount = false;
      },
      error: () => {
        this.loadingGetStudiosWithWinCount = false;
      }
    });
  }

  getMaxMinWinIntervalForProducers() {
    this.loadingGetMaxMinWinIntervalForProducers = true;
    this.movieService.getMaxMinWinIntervalForProducers().subscribe({
      next: response => {
        this.maxMinWinIntervalForProducers = response;
        this.loadingGetMaxMinWinIntervalForProducers = false;
      },
      error: () => {
        this.loadingGetMaxMinWinIntervalForProducers = false;
      }
    });
  }

  getWinnersByYear() {
    let year = null;
    if (this.getWinnerSearch) {
      year = this.getWinnerSearch;
      this.loadingGetWinnersByYear = true;

      this.movieService.getWinnersByYear(year).subscribe({
        next: response => {
          this.winnersByYear = response;
          this.loadingGetWinnersByYear = false;
        },
        error: () => {
          this.loadingGetWinnersByYear = false;
        }
      });
    }
  }

}
