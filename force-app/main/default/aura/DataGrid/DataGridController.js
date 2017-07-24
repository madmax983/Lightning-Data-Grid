({
    lodashLoaded: function(component) {
        component.set("v.lodashLoaded", true);
        var initFired = component.get("v.initFired");
        if(initFired) {
            component.init();
        }
    },
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
    bindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        if (scrollable) {
            document.addEventListener(
                "wheel",
                component.mouseWheelHandler,
                false
            );
        }
    },
    unbindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        if (scrollable) {
            document.removeEventListener("wheel", component.mouseWheelHandler);
        }
    },
    handleChildToggle: function(component, event, helper) {
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
    },

    loadMore: function(component, event, helper) {
        var data = component.get("v.data");
        var mChildren = helper.getChildrenMap(data),
            parents = helper.getRootNodes(data),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 10;

        displaySize += 10;
        component.set("v.config.rowsDisplayed", displaySize);
        var offSetData = parents.slice(0, displaySize);
        helper.setHasChildren(offSetData, component.mChildren);
        component.set("v.view", offSetData);
    }
});
