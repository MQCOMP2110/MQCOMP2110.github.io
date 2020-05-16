import * as views from './views.js';
import {Model} from './model.js';

 
window.addEventListener("modelUpdated", function(e) {

    console.log('modelUpdated triggered');

    let people = Model.get_people(); 

    views.listPeopleView("list", people);

    bindings();

});

function person_click_handler() {

    let id = this.dataset.id;
    let person = Model.get_person(id);

    views.personView("person", person);
}


function person_form_handler() {

    console.log(this);

    let formdata = new FormData(this);

    fetch('/api/people', {
        method: "POST",
        body: formdata
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        views.personView("person", data.person);
    })

    return false;
}

function bindings() {
    let names = document.getElementsByClassName("person-name");
    for(let i=0; i<names.length; i++) {
        names[i].onclick = person_click_handler;
    }

    let form = document.getElementById("person-form");
    form.onsubmit = person_form_handler;
}




window.onload = function() {
    Model.load();
};


