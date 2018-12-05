let array1 = ['Node', 'React','Travel'];
let array2 = [5,8,12,27];
let element = 'Node';
let room = 'Puerto';
let number = 8;
let found = false;  //Boolean
let rooms = [{name: 'Node'}, {name: 'React'},{name: 'Travel'} ];

// --- Test 1
found = !(array2.find((e) => e === 8) === undefined);
console.log('Test1-Array2: is 8 found?', found);

// --- Test 2
found = !(array2.find((e) => e === 1) === undefined);
console.log('Test2-Array2 is 1 found?', found);

// --- Test 3
found = !(array1.find((e) => e === element) === undefined);
console.log('Test3-Array1, is Node found?', found);

// --- Test 4
found = !(array1.find((e) => e === room) === undefined);
console.log('Test4-Array1 is Puerto found?:', found);

// --- Test 5
console.log('Test 5 isArray():', Array.isArray(array1));
