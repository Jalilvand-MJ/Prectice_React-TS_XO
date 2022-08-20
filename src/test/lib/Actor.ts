import runSequential from "./RunSequential";

abstract class Actor {
    protected name: string;

    private promises: (() => Promise<void> | void)[];

    protected constructor (name: string) {
        this.name = name;
        this.promises = [];
    }

    attemptsTo (tasks: (() => Promise<void> | void)[] | (() => Promise<void> | void)): Actor {
        this.promises = this.promises.concat(tasks);
        return this;
    }

    expectsTo (questions: (() => Promise<void> | void)[] | (() => Promise<void> | void)): Actor {
        this.promises = this.promises.concat(questions);
        return this;
    }

    async run (): Promise<void> {
        try {
            await runSequential(this.promises);
        } finally {
            this.promises = [];
        }
    }
}

export default Actor;
