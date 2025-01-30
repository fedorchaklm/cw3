export interface IRecipe {
    id: number;
    name: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: Array<string>;
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: Array<string>;
}