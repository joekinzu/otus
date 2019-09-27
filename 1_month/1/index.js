function sum(a) {
  let currentSum = a;
  function f(b) {
    if(isNaN(b)){return currentSum};
    currentSum += b;
    return f;
  }
  f.toString = function() {
    return currentSum;
  };
  return f;
}

console.log(sum(1)(8)())