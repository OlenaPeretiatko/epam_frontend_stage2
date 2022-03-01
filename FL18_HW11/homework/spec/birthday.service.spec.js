const {BirthdayService, notifyWaitingTime} = require('../src/birthday.service');

describe('Birthday service', function () {
    it('should accept date/timestamp', function () {
        const birthday1 = 8
        expect(() => {
            BirthdayService.howLongToMyBirthday(birthday1)
        }).toThrow('Wrong argument!');
    })
    it('should print \'Hooray!!! It is today!\' ', function () {
        spyOn(window.console, 'log');
        BirthdayService.howLongToMyBirthday(new Date(2022, 1, 14));
        expect(window.console.log).toHaveBeenCalledWith('Hooray!!! It is today!');
    })
    it('should print \'Soon...Please, wait....\'', function () {
        spyOn(window.console, 'log');
        BirthdayService.howLongToMyBirthday(new Date(2022, 1, 15));
        expect(window.console.log).toHaveBeenCalledWith('Soon...Please, wait just 1 day/days');
    })
    it('should print \'Oh, you have celebrated it...\'', function () {
        spyOn(window.console, 'log');
        BirthdayService.howLongToMyBirthday(new Date(2022, 1, 13));
        expect(window.console.log).toHaveBeenCalledWith('Oh, you have celebrated it 1 day/s ago, don\'t you remember?');
    })
    it("takes a long time", function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });
});