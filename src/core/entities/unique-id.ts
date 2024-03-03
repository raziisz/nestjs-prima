import { randomUUID } from "crypto";

export class UniqueId {
    private value: string;

    constructor(value?: string) {
        this.value = value ?? randomUUID();
    }

    public toString(): string {
        return this.value
    }

    public toValue() {
        return this.value;
    }

    public equals(id: UniqueId): boolean {
        return id.toString() == this.value
    }
}