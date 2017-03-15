/*eslint no-console:0*/
({
    doInit: function(component){
        var config = {

            columns: [
                {
                    name: "name",
                    label: "Name"
                },
                {
                    name: "title",
                    label: "Title"
                },
                {
                    name: "phone",
                    label: "Phone"
                },
                {
                    name: "home_phone",
                    label: "Home Phone"
                },
                {
                    name: "mobile",
                    label: "Mobile"
                },
                {
                    name: "other_phone",
                    label: "Other Phone"
                },
                {
                    name: "fax",
                    label: "Fax"
                },
                {
                    name: "reports_to",
                    label: "Reports To"
                },
                {
                    name: "email",
                    label: "Email"
                },
                {
                    name: "industry",
                    label: "Industry"
                },
                {
                    name: "mailing_address",
                    label: "Mailing Address"
                },
                {
                    name: "other_address",
                    label: "Other Address"
                },
                {
                    name: "languages",
                    label: "Languages"
                },
                {
                    name: "assistant",
                    label: "Assistant"
                },
                {
                    name: "level",
                    label: "Level"
                }
            ],

            rowsDisplayed: 10
        };

        var data = [];

        for(var i = 0; i < 10000; i++) {
            var newDataItem = {
                data: {
                    id: "Id-" + i,
                    name: "Contact Name " + i,
                    title: "Contact Title " + i,
                    phone: "Contact Phone" + i,
                    home_phone: "Contact Home Phone" + i,
                    mobile: "Contact Mobile Phone" + i,
                    other_phone: "Contact Other Phone" + i,
                    fax: "Contact Fax " + i,
                    reports_to: "Contact Reports To " + i,
                    email: "Contact Email " + i,
                    industry: "Contact Industry " + i,
                    mailing_address: "Contact Mailing Address " + i,
                    other_address: "Contact Other Address " + i,
                    languages: "Contact Languages " + i,
                    assistant: "Contact Assistant " + i,
                    level: "Contact Level " + i
                },
                parent: null,
                hasChildren: false,
                expanded: false,
                children: null
            }
            data.push(newDataItem);
        }

        for(var j = 0; j < 5000; j++) {
            var subDataItem = {
                data: {
                    id: "Id-Sub-" + j,
                    name: "Sub Contact Name " + j,
                    title: "Sub Contact Title " + j,
                    phone: "Sub Contact Phone" + j,
                    home_phone: "Sub Contact Home Phone" + j,
                    mobile: "Sub Contact Mobile Phone" + j,
                    other_phone: "Sub Contact Other Phone" + j,
                    fax: "Sub Contact Fax " + j,
                    reports_to: "Sub Contact Reports To " + j,
                    email: "Sub Contact Email " + j,
                    industry: "Sub Contact Industry " + j,
                    mailing_address: "Sub Contact Mailing Address " + j,
                    other_address: "Sub Contact Other Address " + j,
                    languages: "Sub Contact Languages " + j,
                    assistant: "Sub Contact Assistant " + j,
                    level: "Sub Contact Level " + j
                },
                parent: "Id-" + j * 2,
                hasChildren: false,
                expanded: false,
                children: null
            }
            data.push(subDataItem);
        }

        var subSubDataItem = {
            data: {
                id: "Id-Sub-Sub-" + j,
                name: "Sub Sub Contact Name " + j,
                title: "Sub Sub Contact Title " + j,
                phone: "Sub Sub Contact Phone" + j,
                home_phone: "Sub Sub Contact Home Phone" + j,
                mobile: "Sub Sub Contact Mobile Phone" + j,
                other_phone: "Sub Sub Contact Other Phone" + j,
                fax: "Sub Sub Contact Fax " + j,
                reports_to: "Sub Sub Contact Reports To " + j,
                email: "Sub Sub Contact Email " + j,
                industry: "Sub Sub Contact Industry " + j,
                mailing_address: "Sub Sub Contact Mailing Address " + j,
                other_address: "Sub Sub Contact Other Address " + j,
                languages: "Sub Sub Contact Languages " + j,
                assistant: "Sub Sub Contact Assistant " + j,
                level: "Sub Sub Contact Level " + j
            },
            parent: "Id-Sub-0",
            hasChildren: false,
            expanded: false,
            children: null
        }

        data.push(subSubDataItem);

        component.set("v.config", config);
        component.set("v.data", data);
    }
})
