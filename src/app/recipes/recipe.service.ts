import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schintzel', 
      'This is simply a test', 
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('meat', 1),
        new Ingredient('frech fried', 2)
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'This is simply a test', 
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('meat', 1),
        new Ingredient('buns', 2)
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  
}
