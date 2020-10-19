window.addEventListener('load', () => {

class Animal{
    constructor( name ){
        this.name = name; 
    }

    speak(){
        console.log(`${this.name} Falando.....`);
    }
}

class dog extends Animal {
    constructor(name , type){
        super(name);
        this.type = type;
    }

    speak () {
        console.log(`${this.name} Barking and ${this.type}`);   
    }
}

class cat extends Animal{
    constructor(name , type){
        super(name);
        this.type = type;
    }

    speak () {
        console.log(`${this.name} Yealing and ${this.type}`);   
    }
}

const animal = new Animal('Generic');
animal.speak();

const dogs = new dog('Dollar' , 'German Priest');
dogs.speak();

const cats = new cat('Filó' , 'Cat Without hair');
cats.speak();
  
});

