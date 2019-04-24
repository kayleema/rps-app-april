export class FakeRepo {
    constructor() {
        this.container = [];
    }

    save(round) {
        this.container = [...this.container, round];
    }

    getRounds() {
        return this.container;
    }
}