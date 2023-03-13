import { DateTime } from 'neo4j-driver';
import { uuid } from 'uuidv4'

export class Base {
    id: string;

    created_at: number;
    updated_at: number;
    deleted_at?: number | null;

    constructor() {
        this.id = uuid();
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }
}