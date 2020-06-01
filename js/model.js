export {Model};

const Model = {

    people_url:  "https://v2-api.sheety.co/dbb395f00a8bc7765eca3996d57d0c65/mqcomp2110Sample/people",

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
            if (people[i].id == id) {
                return people[i];
            }
        }
    },

    add_person: function(person) {

        fetch(this.people_url, {
            method: "POST",    
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'person': person})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.data.people.push(data.person);
            const event = new CustomEvent("personAdded");
            window.dispatchEvent(event);

        })

    
    }

};


