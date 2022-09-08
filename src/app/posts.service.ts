import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from './post.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private url = 'https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content};

    this.http
      .post<{ name: string } >(
          this.url, 
          postData
        ).subscribe( responseData => {
          console.log(responseData);
        }
      );
  }

  fetchPosts() {
    return this.http
    .get<{ [key: string]: Post } >(this.url)
    .pipe(
      // map( (responseData: { [key: string]: Post } ) => {
      map( (responseData) => {
      const postsArray: Post[] = [];

      for (const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }

      return postsArray;
    }))
  }
}
