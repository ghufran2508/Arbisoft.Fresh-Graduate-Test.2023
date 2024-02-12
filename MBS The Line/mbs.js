const fs = require("fs");
const { argv } = require("process");

const filename = argv[2];

fs.readFile(filename, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
        data = data.split('\n');

        let stepsToStimulate = parseInt(data[0]);
        let consecutiveMerges = parseInt(data[1])
        let rows = parseInt(data[2]);

        let arr = [];

        for (let i = 0; i < rows; i++) {
            let row = data[i + 3].split(',');

            let toInp = row.map(val => parseInt(val))
            arr.push(toInp);
        }

        // console.log(arr);

        for (let i = 0; i < stepsToStimulate; i++) {

            for (let col = 0; col < arr[0].length; col++) {

                if(i+1 < rows) {
                    let sumUp = 0;
                    for(let ext = i; ext >= 0; ext--) {
                        sumUp += arr[ext][col];
                    }
                    if(arr[i+1][col] < sumUp) {

                        for(let down = i; down < i+consecutiveMerges; down++) {
                            let sumDUP = 0;

                            for(let nUp = down; nUp >= 0; nUp--) {
                                sumDUP += arr[nUp][col];
                            }

                            if(sumDUP > arr[down+1][col]) {
                                arr[down+1][col] += sumDUP;

                                for(let nUp = down; nUp >= 0; nUp--) {
                                    arr[nUp][col] = 0;
                                }
                            }
                            else break;
                        }
                    }
                }
                
            }
            // console.log(arr);
        }

        let str = "";
        for (let i = arr[0].length - 1; i >= 0; i--) {
            let count = 0;
            let index = rows;
            for (let j = rows - 1; j >= 0; j--) {
                if (arr[j][i] !== 0) {
                    // count++;
                    index = j;
                }
                
            }
            count = rows-index;
            if (i != 0)
                str = "," + count + str
            else {
                str = count + str;
            }
        }

        console.log(str);
    }
})