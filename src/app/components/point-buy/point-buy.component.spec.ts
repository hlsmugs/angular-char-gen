import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointBuyComponent } from './point-buy.component';

describe('PointBuyComponent', () => {
  let component: PointBuyComponent;
  let fixture: ComponentFixture<PointBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
