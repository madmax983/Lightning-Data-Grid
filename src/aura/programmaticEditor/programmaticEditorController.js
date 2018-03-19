({
    columnChange: function(component) {
        var value = component.getReference("v.value");
        var column = component.get("v.column");
        if(value && column)
            var inputType = "";

        switch(column.type) {
            case "date":
                inputType = "date";
                break;
            case "datetime":
                inputType = "datetime-local";
                break;
            case "phone":
                inputType = "tel";
                break;
            case "email":
                inputType = "email";
                break;
            case "number":
                inputType = "number";
                break;
            case "currency":
                inputType = "number";
                break;
            default:
                inputType = "text";
        }

        $A.createComponent("lightning:input", {
            "type": inputType,
            "label": column.name,
            "name": column.name,
            "aura:id": "input",
            "value": value
        }, function(input, status, error) {
            if (status === "SUCCESS") {
                component.set("v.body", input);
            } else if (status === "INCOMPLETE") {
                $A.reportError("No response from server or client is offline.")
            } else if (status === "ERROR") {
                $A.reportError(error);
            }
        });
    }
})