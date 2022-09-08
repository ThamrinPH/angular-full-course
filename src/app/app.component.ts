import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  url = 'https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    // this.isFetching = true;
    // this.postService.fetchPosts().subscribe( posts => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts
    // });
    this.onFetchPosts();
    console.log(this.loadedPosts.length, this.isFetching)
  }

  onCreatePost(postData: Post) {
    // Send Http Request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
