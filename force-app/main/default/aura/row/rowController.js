({
    doInit: function(component, event) {
        var rowData = component.get("v.rowData");
        component.set("v.childrenVisible", rowData.expanded);
    },

    handleChildToggle: function(component, event) {
        // var rowData = component.get("v.rowData");
        // var childrenVisible = event.getParam("childrenVisible");
        // component.set("v.childrenVisible", childrenVisible);
        // rowData.expanded = childrenVisible;
        //event.stopPropagation();
    }
})