({
    doInit: function(component, event) {
        var rowData = component.get("v.rowData");
        component.set("v.childrenVisible", rowData.expanded);
    },
    childrenToggle: function(component) {
        var cells = component.find("cells");
        cells[0].toggleChildren();
    }
})