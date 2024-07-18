export interface Ingredient {
    ingredient : string,
    quantity: string
}

export default interface Recette {
    id: number,
    title: string,
    description: string,
    image: string,
    preparation_time: number,
    category: string,
    type: string,
    ingredients: Ingredient[],
    steps: string[],
    portions: string,
    advice: string,
    CreatedBy: string,
}
