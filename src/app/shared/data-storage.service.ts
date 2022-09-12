import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { from, Observable, Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url = "https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/";
  recipeSubscription: Subscription;

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.recipeSubscription = this.http
      .put(
        this.url+'recipes.json', 
        recipes
      ).subscribe(
        response => {
          // console.log(response);
        }
      );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
        this.url+'recipes.json'
        ).pipe(
          map( recipes => {
            return recipes.map( recipe => {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
          }),
          tap(recipes => {
            this.recipesService.setRecipes(recipes);
          })
        )
  }

}
