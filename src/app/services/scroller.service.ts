import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollerService {
  constructor() {}

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
