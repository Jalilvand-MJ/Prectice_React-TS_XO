const runSequential = async (req: (() => Promise<void> | void)[]) => {
    await req.reduce((promise, r) => promise.then(() => r()), Promise.resolve());
};

export default runSequential;
