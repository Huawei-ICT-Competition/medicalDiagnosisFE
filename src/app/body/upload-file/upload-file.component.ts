import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [MessageService],
})
export class UploadFileComponent {
  uploadedFiles: any[] = [];
  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  addSingle(name: string, type: string) {
    this.messageService.add({
      severity: type === 'Not Fractured' ? 'success' : 'warn',
      summary: type,
      detail: name,
    });
  }

  async onUpload(event: { files: any }) {
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'type',
    //   detail: 'name',
    // });
    this.loading = true;
    this.uploadedFiles = [];
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
            if ((result as any).prediction == 0) {
              file.predictionResult = 'Fractured';
              this.addSingle(file.file.name, 'Fractured');
            } else {
              file.predictionResult = 'Not Fractured';
              this.addSingle(file.file.name, 'Not Fractured');
            }
            this.loading = false;
          },
        });
    }
  }

  getSeverity(status: any): any {
    switch (status) {
      case 'Not Fractured':
        return 'success';

      case 'Fractured':
        return 'warning';
    }
  }
}
