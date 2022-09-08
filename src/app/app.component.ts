import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url = 'https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
    .post(
        this.url+'posts.json', 
        postData
      ).subscribe( responseData => {
        console.log(responseData);
      }
    );
    
  }

  onFetchPosts() {
    // Send Http request
    this.http
      .get(this.url+'posts.json')
      .subscribe( posts => {
        console.log(posts);
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
