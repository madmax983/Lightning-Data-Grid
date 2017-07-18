({
    dataGridInit: function(component, event, helper) {
        if(_){
            var data = component.get("v.data"),
                offSetIndex = component.get("v.offSetIndex"),
                displaySize = component.get("v.config.rowsDisplayed")
                    ? component.get("v.config.rowsDisplayed")
                    : 20,
                newOffSet,
                rangeStart,
                newOffSetData;

            if(data) {
                var promises = helper.getRootNodes(data);

                Promise.all(promises).then(function(response) {
                    var parents = [].concat.apply([], response);
                    var childrenPromises = helper.getChildrenMap(data);
                    Promise.all(childrenPromises).then(function(values) {
                        component.mChildren = new Map();
                        _.forEach(values, function(value) {
                            var valueArray = value.entries();
                            var mChildren = component.mChildren.entries();
                            component.mChildren = new Map([...component.mChildren, ...value]);
                        });

                        var offSetData = parents.slice(offSetIndex, displaySize);
                        helper.setHasChildren(offSetData, component.mChildren);

                        helper.toggleSpinner(component);
                        component.set("v.hierarchy", parents);
                        component.set("v.view", offSetData);
                        component.set("v.offSetIndex", displaySize);

                        component.mouseWheelHandler = function(e) {
                            parents = component.get("v.hierarchy");
                            if (e.wheelDeltaY < 0) {
                                e.preventDefault();

                                newOffSet = (component.get("v.offSetIndex") + 1) > parents.length ? parents.length : component.get("v.offSetIndex") + 1;
                                rangeStart = newOffSet - displaySize;
                                newOffSetData = parents.slice(rangeStart, newOffSet);
                                var resetSize = newOffSetData.length - displaySize;
                                newOffSetData.splice(-1, resetSize);
                                helper.setHasChildren(newOffSetData, component.mChildren);
                                component.set("v.view", newOffSetData);
                                component.set("v.offSetIndex", newOffSet);
                            } else if (e.wheelDeltaY > 0) {
                                e.preventDefault();
                                newOffSet = ((component.get("v.offSetIndex") - 1 - displaySize) <= 0) ? displaySize : component.get("v.offSetIndex") - 1;
                                rangeStart = newOffSet - displaySize;
                                newOffSetData = parents.slice(rangeStart, newOffSet);
                                helper.setHasChildren(newOffSetData, component.mChildren);
                                component.set("v.view", newOffSetData);
                                component.set("v.offSetIndex", newOffSet);
                            }
                        };
                    });
                });
            }
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
        debugger;
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
            hierarchy.splice(rowIndex + rangeStart + 1, rowData.children.length)
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
    },
    handleMessage: function(component, event, helper) {
        debugger;
    },
    handleError: function(component, event, helper) {
        debugger;
    }
});
