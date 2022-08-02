import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
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
      'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-1-1.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('frech fried', 2)
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'This is simply a test', 
      'https://scontent.fsub8-1.fna.fbcdn.net/v/t1.6435-9/74590088_1246096215599172_1608310590579671040_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9267fe&_nc_eui2=AeEOuCXt9LoUL_kU3lhRZM9mlOlOnH1du9SU6U6cfV271KKKsfOHlOo4UUkHq9NcL1w&_nc_ohc=MHh4dAIOew0AX8MEuVv&_nc_oc=AQlKF3YDd3PwEb_wRydZie7tv8XOXZRbPkUEjj3q4_iKsONlR5Jxp4j8rpvL4WrkKcU&_nc_ht=scontent.fsub8-1.fna&oh=00_AT-ZhqMPhxSCpZZkHAM2ZXjYNY1alAqP-H7OmNYevKDFig&oe=630D4A08',
      [
        new Ingredient('meat', 1),
        new Ingredient('buns', 2)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addToCart(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
