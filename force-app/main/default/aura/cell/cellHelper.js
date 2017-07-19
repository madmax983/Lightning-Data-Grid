({
    editCell: function(component) {
        component.set("v.editMode", true);
    },
    handleEdit: function(component, event) {
        component.set("v.editMode", false);
        var editor = component.get("v.editors");
        var currentValue = component.get("v.value");
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
    },
    syncFacets: function(component) {
        var value = component.get("v.value");
        var decorators = component.get("v.decorators");
        if(decorators.length > 0) {
            decorators[0].set("v.value", value);
            decorators[0].set("v.column", component.get("v.column"));
        }

        var editors = component.get("v.editors");
        if(editors.length > 0) {
            editors[0].set("v.value", value);
            editors[0].set("v.column", component.get("v.column"));
        }
    }
})