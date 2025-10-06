import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topbar } from './topbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('Topbar', () => {
  let component: Topbar;
  let fixture: ComponentFixture<Topbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Topbar,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Topbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Topbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('Frontend Angular Test');
  });
});
