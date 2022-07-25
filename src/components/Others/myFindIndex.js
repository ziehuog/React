let arr = [1,2,3,4]

Array.prototype.myFindIndex = function(callback) {
    for (let index in this) {
      let result = callback(this[index]);
      if (result) {
        return index;
        break;
      }
    }
  };


for (let i = 0; i < arr.length; i++){

}

let a = arr.findIndex((e) => e > 3)
console.log(a)

// function i(){
//     for (let i = 0; i < arr.length; i++){
//       if (arr[i] > 2) {
//         console.log(i);
//          break;
//       };
//     }
//   }
//   i()
  
  // let idx = arr.findIndex((e) => e > 2);
  // console.log(idx);