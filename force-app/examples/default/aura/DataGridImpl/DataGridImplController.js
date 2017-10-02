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

                    for (var j = 0; j < 5; j++) {
                        var subDataItem = {
                            data: {
                                id: "Id-Sub-" + j + i,
                                name: "Sub Name " + j + i,
                                title: "Sub Title " + j + i,
                                phone: phone,
                                home_phone: phone,
                                mobile: phone,
                                other_phone: phone,
                                fax: phone,
                                reports_to: " Sub Reports To " + j + i,
                                email: "subcontactemail" + j + i + "@contact.com",
                                industry: "Sub Industry " + j+ i,
                                mailing_address: "Sub Mailing Address " + j+ i,
                                other_address: "Sub Other Address " + j + i,
                                languages: "Sub Contact Languages " + j + i,
                                assistant: "Sub Contact Assistant " + j + i,
                                level: j + i
                            },
                            parent: "Id-" + i
                        }

                        data.push(subDataItem);

                        for (var z = 0; z < 3; z++) {
                            var subSubDataItem = {
                                data: {
                                    id: "Id-Sub-Sub-" + z + j,
                                    name: "Nested Name " + z + j,
                                    title: "Nested Title " + z + j,
                                    phone: phone,
                                    home_phone: phone,
                                    mobile: phone,
                                    other_phone: phone,
                                    fax: phone,
                                    reports_to: " Nested Reports To " + z + j,
                                    email: "subcontactemail" + z + j + "@contact.com",
                                    industry: "Nested Industry " + z + j,
                                    mailing_address: "Nested Mailing Address " + z + j,
                                    other_address: "Nested Other Address " + z + j,
                                    languages: "Nested Languages " + z + j,
                                    assistant: "Nested Assistant " + z + j,
                                    level: z + j
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