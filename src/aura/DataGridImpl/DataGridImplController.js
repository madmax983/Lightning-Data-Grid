({
    doInit: function(component){
        var type = component.get("v.type");
        var dataSize = component.get("v.dataSize");
        var config = {

            columns: [
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                    editable: true
                },
                {
                    name: "title",
                    label: "Title",
                    type: "text",
                    editable: true
                },
                {
                    name: "phone",
                    label: "Phone",
                    type: "phone",
                    editable: true
                },
                {
                    name: "home_phone",
                    label: "Home Phone",
                    type: "phone",
                    editable: true
                },
                {
                    name: "mobile",
                    label: "Mobile",
                    type: "phone",
                    editable: true
                },
                {
                    name: "other_phone",
                    label: "Other Phone",
                    type: "phone",
                    editable: true
                },
                {
                    name: "fax",
                    label: "Fax",
                    type: "phone",
                    editable: true
                },
                {
                    name: "reports_to",
                    label: "Reports To",
                    type: "text",
                    editable: true
                },
                {
                    name: "email",
                    label: "Email",
                    type: "email",
                    editable: true
                },
                {
                    name: "industry",
                    label: "Industry",
                    type: "text",
                    editable: true
                },
                {
                    name: "mailing_address",
                    label: "Mailing Address",
                    type: "text",
                    editable: true
                },
                {
                    name: "other_address",
                    label: "Other Address",
                    type: "text",
                    editable: true
                },
                {
                    name: "languages",
                    label: "Languages",
                    type: "text",
                    editable: true
                },
                {
                    name: "assistant",
                    label: "Assistant",
                    type: "text",
                    editable: true
                },
                {
                    name: "level",
                    label: "Level",
                    type: "number",
                    editable: true
                }
            ],
            rowsDisplayed: 10,
            scrollable: true,
            editable: true
        };

        config = type === "tree" ? Object.assign({}, config, {tree: true}) : Object.assign({}, config, {tree: false});


        function generateTreeData() {
            return new Promise($A.getCallback(function(resolve, reject) {
                var data = [];

                for(var i = 0; i < dataSize; i++) {
                    var phone = Math.floor(100000000 + Math.random() * 100000000);
                    phone = phone.toString();
                    phone = "(" + phone.slice(0, 3) + ") " + phone.slice(0, 3) + "-" + phone.slice(0, 4);
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
                        parent: null
                    }
                    data.push(newDataItem);

                    for (var j = 0; j < component.get("v.secondLevelDepth"); j++) {
                        var subDataItem = {
                            data: {
                                id: "Id-Sub-" + j + i,
                                name: "Sub Contact Name " + j + i,
                                title: "Sub Contact Title " + j + i,
                                phone: phone,
                                home_phone: phone,
                                mobile: phone,
                                other_phone: phone,
                                fax: phone,
                                reports_to: " Sub Contact Reports To " + j + i,
                                email: "subcontactemail" + j + i + "@contact.com",
                                industry: "Sub Contact Industry " + j + i,
                                mailing_address: "Sub Contact Mailing Address " + j + i,
                                other_address: "Sub Contact Other Address " + j + i,
                                languages: "Sub Contact Languages " + j + i,
                                assistant: "Sub Contact Assistant " + j + i,
                                level: j
                            },
                            parent: "Id-" + i
                        }

                        data.push(subDataItem);

                        for (var z = 0; z < component.get("v.thirdLevelDepth"); z++) {
                            var subSubDataItem = {
                                data: {
                                    id: "Id-Sub-Sub-" + z + j + i,
                                    name: "Nested Contact Name " + z + j + i,
                                    title: "Nested Contact Title " + z + j + i,
                                    phone: phone,
                                    home_phone: phone,
                                    mobile: phone,
                                    other_phone: phone,
                                    fax: phone,
                                    reports_to: " Nested Contact Reports To " + z + j + i,
                                    email: "nestedcontactemail" + z + j + i + "@contact.com",
                                    industry: "Nested Contact Industry " + z + j + i,
                                    mailing_address: "Nested Contact Mailing Address "  + z + j + i,
                                    other_address: "Nested Contact Other Address " + z + j + i,
                                    languages: "Nested Contact Languages " + z + j + i,
                                    assistant: "Nested Contact Assistant " + z + j + i,
                                    level: z
                                },
                                parent: "Id-Sub-" + j + i
                            }
                            data.push(subSubDataItem);
                        }
                    }
                }

                resolve(data);
            }));
        }

        function generateGridData() {
            return new Promise($A.getCallback(function(resolve, reject) {
                var data = [];

                for(var i = 0; i < dataSize; i++) {
                    var phone = Math.floor(100000000 + Math.random() * 100000000);
                    phone = phone.toString();
                    phone = "(" + phone.slice(0, 3) + ") " + phone.slice(0, 3) + "-" + phone.slice(0, 4);
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
                        }
                    }
                    data.push(newDataItem);
                }

                resolve(data);
            }));
        }

        if(type === "tree") {
            generateTreeData().then(function(value) {
                component.set("v.config", config);
                component.set("v.data", value);
                component.find("exampleGrid").init();
            });
        } else {
            generateGridData().then(function(value) {
                component.set("v.config", config);
                component.set("v.data", value);
                component.find("exampleGrid").init();
            });
        }

    }
})