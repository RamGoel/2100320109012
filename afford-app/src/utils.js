export const isTimeBehindCurrent = (timeStr) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    function timeToSeconds(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    const currentSeconds = timeToSeconds(currentTime);
    const inputSeconds = timeToSeconds(timeStr);

    return inputSeconds < currentSeconds;
}


export const isWithin30Minutes=(inputTime)=>{
    const currentTime = new Date();

    const [inputHour, inputMinute, inputSecond] = inputTime.split(':').map(Number);

    const inputDateTime = new Date();
    inputDateTime.setHours(inputHour);
    inputDateTime.setMinutes(inputMinute);
    inputDateTime.setSeconds(inputSecond);

    const timeDifference = inputDateTime - currentTime;

    const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
    return Math.abs(timeDifference) <= thirtyMinutesInMilliseconds;
}
