import { Component, inject, signal } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  imports: [Header,Footer,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  p: number = 1;
  searchKey:string = "" 
  allRecipes:any = signal([])
  dummyAllRecipes:any = []
  cusineArray:any = signal([])
  mealTypeArray:any = signal([])
  api = inject(ApiService)

  ngOnInit(){
    this.getAllRecipes()
}

getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      // console.log(res);
      this.allRecipes.set(res)
      this.dummyAllRecipes = this.allRecipes()
      // console.log(this.allRecipes())
      this.allRecipes().forEach((item:any)=>{
        !this.cusineArray().includes(item.cuisine) && this.cusineArray().push(item.cuisine)
      })
      // console.log(this.cusineArray());
      let dummyMealTypeArray = this.allRecipes().map((item:any)=>item.mealType).flat(Infinity)
      dummyMealTypeArray.forEach((item:any)=>{
        !this.mealTypeArray().includes(item) && this.mealTypeArray().push(item)
      })
      console.log(this.mealTypeArray());     
    })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))
  }
}
