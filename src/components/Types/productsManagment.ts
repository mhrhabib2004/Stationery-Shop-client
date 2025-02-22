export enum Category  {
    Writing = "Writing",
    OfficeSupplies = "Office Supplies",
    ArtSupplies = "Art Supplies",
    Educational = "Educational",
    Technology = "Technology",
  }
export interface TProduct {
    [x: string]: any;
    userId:string;
    name: string;
    brand: string;
    image:string;
    price: number;
    category: Category;
    description: string;
    quantity: number;
    inStock: boolean;
}