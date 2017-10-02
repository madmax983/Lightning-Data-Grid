({
    dataGridInit: function(component, event, helper) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var lodashLoaded = component.get("v.lodashLoaded");

        if(lodashLoaded) {
            if(config.tree === true) {
                helper.treeInit(component);
            } else {
                helper.gridInit(component);
            }
        } else {
            component.set("v.initFired", true)
        }
    },
    lodashLoaded: function(component) {
        component.set("v.lodashLoaded", true);
        var initFired = component.get("v.initFired");
        if(initFired) {
            component.init();
        }
    },
    bindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var table = component.find("table");
        if (scrollable) {
            table.getElement().addEventListener(
                "wheel",
                component.mouseWheelHandler,
                false
            );
        }
    },
    unbindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var table = component.find("table");
        if (scrollable) {
            table.getElement().removeEventListener("wheel", component.mouseWheelHandler);
        }
    },
    handleChildToggle: function(component, event, helper) {
        window.requestAnimationFrame($A.getCallback(function() {
            if(component.isValid()) {
                var hierarchy = component.get("v.hierarchy");
                var row = event.getSource();
                var rowIndex = row.get("v.rowIndex");
                var rowData = row.get("v.dataItem");
                var displaySize = component.get("v.config.rowsDisplayed")
                    ? component.get("v.config.rowsDisplayed")
                    : 20;
                var newOffSetData;
                var offSetIndex = component.get("v.offSetIndex");
                var rangeStart = offSetIndex - displaySize;

                if(!rowData.expanded) {
                    rowData.expanded = true;
                    for(var i = 0, len = rowData.children.length; i < len; i++) {
                        var idx = rowIndex + i + rangeStart + 1;
                        hierarchy.splice(idx, 0, rowData.children[i]);
                    }
                    component.set("v.hierarchy", hierarchy);
                    var newOffSetData = hierarchy.slice(rangeStart, offSetIndex);
                    helper.setHasChildren(newOffSetData, component.mChildren);
                    component.set("v.view", newOffSetData);
                } else {
                    rowData.expanded = false;
                    var totalExpandedDepth = helper.findExpandedDepth(0, rowData);
                    hierarchy.splice(rowIndex + rangeStart + 1, totalExpandedDepth);
                    component.set("v.hierarchy", hierarchy);
                    newOffSetData = hierarchy.slice(rangeStart, offSetIndex);
                    if (rangeStart > 0) {
                        helper.setHasChildren(newOffSetData, component.mChildren);
                        component.set("v.view", newOffSetData);
                    } else {
                        component.set("v.view", newOffSetData);
                    }
                }
            }

        }));
    },
    handleViewMutation: function(component, event, helper) {
        var values = event.getParam("values");
        component.set("v.hierarchy", values);
        helper.updateView(component, values);
    },
    getAttribute: function(component, event) {
        var callback = event.getParam("callback");
        var attributeName = event.getParam("attributeName");
        var source = event.getSource();
        if(typeof source[callback] == "function") {
            source[callback](component.get(attributeName));
        }
    }
});
