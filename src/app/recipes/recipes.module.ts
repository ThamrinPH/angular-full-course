import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeService } from './recipe.service';
import { RecipesComponent } from './recipes.component';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from '../recipes-routing/recipes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports:[
    // if we use them internally on this recipe module, we don't need to exports the component anymore
    // because we called them in the recipe routing module
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent
  ],
  providers: [
    RecipeService
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
