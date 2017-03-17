({
    doInit: function(component, event, helper) {
        var dataItem = component.get("v.dataItem");
        var columnName = component.get("v.column").name;
        var value = dataItem.data[columnName];
        component.set("v.value", value);
        if(dataItem.hasChildren) {
            component.set("v.hasChildren", dataItem.hasChildren);
        }

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
    }
})
