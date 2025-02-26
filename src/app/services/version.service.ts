import { Injectable } from '@angular/core';
import buildTime from '../../../public/json/buildTime.json';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  getBuildDate() {
    return Object.values(buildTime[0])[0];
  }
}
