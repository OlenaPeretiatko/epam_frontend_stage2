function notifyWaitingTime(waitingTime) {
    console.log(waitingTime);
}

let BirthdayService = {
    congratulateWithBirthday() {
        console.log('Hooray!!! It is today!')
    },
    howLongToMyBirthday(date) {
        if (!(date instanceof Date)) {
            throw 'Wrong argument!'
        }
        return new Promise((resolve, reject) => {
            let one_day = 1000 * 60 * 60 * 24;
            let today = new Date()
            let expDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            let numOfDays = parseInt(((expDay.getTime() - today.getTime()) / one_day).toFixed(0));
            if (numOfDays === 0) {
                this.congratulateWithBirthday()
            }
            if (numOfDays > 0) {
                notifyWaitingTime(`Soon...Please, wait just ${numOfDays} day/days`)
            }
            if (numOfDays < 0) {
                notifyWaitingTime(`Oh, you have celebrated it ${Math.abs(numOfDays)} day/s ago, don't you remember?`)
            }
            setTimeout(() => resolve(), 100);
            setTimeout(() => reject(new Error('Whoops!')), 100);
        });
    }
}
module.exports = {BirthdayService, notifyWaitingTime}
