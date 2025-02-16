import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import saveAs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExporterService {
  constructor() {}

  exportForm(form: FormGroup, fileName: string, fileType: string) {
    let exportData = form.value;
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: fileType }),
      fileName
    );
  }
}
