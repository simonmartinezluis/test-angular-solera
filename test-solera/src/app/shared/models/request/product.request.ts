export class ProductRequest {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];

    public static createObject(obj: any): ProductRequest {
        const object = new ProductRequest();
        object.title = obj.title;
        object.price = Number(obj.price);
        object.description = obj.description;
        object.categoryId = obj.categoryId;
        object.images = [obj.image];

        return object;
    }
}


