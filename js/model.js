export {Model};
import * as views from './views.js';

const Model = {

    people_url: '/data.json',   
    
    // this will hold the data stored in the model
    data: {
        people: [],
    },

    load: function() {

        fetch(this.people_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {
                this.data.people = data.people;
                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
            }
        );
    },

    get_people: function() {
        return this.data.people;
    }, 

    get_person: function(id) {

        let people = this.get_people();

        for(let i=0; i<people.length; i++) {
            if (people[i]._id === id) {
                return people[i];
            }
        }
    },

    get_people_over_30: function() {

        let people = this.get_people();
        let oldies = [];
        for (let i=0; i<people.length; i++) {
            if (people[i].age >= 30) {
                oldies.push(people[i]);
            }
        }
        return oldies;
    }

};


