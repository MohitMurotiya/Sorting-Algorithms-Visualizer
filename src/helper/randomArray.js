const generateRandomArray = (arraySize) => {
    let randomArray = [];
    for (let i = 0; i < arraySize; i++) {
        /* Formula: Math.random() * (max - min + 1) + min */
        randomArray.push(Math.floor(Math.random() * (300 - 20 + 1) + 20));
    }
    return randomArray;
}

export default generateRandomArray; 