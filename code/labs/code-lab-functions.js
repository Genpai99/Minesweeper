// 1.
function maxOfTwoNumbers(x, y) {
    if (x >= y) {
      return x;
    } else {
      return y;
    }
    
    // or more "elegantly" using the fantastic ternary expression!
    // return  x >= y ? x : y;
  }
  
  console.log(maxOfTwoNumbers(3, 9));
  
  // 2.
  const maxOfThree = function(x, y, m) {
    if (x > y && x > m) {
        return x;
    } else if (y > x && y > m) {
        return y;
    } else {
        return m;
    }
  }
  console.log(maxOfThree(65,10,5));

  // 3.
  
  function isCharAVowel(x) {
    let vowel = ('a', 'e', 'i', 'o', 'u')
    if (x == vowel) {
    return true;
    }else{
        return false;
    }
  }
  console.log(isCharAVowel('k'));

  // 4.
  let numbers = [];
const sumArray = function(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++){
        sum += numbers[i];
    }
  return sum;
}
console.log(sumArray(numbers));

// 5.

function multiplyArray(numbers) {
    let sum  = 0;
    for 
}