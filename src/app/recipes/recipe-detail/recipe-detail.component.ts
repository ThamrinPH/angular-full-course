import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }
    private routeSubs: Subscription;

  ngOnInit() {
    this.routeSubs = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  addToCart() {
    this.recipeService.addToCart(this.recipe.ingredients);

    alert(this.recipe.name + " ingredients Added!");
  }

  onRecipeEdit() {
    // this.router.navigate(['../', this.id,'edit'], { relativeTo: this.route}); // Alternative
    this.router.navigate(['edit'], { relativeTo: this.route});
  }
}
