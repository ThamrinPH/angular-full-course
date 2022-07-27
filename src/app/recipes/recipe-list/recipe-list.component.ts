import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "Nasi Putih", 
      "Nasi putih indonesia yang putih dan pulen", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nasi_dibentuk_bulat.jpg/800px-Nasi_dibentuk_bulat.jpg"
      ),
    new Recipe(
      "Nasi Putih", 
      "Nasi putih indonesia yang putih dan pulen", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nasi_dibentuk_bulat.jpg/800px-Nasi_dibentuk_bulat.jpg"
      )
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
