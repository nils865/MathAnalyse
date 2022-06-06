function analyze(input) {
    // loads the file
    let file = input.files[0];
    
    // creates a new reader object
    let reader = new FileReader();

    // reads the given file
    reader.onload = function(e) {
        let lines = e.target.result.split('\n');
        
        output(lines)
    }

    reader.readAsText(file);
}

// calculates minimum of sorted num arr
function min(arr) {
    return arr[0]
}

// calculates maximum of sorted num arr
function max(arr) {
    return arr[(arr.length - 1)]
}

// sorts an array
function sort(arr) {
    // compares every number with every number
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            // swaps if original number is smaller
            if(arr[i] < arr[j]) {
                arr = swap(arr, i, j);
            }
        }
    }

    // returns the sorted array
    return arr;
}

// swaps 2 elements in an array
function swap(arr, pos1, pos2) {
    // saves the first element
    tmp = arr[pos1];

    // swaps the elements
    arr[pos1] = arr[pos2];
    arr[pos2] = tmp;

    // returns the new array
    return arr;
}

// calculates median of sorted array
function median(arr) {
    // if the length of the array is even
    if(arr.length % 2 == 0) {
        // calculates the average of the two middle numbers
        return (arr[(arr.length / 2)] + arr[((arr.length / 2) - 1)]) / 2;
    } else {
        // returns the middle number
        return arr[parseInt(arr.length / 2)]
    }
}

// converts string array to number array
function toNumArr(arr) {
    let newArr = [];

    // converts every string to a number
    for(let i = 0; i < arr.length; i++) {
        // if the string is a valid number
        if(!isNaN(arr[i]) && !isNaN(parseFloat(arr[i]))) {
            newArr.push(parseFloat(arr[i]));
        }
    }

    // returns the new array
    return newArr;
}

function quartil(arr, type) {
    let startNum;
    let endNum;
    let newArr = [];

    if(type) {
        startNum = 0;
        endNum = parseInt(arr.length / 2);
    } else {
        startNum = parseInt(arr.length / 2) + 1;
        endNum = arr.length;
    }

    for(let i = startNum; i < endNum; i++) {
        newArr.push(arr[i]);
    }

    return median(newArr);
}

function mittelwert(arr) {
    let sum = 0;

    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}

function varianz(arr) {
    let variable = 0;

    for(let i = 0; i < arr.length; i++) {
        variable += (arr[i] - mittelwert(arr)) ** 2;
    }

    variable *= 1 / (arr.length - 1);
    
    return variable;
}

function standartabweichung(arr) {
    return varianz(arr) ** 0.5;
}

// outputs the results
function output(lines) {
    // gets the output element
    out = document.getElementById('output');

    for(let i = 0; i < lines.length; i++) {
        let line;
        
        if (lines[i].search(';') > -1) {
            line = lines[i].split(';');
        } else if(lines[i].search(',') > -1) {
            line = lines[i].split(',');
        } else {
            line = lines[i].split(' ');
        }

        line = toNumArr(line);

        if(line.length > 0) {
            line = sort(line);

            str = `<div class="outputBorder">
                <p class="noMP">Array: ${line}</p>
                <p class="dash"></p>
                <p class="noMP">Min: ${min(line)}</p>
                <p class="noMP">Max: ${max(line)}</p>
                <p class="noMP">Median: ${median(line)}</p>
                <p class="noMP">Mittelwert: ${mittelwert(line).toFixed(4)}</p>
                <p class="noMP">Oberes Quartil: ${quartil(line, false)}</p>
                <p class="noMP">Unteres Quartil: ${quartil(line, true)}</p>
                <p class="noMP">Varianz: ${varianz(line).toFixed(4)}</p>
                <p class="noMP">Standartabweichung: ${standartabweichung(line).toFixed(4)}</p>
                </div>
                <br>`;
            out.innerHTML += str;
        }
    }
}
