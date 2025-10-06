import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List } from './list';
import { MovieService } from '../../service/MovieService';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List, HttpClientTestingModule],
      providers: [MovieService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(List);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
