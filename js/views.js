
export { listPeopleView, personView };

/*
 * view function displays a list of people 
*/

// apply_template - apply a template to some data
//  and insert into the page
//  targetid - id of the element to insert content
//  templateid - id of the element containing the template
//  data - data to pass to the template
function apply_template(targetid, templateid, data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                    )
    target.innerHTML = template(data);
}

// listPeopleView - generate a view of a list of people
//   and insert it at `targetid` in the document
function listPeopleView(targetid, people) {

    apply_template(targetid,"people-list-template", {'people': people});

}

// personView - generate a view of a individual person
//   and insert it at `targetid` in the document
function personView(targetid, person) {

    apply_template(targetid,"person-template", person);
}
