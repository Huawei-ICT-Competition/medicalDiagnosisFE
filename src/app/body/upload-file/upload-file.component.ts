import { AfterViewInit, Component, ElementRef, VERSION } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements AfterViewInit {
  public files: NgxFileDropEntry[] = [];
  name: string;
  ele;
  constructor(eleRef: ElementRef) {
    this.name = `Angular! v${VERSION.full}`;
    this.ele = eleRef;
  }

  ngAfterViewInit() {
    let dynam = document.createElement('div');
    dynam.innerHTML = `<ngx-file-drop [style.height.px]="700" dropZoneLabel="Drop files here" (onFileDrop)="dropped($event)"
            (onFileOver)="fileOver($event)" (onFileLeave)="fileLeave($event)">
            <ng-template class="container test" ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
                Optional custom content that replaces the the entire default content.
                <br>
                <i class="fa-solid fa-cloud-arrow-up fa-10x" (click)="openFileSelector()"></i>
            </ng-template>
        </ngx-file-drop>`;
    this.ele.nativeElement.appendChild(dynam);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
