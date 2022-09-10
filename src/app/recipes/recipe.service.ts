import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schintzel', 
  //     'This is simply a test', 
  //     'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-1-1.jpg',
  //     [
  //       new Ingredient('meat', 1),
  //       new Ingredient('frech fried', 2)
  //     ]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger', 
  //     'This is simply a test', 
  //     'https://pbs.twimg.com/media/Eue0HzSVIAU4nX_?format=jpg&name=large',
  //     [
  //       new Ingredient('meat', 1),
  //       new Ingredient('buns', 2)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = []

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addToCart(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
