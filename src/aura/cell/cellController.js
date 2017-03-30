({
    doInit: function(component, event, helper) {
        var dataItem = component.get("v.dataItem");
        var columnName = component.get("v.column").name;
        var value = dataItem.data[columnName];
        component.set("v.value", value);

        var isDirty = dataItem[columnName] ? dataItem[columnName].isDirty : false;
        component.set("v.isDirty", isDirty);
        if(dataItem.hasChildren) {
            component.set("v.hasChildren", dataItem.hasChildren);
        }

        helper.syncFacets(component)
    },
    childrenToggle: function(component) {
        var dataItem = component.get("v.dataItem");
        var childrenVisible = component.get("v.childrenVisible");
        component.set("v.childrenVisible", !childrenVisible);
        var cmpEvt = component.getEvent("childToggle");
        cmpEvt.setParams({
            "childrenVisible": component.get("v.childrenVisible"),
            "dataItem": dataItem
        });
        cmpEvt.fire();
    },
    editCell: function(component) {
        component.set("v.editMode", true);
    },
    handleValueChange: function(component, event, helper) {
        helper.syncFacets(component)
    },
    handleBlur: function(component, event, helper) {
        helper.handleEdit(component, event);
    },
    handleKeyPress: function(component, event, helper) {
        if(event.keyCode == 13) {
            helper.handleEdit(component, event)
        }
    }
})
