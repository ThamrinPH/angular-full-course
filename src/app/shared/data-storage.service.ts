import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { from, Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url = "https://ng-complete-guid-d64c8-default-rtdb.asia-southeast1.firebasedatabase.app/";
  recipeSubscription: Subscription;

  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.recipeSubscription = this.http
      .put(
        this.url+'recipes.json', 
        recipes
      ).subscribe(
        response => {
          console.log(response);
        }
      );
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(this.url+'recipes.json')
      .pipe(
        map( recipes => {
          return recipes.map( recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        })
      )
      .subscribe(
        recipes => {
          this.recipesService.setRecipes(recipes);
        }
      )
  }
}
