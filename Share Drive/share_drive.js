
const https = require("https");
const fs = require('fs');
const { argv } = require("process");
const filename = argv[2]

https.get("https://www.jsonkeeper.com/b/DM5F", (res) => {
    var { statusCode } = res;
    var contentType = res.headers['content-type'];

    let error;

    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }

    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
    }

    res.setEncoding('utf8');
    let rawData = '';

    res.on('data', (chunk) => {
        rawData += chunk;
    });

    res.on('end', () => {
        try {
            const ListTrip = JSON.parse(rawData);

            // console.log(ListTrip)

            https.get("https://www.jsonkeeper.com/b/9QRZ", (res2) => {
                var { statusCode } = res2;
                var contentType = res2.headers['content-type'];

                let error;

                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
                }

                if (error) {
                    console.error(error.message);
                    // consume response data to free up memory
                    res2.resume();
                }
                res2.setEncoding('utf-8');
                let rawData2 = '';

                res2.on('data', (chunk) => {
                    rawData2 += chunk
                });

                res2.on('end', () => {
                    try {
                        const PaymentList = JSON.parse(rawData2);
                        // console.log(PaymentList)

                        // main program start from here
                        fs.readFile(filename, 'utf-8', (err, data) => {
                            if (err) console.log(err);
                            else {
                                let dataLines = data.split('\n');
                                let testCases = parseInt(dataLines[0]);
                                // console.log(testCases)

                                for (let i = 0; i < testCases; i++) {

                                    let personToCheck = dataLines[i + 1].split(',');
                                    let id = parseInt(personToCheck[0]);
                                    let dateJoin = new Date(personToCheck[1]);

                                    let earningEveryMonth = [];

                                    ListTrip.map((trips) => {
                                        if (trips["driver_id"] === id) {
                                            let dateTrip = new Date(trips["trip_date"]);

                                            if (earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] === null || earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] === undefined) {
                                                earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] = trips.trip_details.fare;
                                            }
                                            else {
                                                earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] += trips["trip_details"]["fare"];
                                            }

                                        }
                                    })

                                    let paymentEveryMonth = [];
                                    
                                    let amountToPay_Com_Dr = 0;

                                    PaymentList.map((payments) => {
                                        if (payments["driver_id"] == id) {
                                            let datePayment = new Date(payments["date"]);

                                            if (datePayment >= dateJoin) {
                                                if (paymentEveryMonth[(datePayment.getMonth() + 1) - dateJoin.getMonth()] === null || paymentEveryMonth[(datePayment.getMonth() + 1) - dateJoin.getMonth()] === undefined) {
                                                    paymentEveryMonth[(datePayment.getMonth() + 1) - dateJoin.getMonth()] = payments["amount"]
                                                }
                                                else {
                                                    paymentEveryMonth[(datePayment.getMonth() + 1) - dateJoin.getMonth()] += payments["amount"];
                                                }
                                            }
                                            else {
                                                amountToPay_Com_Dr += payments["amount"];
                                            }

                                            // console.log(payments)
                                        }
                                    })

                                    

                                    for (let f = 0; f < (paymentEveryMonth.length > earningEveryMonth.length ? paymentEveryMonth.length : earningEveryMonth.length); f++) {
                                        if (earningEveryMonth[f] === null || earningEveryMonth[f] === undefined) earningEveryMonth[f] = 0;
                                        if (paymentEveryMonth[f] === null || paymentEveryMonth[f] === undefined) paymentEveryMonth[f] = 0;
                                    }

                                    // console.log(earningEveryMonth, paymentEveryMonth, extraPay)

                                    amountToPay_Com_Dr += paymentEveryMonth[0];

                                    let actualAmountToPay = 0;
                                    actualAmountToPay = earningEveryMonth[1] * 0.1;

                                    amountToPay_Com_Dr -= (actualAmountToPay - paymentEveryMonth[1])


                                    for (let mon = 2; mon < paymentEveryMonth.length; mon++) {
                                        actualAmountToPay = earningEveryMonth[mon] * 0.2;

                                        amountToPay_Com_Dr -= (actualAmountToPay - paymentEveryMonth[mon]);
                                    }

                                    console.log((Math.round(amountToPay_Com_Dr * 100) / 100).toFixed(1));
                                }
                            }
                        })

                    }
                    catch (err) {

                    }
                })
            })

        } catch (e) {
            // reject(e.message);
        }
    });
}).on('error', (e) => {
    reject(`Got error: ${e.message}`);
});


// const fs = require('fs');
// const { argv } = require('process');

// const filename = argv[2]

// fetch("https://www.jsonkeeper.com/b/DM5F")
//     .then((res) =>
//         res.json())
//     .then((ListTrip) => {
//         // console.log(ListTrip);

//         fetch("https://www.jsonkeeper.com/b/9QRZ")
//             .then((res) =>
//                 res.json())
//             .then((PaymentList) => {
//                 // console.log(PaymentList);

//                 fs.readFile(filename, 'utf-8', (err, data) => {
//                     if(err) console.log(err);
//                     else {
//                         let dataLines = data.split('\n');
//                         let testCases = parseInt(dataLines[0][0]);

//                         for(let i = 0; i < testCases; i++) {
//                             let personToCheck = dataLines[i+1].split(',');
//                             let id = parseInt(personToCheck[0]);
//                             let dateJoin = new Date(personToCheck[1]);

//                             let earningEveryMonth = [];

//                             ListTrip.map((trips) => {
//                                 if(trips["driver_id"] === id) {
//                                     let dateTrip = new Date(trips["trip_date"]);


//                                     // console.log((dateTrip.getMonth()) - dateJoin.getMonth());
//                                     // console.log(dateJoin, dateTrip)
//                                     if(earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] === null || earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] === undefined) {
//                                         earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] = trips.trip_details.fare;
//                                     }
//                                     else {
//                                         earningEveryMonth[(dateTrip.getMonth()) - dateJoin.getMonth()] += trips["trip_details"]["fare"];
//                                     }

//                                     // console.log(trips);
//                                 }
//                             })

//                             let paymentEveryMonth = [];
//                             let extraPay = [];

//                             PaymentList.map((payments) => {
//                                 if(payments["driver_id"] == id) {
//                                     let datePayment = new Date(payments["date"]);

//                                     if(datePayment >= dateJoin)
//                                     {
//                                         if(paymentEveryMonth[(datePayment.getMonth()+1) - dateJoin.getMonth()] === null || paymentEveryMonth[(datePayment.getMonth()+1) - dateJoin.getMonth()] === undefined) {
//                                             paymentEveryMonth[(datePayment.getMonth()+1) - dateJoin.getMonth()] = payments["amount"]
//                                         }
//                                         else {
//                                             paymentEveryMonth[(datePayment.getMonth()+1) - dateJoin.getMonth()] += payments["amount"];
//                                         }
//                                     }
//                                     else {
//                                         if(extraPay[((datePayment.getMonth()+1) - dateJoin.getMonth())*-1] === null || extraPay[((datePayment.getMonth()+1) - dateJoin.getMonth())*-1] === undefined) {
//                                             extraPay[((datePayment.getMonth()+1) - dateJoin.getMonth())*-1] = payments["amount"];
//                                         }
//                                         else {
//                                             extraPay[((datePayment.getMonth()+1) - dateJoin.getMonth())*-1] += payments["amount"];
//                                         }
//                                     }

//                                     // console.log(payments)
//                                 }
//                             })

//                             let amountToPay_Com_Dr = 0;

//                             for(let f = 0; f < (paymentEveryMonth.length > earningEveryMonth.length ? paymentEveryMonth.length:earningEveryMonth.length); f++) {
//                                 if(earningEveryMonth[f] === null || earningEveryMonth[f] === undefined) earningEveryMonth[f] = 0;
//                                 if(paymentEveryMonth[f] === null || paymentEveryMonth[f] === undefined) paymentEveryMonth[f] = 0;
//                                 if(extraPay[f] === null || extraPay[f] === undefined) extraPay[f] = 0;
//                             }

//                             for(let e = 0; e < extraPay.length; e++) {
//                                 amountToPay_Com_Dr += extraPay[e]
//                             }        

//                             // console.log(earningEveryMonth, paymentEveryMonth,extraPay)

//                             amountToPay_Com_Dr += paymentEveryMonth[0];

//                             let actualAmountToPay = 0;        
//                             actualAmountToPay = earningEveryMonth[1] * 0.1;

//                             amountToPay_Com_Dr -= (actualAmountToPay-paymentEveryMonth[1])


//                             for(let mon = 2; mon < paymentEveryMonth.length; mon++) {
//                                 actualAmountToPay = earningEveryMonth[mon]*0.2;

//                                 amountToPay_Com_Dr -= (actualAmountToPay-paymentEveryMonth[mon]);
//                             }

//                             console.log((Math.round(amountToPay_Com_Dr * 100) / 100).toFixed(1));
//                         }
//                     }
//                 })

//             })
//             .catch((err) => {
//                 console.log(err);
//             })


//     })
//     .catch((err) => {
//         console.log(err);
//     })