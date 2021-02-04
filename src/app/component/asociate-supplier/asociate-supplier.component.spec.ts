import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociateSupplierComponent } from './asociate-supplier.component';

describe('AsociateSupplierComponent', () => {
  let component: AsociateSupplierComponent;
  let fixture: ComponentFixture<AsociateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociateSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
