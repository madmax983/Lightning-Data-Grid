({
    doInit: function(component, event) {
        var rowData = component.get("v.rowData");
        component.set("v.childrenVisible", rowData.expanded);
    }
})