import { BaseProps, Entity } from "./entity";

export interface BookProps {
    title: string;
    description: string;
    bar_code: string;
}

export class Book extends Entity<BookProps> {
    protected props: BookProps;

    static instance(
        props: BookProps,
        base?: BaseProps,
    ) {

        const book = new Book(props, base);

        return book;
    }

    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get bar_code() {
        return this.props.bar_code;
    }


    
}