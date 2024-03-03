import { Book as PrismaBook, Prisma } from '@prisma/client';
import { Book } from 'src/core/entities/book';
import { UniqueId } from 'src/core/entities/unique-id';

export default class PrismaBookMapper {
    static toDomain(raw: PrismaBook): Book {
        return Book.instance(
            {
                ...raw
            }, 
            {
                id: new UniqueId(raw.id),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
            });
    }

    static toPrisma(book: Book): Prisma.BookUncheckedCreateInput {
        return {
            id: book.id.toString(),
            description: book.description,
            title: book.title,
            bar_code: book.bar_code,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt  
        }
    }
}