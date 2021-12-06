/* https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad */

/* Native Error types https://mzl.la/2Veh3TR */
const nativeExceptions = [
  EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
].filter((except) => typeof except === 'function')

/* Throw native errors. ref: https://bit.ly/2VsoCGE */
function throwNative(error: Error) {
  for (const Exception of nativeExceptions) {
    if (error instanceof Exception) throw error
  }
}

/* Helper buddy for removing async/await try/catch litter */
function safeAwait<T = any>(promise: Promise<T>, finallyFunc?: () => void) {
  return promise.then(data => {
    if (data instanceof Error) {
      throwNative(data)
      return [ data ]
    }
    return [ undefined, data ]
  }).catch((error: any) => {
    throwNative(error)
    return [ error ]
  }).finally(() => {
    if (finallyFunc && typeof finallyFunc === 'function') {
      finallyFunc()
    }
  })
}

export default safeAwait