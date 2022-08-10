// Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(rowData) {
    return rowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateStamp) {
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === dateStamp
    })
    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateStamp) {
    let wage = hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = dates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

//https://github.com/learn-co-students/js-advanced-functions-introduction-to-context-lab-v-000/commit/4c0034358094cb264965aa2c5eb48545ab6aa8d0