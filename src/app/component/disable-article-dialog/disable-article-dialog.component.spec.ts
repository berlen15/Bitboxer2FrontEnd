import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableArticleDialogComponent } from './disable-article-dialog.component';

describe('DisableArticleDialogComponent', () => {
  let component: DisableArticleDialogComponent;
  let fixture: ComponentFixture<DisableArticleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableArticleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
