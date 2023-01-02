const promiseSolver = async (promise: Promise<unknown>): Promise<unknown> => {
    // Adds a Try Catch to any Promise
    try {
        return await promise;
    } catch (err) {
        return new Error(err);
    }
};

export default promiseSolver;
