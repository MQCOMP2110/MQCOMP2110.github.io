import * as views from './views.js';
import {Model} from './model.js';

 
window.addEventListener("modelUpdated", redraw);
window.addEventListener('personAdded', redraw);

function redraw() {

    let people = Model.get_people();     
    views.listPeopleView("list", people);
    bindings();
};


function person_click_handler() {

    let id = this.dataset.id;
    let person = Model.get_person(id);

    views.personView("person", person);
}


function person_form_handler() {

    const formdata = new FormData(this);

    const person = {
        firstName: formdata.get('firstName'),
        lastName: formdata.get('lastName'),
        age: formdata.get('age')
    }
    Model.add_person(person);

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


