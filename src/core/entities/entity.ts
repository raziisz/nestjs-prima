import { UniqueId } from "./unique-id";

export interface BaseProps {
    id: UniqueId;
    createdAt: Date;
    updatedAt: Date | null;
}

export abstract class Entity<Props> {
    private _id: UniqueId
    private _createdAt: Date
    private _updatedAt?: Date | null
    protected props: Props

    get id() {
        return this._id
    }
    get createdAt() {
        return this._createdAt
    }
    get updatedAt() {
        return this._updatedAt
    }

    protected constructor(props: Props, baseProps?: BaseProps) {
        this.props = props

        this._id = baseProps?.id ?? new UniqueId()
        this._createdAt = baseProps?.createdAt ?? new Date()
        this._updatedAt = baseProps?.updatedAt ?? null;
    }

    public equals(entity: Entity<Props>) {
        if (entity == this) return true;

        if (entity.id == this._id) return true;

        return false;
    }

    protected touch() {
        this._updatedAt = new Date();
    }
}