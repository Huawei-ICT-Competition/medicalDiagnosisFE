import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { UploadFileComponent } from './body/upload-file/upload-file.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AnimateModule } from 'primeng/animate';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CardModule,
    AnimateModule,
    DividerModule,
    MessagesModule,
    TagModule,
    ImageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
