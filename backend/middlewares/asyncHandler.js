const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
export default asyncHandler;
// This code defines a higher-order function `asyncHandler` that takes an asynchronous function `fn` as an argument.
