({
    columnChange: function(component) {
        var value = component.get("v.value");
        var column = component.get("v.column");
        if(value && column) {
            var outputComponent = "";

            switch(column.type) {
                case "date":
                    outputComponent = "ui:outputDate";
                    break;
                case "datetime":
                    outputComponent = "ui:outputDateTime ";
                    break;
                case "phone":
                    outputComponent = "ui:outputPhone";
                    break;
                case "email":
                    outputComponent = "ui:outputEmail";
                    break;
                case "number":
                    outputComponent = "ui:outputNumber";
                    break;
                case "currency":
                    outputComponent = "ui:outputCurrency";
                    break;
                default:
                    outputComponent = "ui:outputText";
            }

            $A.createComponent(outputComponent, {
                "value": value
            }, function(output, status, error) {
                if (status === "SUCCESS") {
                    component.set("v.body", output);
                } else if (status === "INCOMPLETE") {
                    $A.reportError("No response from server or client is offline.")
                } else if (status === "ERROR") {
                    $A.reportError(error);
                }
            });
        }
    }
})