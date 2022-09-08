import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  selectedPost = null;
  error = null;
  errorSubscription: Subscription;
  url = 'https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.onFetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http Request
    this.postService.createAndStorePost(postData.title, postData.content);
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.error = error.message;
      console.log(error);
      this.isFetching = false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
      .subscribe( () => {
        this.loadedPosts = [];
      });
  }

  onPostSelected(post: Post) {
    this.selectedPost = post;
  }

  onHandleError() {
    this.error = null
  }
}
