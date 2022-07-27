import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.mode';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
