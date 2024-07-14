class Singleton {
    static instance;
    constructor(type) {
        if(Singleton.instance) {
            throw new Error("Instance already exist access it by getInstance function")
        }
        this.someValue = type
        Singleton.instance = this;
    }
    someMethod () {
        console.log("method", this.someValue);
    }
    static getInstance () {
        if(!Singleton.instance) {
            Singleton.instance =  new Singleton("Testing");
        }
        return Singleton.instance;
    }
}
try {
    const instance1 = Singleton.getInstance(); // Creates the Singleton instance
    const instance2 = Singleton.getInstance(); // Returns the existing instance
    
    console.log(instance1 === instance2, instance1.someMethod());
}catch {
    console.log("Error");
}