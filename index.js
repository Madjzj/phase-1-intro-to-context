// Your code here
function createEmployeeRecord(recordInfo){
    const recordObj = {
        firstName: recordInfo[0],
        familyName: recordInfo[1],
        title: recordInfo[2],
        payPerHour: recordInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return recordObj;
}
function createEmployeeRecords(recordsArray){
    const recordsObj = [];
    for(const record of recordsArray){
        recordsObj.push(createEmployeeRecord(record))
    }
    return recordsObj;
}
function createTimeInEvent(record, date){
    const dateSplit = date.split(" ")
    record.timeInEvents.push({
        type:"TimeIn",
        hour: Number(dateSplit[1]),
        date: dateSplit[0]
    })
    return record;
}
function createTimeOutEvent(record, date){
    const dateSplit = date.split(" ")
    record.timeOutEvents.push({
        type:"TimeOut",
        hour: Number(dateSplit[1]),
        date: dateSplit[0]
    })
    return record;
}
function hoursWorkedOnDate(record,date){
    const timeInIndex = record.timeInEvents.findIndex(event => event.date === date);
    const timeOutIndex = record.timeOutEvents.findIndex(event => event.date === date);
    return (record.timeOutEvents[timeOutIndex].hour - record.timeInEvents[timeInIndex].hour)/100
}
function wagesEarnedOnDate(record,date){
    return hoursWorkedOnDate(record,date) * record.payPerHour
}
function allWagesFor(record){
    let total = 0;
    for(const event of record.timeInEvents){
        total += wagesEarnedOnDate(record,event.date)
    }
    return total
}
function calculatePayroll(recordsArray){
    let total = 0;
    for(const record of recordsArray){
        total += allWagesFor(record);
    }
    return total;
}