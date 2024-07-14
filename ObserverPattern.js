class Subject {
    constructor () {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }
}
class Observer {
    constructor (name) {
        this.name = name;
    }
    update(data) {
        console.log(`${this.name} got update ${data}`)
    }
}
const subject = new Subject();
const observer1 = new Observer("observer1");
const observer2 = new Observer("observer2");
const observer3 = new Observer("observer3");
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);
subject.notify("FuckYOUUU");


