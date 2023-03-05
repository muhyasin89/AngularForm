import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://sterlingloyalty-12a20.firebaseio.com/post.json',
        postData,
        {
            observe: 'body'
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    // send http request
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://sterlingloyalty-12a20.firebaseio.com/post.json',
        {
            headers: new HttpHeaders({
                    "Custom-Header": "Hello",
                }),
            params: new HttpParams().set("print", "prettty")
        }
      )
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }

          return postArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  deletePost() {
    return this.http.delete(
      'https://sterlingloyalty-12a20.firebaseio.com/post.json', {
        observe:'events',
        responseType: 'json'
      }
    ).pipe(tap(event => {
        console.log(event);

        if(event.type == HttpEventType.Response){
            console.log(event.body);
        }
    }));
  }
}
