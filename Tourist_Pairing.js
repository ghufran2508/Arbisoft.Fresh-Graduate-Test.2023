const fs = require('fs')
const { argv } = require('process')

// console.log(argv[2]);
fs.readFile(argv[2], 'utf-8', (err, data) => {
    if(err) console.log(err);
    else {
        let T = data.split('\n')[0];
        let S = data.split('\n')[1];
        
        let countPassengers = 0;
        T = T.split(',').map(val => {
            countPassengers+=parseInt(val);
        });

        let seatsInBus = S.split(',').map((val) => {
            return parseInt(val);
        })

        seatsInBus.sort((a,b)=>{return b-a});

        let countBuses = 0;
        let inBus = 0;

        seatsInBus.forEach((seats) => {
            if(inBus < countPassengers) {
                countBuses++;
            }

            inBus += seats;
        })

        console.log(countBuses);
    }
})