class User {
    protected name: string;

    private promises: (() => Promise<void> | void)[];

    constructor (name: string) {
        this.name = name;
        this.promises = [];
    }

    attemptsTo (tasks: (() => Promise<void> | void)[] | (() => Promise<void> | void)): User {
        this.promises = this.promises.concat(tasks);
        return this;
    }

    expectsTo (questions: (() => Promise<void> | void)[] | (() => Promise<void> | void)): User {
        this.promises = this.promises.concat(questions);
        return this;
    }

    async run (): Promise<void> {
        try {
            await this.promises.reduce((promise, r) => promise.then(() => r()), Promise.resolve());
        } finally {
            this.promises = [];
        }
    }
}

export default User;
