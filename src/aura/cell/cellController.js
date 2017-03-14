({
    doInit: function(component) {
        var dataItem = component.get("v.dataItem");
        var columnName = component.get("v.columnName");
        component.set("v.value", dataItem[columnName]);
        if(dataItem.hasChildren) {
            component.set("v.hasChildren", dataItem.hasChildren);
        }
    },
    childrenToggle: function (component, event) {
        var dataItem = component.get("v.dataItem");
        console.log(dataItem);
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
