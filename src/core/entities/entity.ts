import { UniqueId } from "./unique-id";

export interface BaseProps {
    id: UniqueId;
    createdAt: Date;
    updatedAt: Date | null;
}

export abstract class Entity<Props> {
    private _id: UniqueId
    protected createdAt: Date
    protected updatedAt?: Date | null
    protected props: Props

    get id() {
        return this._id
    }

    protected constructor(props: Props, baseProps?: BaseProps) {
        const { id, createdAt, updatedAt } = baseProps;
        this.props = props
        this._id = id ?? new UniqueId()
        this.createdAt = createdAt ?? new Date()
        this.updatedAt = updatedAt ?? null;
    }

    public equals(entity: Entity<Props>) {
        if (entity == this) return true;

        if (entity.id == this._id) return true;

        return false;
    }

    protected touch() {
        this.updatedAt = new Date();
    }
}