import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  uploadedFiles: any[] = [];
  results: any[] = [];

  constructor(private http: HttpClient) {}

  onUpload(event: { files: any }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    for (const file of this.uploadedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      const headers = new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
      });

      this.http
        .post('http://127.0.0.1:8000/model007/prediction', formData, {
          headers,
        })
        .subscribe({
          next: (result) => {
            console.log(result);
          },
        });
    }
  }
}
