import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/storageToken';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  constructor(@Inject(LOCAL_STORAGE) public storage: Storage) {}

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
