export class MenuItem {
    id: null | number;
    title: string;
    price: string;
    description: string;
    categories: string;
    options: string;
    showinreduced: boolean;

    constructor( item?: MenuItem ) {
        this.id = item?.id ?? null
        this.title = item?.title ?? '';
        this.price = item?.price ?? '';
        this.description = item?.description ?? '';
        this.categories = item?.categories ?? '';
        this.options = item?.options ?? '';
        this.showinreduced = item?.showinreduced ?? false;
    }

    public toJson(): string {
        return JSON.stringify( this );
    }
}