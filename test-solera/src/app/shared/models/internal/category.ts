export class Category {
    id: number;
    name: string;
    typeImg: string;

    public static createObjects(objs: any): Category[] {
        let objects: Category[] = [];
        if (objs instanceof Array) {
            objects = objs.map(function(resp) {
                return Category.createObject(resp);
            });
        }

        return objects;
    }

    public static createObject(obj: any): Category {
        const object = new Category();
        object.id = obj.id ? obj.id : null;
        object.name = obj.name ? obj.name : '';
        object.typeImg = obj.typeImg ? obj.typeImg : '';

        return object;
    }
}


