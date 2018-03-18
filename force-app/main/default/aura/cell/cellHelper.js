({
    editCell: function(component) {
        component.set("v.editMode", true);
        this.createDynamicCell(component);
    },
    handleEdit: function(component, event) {
        component.set("v.editMode", false);
        var currentValue = component.get("v.value");
        var rowIndex = component.get("v.rowIndex");
        var cellIndex = component.get("v.indexVar");
        var dynamicCell = component.find("cell" + rowIndex + cellIndex + "true");
        var editor = dynamicCell.get("v.editors");
        var newCellValue = editor[0].get("v.value");

        if(currentValue != newCellValue) {
            component.set("v.value", newCellValue);

            var dataItem = component.get("v.dataItem");
            var columnName = component.get("v.column").name;
            dataItem.data[columnName] = newCellValue;
            if(dataItem[columnName]) {
                dataItem[columnName].isDirty = true;
            } else {
                dataItem[columnName] = {};
                dataItem[columnName].isDirty = true;
            }

            component.set("v.dataItem", dataItem);

            component.set("v.isDirty", true);
            event.stopPropagation();
        }
        this.createDynamicCell(component);
    },
    syncFacets: function(component) {
        var value = component.get("v.value");
        var rowIndex = component.get("v.rowIndex");
        var cellIndex = component.get("v.indexVar");
        var editMode = component.get("v.editMode");

        var dynamicCell = component.find("cell" + rowIndex + cellIndex + editMode);

        if(!editMode && dynamicCell) {
            var decorators = dynamicCell.get("v.decorators");
            if(decorators.length > 0) {
                decorators[0].set("v.value", value);
                decorators[0].set("v.column", component.get("v.column"));
            }
        } else if (dynamicCell) {
            var editors = dynamicCell.get("v.editors");
            if(editors.length > 0) {
                editors[0].set("v.value", value);
                editors[0].set("v.column", component.get("v.column"));
            }
        }
    },
    createDynamicCell: function(component) {
        let isHeaderComponent = component.get("v.indexVar") == 0;
        let editMode = component.get("v.editMode");
        let rowIndex = component.get("v.rowIndex");
        let cellIndex = component.get("v.indexVar");

        let exists = component.find("cell" + rowIndex + cellIndex + editMode) !== undefined;
        let body = component.get("v.body");


        if(isHeaderComponent && !editMode) {
            if(exists) {
                let headerView = component.find("cell" + rowIndex + cellIndex + "false");
                $A.util.toggleClass(headerView, "slds-hide");
            } else {
                $A.createComponent(
                    "c:HeaderCellView",
                    {
                        "aura:id": "cell" + rowIndex + cellIndex + editMode,
                        "column": component.getReference("v.column"),
                        "dataItem": component.getReference("v.dataItem"),
                        "value": component.getReference("v.value"),
                        "childrenVisible": component.getReference("v.childrenVisible"),
                        "hasChildren": component.get("v.hasChildren"),
                        "rowIndex": component.get("v.rowIndex"),
                        "indexVar": component.get("v.indexVar"),
                        "isDirty": component.getReference("v.isDirty"),
                        "editCell": component.getReference("c.editCell"),
                        "handleEdit": component.getReference("c.handleEdit"),
                        "handleBlur": component.getReference("c.handleBlur"),
                        "childrenToggle": component.getReference("c.childrenToggle"),
                        "doInit": component.getReference("c.dynamicInit"),
                        "decorators": component.get("v.decorators")
                    },
                    function(cell, status, errorMessage) {
                        switch(status) {
                            case "SUCCESS":
                                body.push(cell);
                                component.set("v.body", body);
                                break;
                            case "INCOMPLETE":
                                console.log("No response from server or client is offline.");
                                break;
                            case "ERROR":
                                console.log("Error: " + errorMessage);
                                break;
                        }
                    }
                );
            }
            let headerEdit = component.find("cell" + rowIndex + cellIndex + "true");
            $A.util.toggleClass(headerEdit, "slds-hide");
        } else if(isHeaderComponent && editMode) {
            if(exists) {
                let headerEdit = component.find("cell" + rowIndex + cellIndex + "true");
                $A.util.toggleClass(headerEdit, "slds-hide");
            } else {
                $A.createComponent(
                    "c:HeaderCellEdit",
                    {
                        "aura:id": "cell" + rowIndex + cellIndex + editMode,
                        "column": component.get("v.column"),
                        "dataItem": component.getReference("v.dataItem"),
                        "value": component.getReference("v.value"),
                        "childrenVisible": component.getReference("v.childrenVisible"),
                        "hasChildren": component.get("v.hasChildren"),
                        "rowIndex": component.get("v.rowIndex"),
                        "indexVar": component.get("v.indexVar"),
                        "handleEdit": component.getReference("c.handleEdit"),
                        "handleBlur": component.getReference("c.handleBlur"),
                        "childrenToggle": component.getReference("c.childrenToggle"),
                        "doInit": component.getReference("c.dynamicInit"),
                        "editors": component.get("v.editors")
                    },
                    function(cell, status, errorMessage) {
                        switch(status) {
                            case "SUCCESS":
                                body.push(cell);
                                component.set("v.body", body);
                                break;
                            case "INCOMPLETE":
                                console.log("No response from server or client is offline.");
                                break;
                            case "ERROR":
                                console.log("Error: " + errorMessage);
                                break;
                        }
                    }
                );
            }
            let headerView = component.find("cell" + rowIndex + cellIndex + "false");
            $A.util.toggleClass(headerView, "slds-hide");
        } else if(!isHeaderComponent && !editMode) {
            if(exists) {
                let standardView = component.find("cell" + rowIndex + cellIndex + "false");
                $A.util.toggleClass(standardView, "slds-hide");
            } else {
                $A.createComponent(
                    "c:StandardCellView",
                    {
                        "aura:id": "cell" + rowIndex + cellIndex + editMode,
                        "column": component.getReference("v.column"),
                        "dataItem": component.getReference("v.dataItem"),
                        "value": component.getReference("v.value"),
                        "childrenVisible": component.getReference("v.childrenVisible"),
                        "rowIndex": component.get("v.rowIndex"),
                        "indexVar": component.get("v.indexVar"),
                        "editCell": component.getReference("c.editCell"),
                        "handleEdit": component.getReference("c.handleEdit"),
                        "handleBlur": component.getReference("c.handleBlur"),
                        "doInit": component.getReference("c.dynamicInit"),
                        "decorators": component.get("v.decorators")
                    },
                    function(cell, status, errorMessage) {
                        switch(status) {
                            case "SUCCESS":
                                body.push(cell);
                                component.set("v.body", body);
                                break;
                            case "INCOMPLETE":
                                console.log("No response from server or client is offline.");
                                break;
                            case "ERROR":
                                console.log("Error: " + errorMessage);
                                break;
                        }
                    }
                );
            }
            let standardEdit = component.find("cell" + rowIndex + cellIndex + "true");
            $A.util.toggleClass(standardEdit, "slds-hide");
        } else {
            if(exists) {
                let standardEdit = component.find("cell" + rowIndex + cellIndex + "true");
                $A.util.toggleClass(standardEdit, "slds-hide");
            } else {
                $A.createComponent(
                    "c:StandardCellEdit",
                    {
                        "aura:id": "cell" + rowIndex + cellIndex + editMode,
                        "column": component.getReference("v.column"),
                        "dataItem": component.getReference("v.dataItem"),
                        "value": component.getReference("v.value"),
                        "childrenVisible": component.getReference("v.childrenVisible"),
                        "rowIndex": component.get("v.rowIndex"),
                        "indexVar": component.get("v.indexVar"),
                        "handleEdit": component.getReference("c.handleEdit"),
                        "handleBlur": component.getReference("c.handleBlur"),
                        "doInit": component.getReference("c.dynamicInit"),
                        "editors": component.get("v.editors")
                    },
                    function(cell, status, errorMessage) {
                        switch(status) {
                            case "SUCCESS":
                                body.push(cell);
                                component.set("v.body", body);
                                break;
                            case "INCOMPLETE":
                                console.log("No response from server or client is offline.");
                                break;
                            case "ERROR":
                                console.log("Error: " + errorMessage);
                                break;
                        }
                    }
                );
            }
            let standardView = component.find("cell" + rowIndex + cellIndex + "false");
            $A.util.toggleClass(standardView, "slds-hide");
        }
    }
})