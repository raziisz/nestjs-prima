import { UniqueId } from "../entities/unique-id";

export abstract class IBaseRepository<T> {
    abstract create(data: T): Promise<void>;
    abstract save(data: T): Promise<void>;
    abstract findManyRecent(take: number): Promise<T[]>;
    abstract findById(id: UniqueId): Promise<T | null>;
    abstract delete(id: UniqueId): Promise<void>;
}