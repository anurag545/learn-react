class PubSub {
    constructor () {
        this.events = {};
    }
    publish(event, data) {
        if(this.events[event]) {
            this.events[event].forEach((callFunc) => {
                callFunc(data);
            })
        }
    }
    subcribe(event, callback) {
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    unscribe(event, callback) {
        if(this.events[event]) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
    }
}

const pubsub = new PubSub();
pubsub.subcribe("load", (data) => {
    console.log(data, "1");
});
pubsub.subcribe("load", (data) => {
    console.log(data, "2");
});
pubsub.subcribe("load1", (data) => {
    console.log(data, "3");
});
pubsub.publish("load", "Hiii");
pubsub.publish("load1", "Hiii Load1");