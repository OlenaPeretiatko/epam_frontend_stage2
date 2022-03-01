class Magazine {
    constructor() {
        this.states = [new ReadyForPushNotification(), new ReadyForApprove(),
            new ReadyForPublish(), new PublishInProgress()];
        this.current = this.states[0];
        this.articles = [];
        this.followers = [];
        this.staff = [];
    }

    change() {
        const totalStates = this.states.length;
        let currentIndex = this.states.findIndex(light => light === this.current);
        if (currentIndex + 1 < totalStates) {
            this.current = this.states[currentIndex + 1];
        } else {
            this.current = this.states[0];
        }
    }

    sign() {
        return this.current.sign();
    }
}

class Default {
    constructor(state) {
        this.state = state;
    }

    sign() {
        return '';
    }
}

class ReadyForPushNotification extends Default {
    constructor() {
        super('ReadyForPushNotification');
    }

    sign() {
        return 'ReadyForPushNotification';
    }
}

class ReadyForApprove extends Default {
    constructor() {
        super('ReadyForApprove');
    }

    sign() {
        return 'ReadyForApprove';
    }
}

class ReadyForPublish extends Default {
    constructor() {
        super('ReadyForPublish');
    }

    sign() {
        return 'ReadyForPublish';
    }
}

class PublishInProgress extends Default {
    constructor() {
        super('PublishInProgress');
    }

    sign() {
        return 'PublishInProgress';
    }
}

class MagazineEmployee {
    constructor(name, position, magazine) {
        this.name = name;
        this.position = position;
        this.magazine = magazine;
    }

    approve() {
        if (this.position !== 'manager') {
            console.log('You do not have permissions to do it');
        } else {
            if (this.magazine.articles.length < 5) {
                console.log('here 2')
                console.log(`Hello ${this.name}. You can't approve. We don't have enough of publications`);
            }
            if (this.magazine.articles.length >= 5 && this.magazine.sign() === 'ReadyForPushNotification') {
                this.magazine.change()
            }
            if (this.magazine.sign() === 'ReadyForPublish') {
                console.log(`Hello ${this.name} Publications have been already approved by you.`)
            }
            if (this.magazine.sign() === 'ReadyForApprove') {
                console.log(`Hello ${this.name}. You've approved the changes`);
                this.magazine.change()
            }
            if (this.magazine.sign() === 'PublishInProgress') {
                console.log('here 4')
                console.log('here 4')
                console.log('here 4')
                console.log('here 4')
                console.log(`Hello ${this.name}. While we are publishing we can't do any actions`);
            }
        }
    }

    addArticle(text) {
        if (this.position === 'manager') {
            console.log("Sorry, you can't add articles")
        } else {
            console.log('article added')
            this.magazine.articles.push(text);
        }
    }

    publish() {
        if (this.magazine.sign() === 'ReadyForPushNotification') {
            console.log(`Hello ${this.name}. You can't publish. We are creating publications now.`);
        } else if (this.magazine.sign() === 'ReadyForApprove') {
            console.log(`Hello ${this.name} You can't publish. We don't have a manager's approval.`);
        } else if (this.magazine.sign() === 'ReadyForPublish') {
            console.log(`Hello ${this.name} You've recently published publications.`)
            this.magazine.change()
        } else if (this.magazine.sign() === 'PublishInProgress') {
            console.log(`Hello ${this.name}. While we are publishing we can't do any actions`);
        } else {
            console.log(`Hello ${this.name}. While we are publishing we can't do any actions.`);
        }
    }
}

let topics = {};

class Follower {
    constructor(name) {
        this.name = name
        this._followers = [];
    }

    subscribeTo(magazine, topic) {
        this._followers.push(this.name)
        if (!Object.keys(topics).includes(topic)) {
            topics[topic] = []
        }
        topics[topic].push(this.name)
        this._followers[this.name].push()
    }

    unsubscribe(magazine, topic) {
        delete topics[topic]
    }

    onUpdate(data) {
        this._followers.forEach(subscriber => subscriber(data))
    }
}
