/*eslint no-console:0*/
({
    doInit: function(component){
        var config = {

            columns: [
                {
                    name: "name",
                    label: "Name",
                    type: "text"
                },
                {
                    name: "title",
                    label: "Title",
                    type: "text"
                },
                {
                    name: "phone",
                    label: "Phone",
                    type: "phone"
                },
                {
                    name: "home_phone",
                    label: "Home Phone",
                    type: "phone"
                },
                {
                    name: "mobile",
                    label: "Mobile",
                    type: "phone"
                },
                {
                    name: "other_phone",
                    label: "Other Phone",
                    type: "phone"
                },
                {
                    name: "fax",
                    label: "Fax",
                    type: "phone"
                },
                {
                    name: "reports_to",
                    label: "Reports To",
                    type: "text"
                },
                {
                    name: "email",
                    label: "Email",
                    type: "email"
                },
                {
                    name: "industry",
                    label: "Industry",
                    type: "text"
                },
                {
                    name: "mailing_address",
                    label: "Mailing Address",
                    type: "text"
                },
                {
                    name: "other_address",
                    label: "Other Address",
                    type: "text"
                },
                {
                    name: "languages",
                    label: "Languages",
                    type: "text"
                },
                {
                    name: "assistant",
                    label: "Assistant",
                    type: "text"
                },
                {
                    name: "level",
                    label: "Level",
                    type: "number"
                }
            ],

            rowsDisplayed: 10,
            scrollable: true,
            editable: true
        };

        var data = [];

        for(var i = 0; i < 10000 ; i++) {
            var phone = Math.floor(100000000 + Math.random() * 100000000);
            phone = phone.toString();
            phone = "(" + phone.slice(0,3) + ") " + phone.slice(0,3) + "-" + phone.slice(0,3);
            var newDataItem = {
                data: {
                    id: "Id-" + i,
                    name: "Contact Name " + i,
                    title: "Contact Title " + i,
                    phone: phone,
                    home_phone: phone,
                    mobile: phone,
                    other_phone: phone,
                    fax: phone,
                    reports_to: "Contact Reports To " + i,
                    email: "contactemail" + i + "@contact.com",
                    industry: "Contact Industry " + i,
                    mailing_address: "Contact Mailing Address " + i,
                    other_address: "Contact Other Address " + i,
                    languages: "Contact Languages " + i,
                    assistant: "Contact Assistant " + i,
                    level: i
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
                    phone: phone,
                    home_phone: phone,
                    mobile: phone,
                    other_phone: phone,
                    fax: phone,
                    reports_to: " Sub Contact Reports To " + j,
                    email: "subcontactemail" + j + "@contact.com",
                    industry: "Sub Contact Industry " + j,
                    mailing_address: "Sub Contact Mailing Address " + j,
                    other_address: "Sub Contact Other Address " + j,
                    languages: "Sub Contact Languages " + j,
                    assistant: "Sub Contact Assistant " + j,
                    level: j
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
                phone: phone,
                home_phone: phone,
                mobile: phone,
                other_phone: phone,
                fax: phone,
                reports_to: "Sub Sub Contact Reports To " + j,
                email: "subsubcontactemail" + j + "@contact.com",
                industry: "Sub Sub Contact Industry " + j,
                mailing_address: "Sub Sub Contact Mailing Address " + j,
                other_address: "Sub Sub Contact Other Address " + j,
                languages: "Sub Sub Contact Languages " + j,
                assistant: "Sub Sub Contact Assistant " + j,
                level: j
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
