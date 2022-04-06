export class Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        typeImg: string;
    };
    images: string[];

    public static createObjects(objs: any): Product[] {
        let objects: Product[] = [];
        if (objs instanceof Array) {
            objects = objs.map(function(resp) {
                return Product.createObject(resp);
            });
        }

        return objects;
    }

    public static createObject(obj: any): Product {
        const object = new Product();
        object.id = obj.id ? obj.id : null;
        object.title = obj.title ? obj.title : '';
        object.price = obj.price ? obj.price : '';
        object.description = obj.description ? obj.description : '';
        object.category = {
            id: obj.category ? obj.category.id : null,
            name: obj.category ? obj.category.name : null,
            typeImg: obj.category ? obj.category.typeImg : null,
        }
        object.images = obj.images instanceof Array ? obj.images : [];

        return object;
    }
}


