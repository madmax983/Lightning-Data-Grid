({
    handleChildToggle: function(component, event) {
        component.set("v.childrenVisible", event.getParam("childrenVisible"));
        event.stopPropagation();
        /*if(event.getParam("childrenVisible")) {
            var rowData = component.get("v.rowData");
            var level = component.get("v.level");
            var childRowComponents = [];
            var columns = component.get("v.columns");
            for(var i = 0; i < rowData.children.length; i++) {
                var childRowComponent = [],
                    attributes = {};
                attributes.rowData = rowData.children[i];
                attributes.columns = columns;
                attributes.level = level + 1;
                childRowComponent.push("c:row");
                childRowComponent.push(attributes);

                childRowComponents.push(childRowComponent);
            }
            $A.createComponents(
                childRowComponents,
                function(components, status, errorMessage){
                    if (status === "SUCCESS") {
                        component.set("v.body", components);
                        console.log(component.get("v.body"));
                    }
                    else if (status === "INCOMPLETE") {
                        console.log("No response from server or client is offline.")
                        // Show offline error
                    }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        // Show error message
                    }
                }
            )
        } else {
            component.set("v.body", []);
        }*/
    }
})
