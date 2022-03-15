export const timeSince = (ts) => {
    let now = new Date()
    let timeStamp = new Date(ts)
    let secondsPast = ( now.getTime() - timeStamp.getTime() ) / 1000;

    let min = 60
    let hour = min * 60
    let day = hour * 24
    let week = day * 7
    let month = week * 4
    let year = month * 12

    let units = {
        second: "second",
        minute: "minute",
        hour: "hour",
        day: "day",
        week: "week",
        month: "month",
        year: "year"
    }

    let displayNum = 0
    let displayUnit = ""

    if ( 0 === parseInt(secondsPast ) ) {
        return "now"
    }

    if(secondsPast < min){
        displayNum = parseInt(secondsPast)
        displayUnit = units.second
    } else if(secondsPast < hour){
        displayNum = parseInt(secondsPast/min)
        displayUnit = units.minute
    } else if(secondsPast <= day){
        displayNum = parseInt(secondsPast/hour)
        displayUnit = units.hour
    } else if(secondsPast <= week){
        displayNum = parseInt(secondsPast/day)
        displayUnit = units.day
    } else if(secondsPast <= month){
        displayNum = parseInt(secondsPast/week)
        displayUnit = units.week
    } else if(secondsPast <= year) {
        displayNum = parseInt(secondsPast/month)
        displayUnit = units.month
    } else {
        displayNum = parseInt(secondsPast/year)
        displayUnit = units.year
    }

    if ( 1 < displayNum ) {
        displayUnit += "s"
    }

    return displayNum + " " + displayUnit + " ago"
}