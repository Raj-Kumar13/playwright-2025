// let name1 = 'My name is 123 Rajkumar';

// let reversedName = name1.split(' ');
// let emptyWord = [];

// for (const word of reversedName) {
//     if (word === '123') {
//         emptyWord.push(word); // Keep '123' as is
//     } else {
//         emptyWord.push(word.split('').reverse().join('')); // Reverse other words
//     }
// }

// console.log(emptyWord.join(' '));
// // Output: [ 'yM', 'eman', 'si', '123', 'ramukjaR' ]


const input = 'aabbcc11223355555eeeee';

function getOcc(input: string) {
    const countObject: Record<string, number> = {}

    for (let char of input) {
        countObject[char] = (countObject[char] || 0) + 1
    }
    return countObject;
}
console.log(JSON.stringify(getOcc(input)));
