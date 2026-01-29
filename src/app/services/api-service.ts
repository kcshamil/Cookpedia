import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ViewRecipe } from '../view-recipe/view-recipe';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // api function -
  // 1. get all recipes - called by home & recipes component
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }

  // register : called by register component
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  // login : called by login component
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  // view Recipe : view component when page open
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipes/${recipeId}`)
  }

  // related-recipe?cuisine=italian
  getRelatedRecipesAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`)
  }

  // downloads/:id api
  addToDownloadAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }

   // http://localhost:3000/recipes/696dca8bbe2d26c619adffdf/save : post - called view recipe complnen when save recipe btn clicked
  addToSaveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipes/${recipeId}/save`,reqBody,this.appendToken())
  }

     // http://localhost:3000/recipe-collection : get rqst from user collection component  when page load
  getUserSaveRecipesAPI(){
    return this.http.get(`${this.server_url}/recipe-collection`,this.appendToken())
  }
  // http://localhost:3000/recipe-collection/id : delete from save recipe component when delete btn clicked
   removeUserSaveRecipeItemAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/recipe-collection/${recipeId}`,this.appendToken())
  }

  addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedback`,reqBody)
  }

  // :get by user profile when page loads
  getUserDownloadListAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }


}

 
