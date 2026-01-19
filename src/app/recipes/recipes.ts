import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-recipes',
  imports: [Header,Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

}
