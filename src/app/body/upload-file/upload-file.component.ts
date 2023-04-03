import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  uploadedFiles: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  async onUpload(event: { files: any }) {
    this.loading = true;
    for (let file of event.files) {
      this.uploadedFiles.push({
        file: file,
        predictionResult: null,
      });
    }

    for (let file of this.uploadedFiles) {
      const formData = new FormData();
      formData.append('file', file.file);

      const headers = new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
      });

      await this.http
        .post(`${environment.API}/api/v1/classify_img`, formData, {
          headers,
        })
        .subscribe({
          next: (result) => {
            file.predictionResult = (result as any).prediction;
            this.loading = false;
          },
        });
    }
    
  }
}
