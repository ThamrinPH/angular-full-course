import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

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
}
