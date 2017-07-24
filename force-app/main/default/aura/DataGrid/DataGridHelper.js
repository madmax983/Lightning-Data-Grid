({
    chunks: {},
    treeInit: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var data = component.get("v.data"),
            offSetIndex = component.get("v.offSetIndex"),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 20,
            self = this;

        var promises = self.getRootNodes(data);

        Promise.all(promises).then(function(response) {
            var parents = [].concat.apply([], response);
            var childrenPromises = self.getChildrenMap(data);
            Promise.all(childrenPromises).then(function(values) {
                component.mChildren = new Map();
                _.forEach(values, function(value) {
                    var valueArray = value.entries();
                    var mChildren = component.mChildren.entries();
                    component.mChildren = new Map([...component.mChildren, ...value]);
                });

                var offSetData = parents.slice(offSetIndex, displaySize);
                self.setHasChildren(offSetData, component.mChildren);

                self.toggleSpinner(component);
                component.set("v.hierarchy", parents);
                component.set("v.view", offSetData);
                component.set("v.offSetIndex", displaySize);

                if(scrollable) {
                    component.mouseWheelHandler = self.mouseWheelHandler("v.hierarchy", component);
                }
            });
        });
    },
    gridInit: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var data = component.get("v.data"),
            offSetIndex = component.get("v.offSetIndex"),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 20;

        this.toggleSpinner(component);
        var offSetData = data.slice(offSetIndex, displaySize);
        component.set("v.view", offSetData);
        component.set("v.offSetIndex", displaySize);

        if(scrollable) {
            component.mouseWheelHandler = this.mouseWheelHandler("v.data", component);
        }
    },
    mouseWheelHandler: function(attribute, component) {
        var scrolling;
        var self = this;
        var offSetIndex = component.get("v.offSetIndex"),
            displaySize = component.get("v.config.rowsDisplayed"),
            tree = component.get("v.config.tree"),
            newOffSet,
            rangeStart,
            newOffSetData;
        return function(e) {
            clearTimeout(scrolling);
            var data = component.get(attribute);
            var table = component.find("table");
            $A.util.addClass(table, "scrolling");
            if (e.wheelDeltaY < 0) {
                e.preventDefault();

                newOffSet = (component.get("v.offSetIndex") + 1) > data.length ? data.length : component.get("v.offSetIndex") + 1;
                rangeStart = newOffSet - displaySize;
                newOffSetData = data.slice(rangeStart, newOffSet);
                var resetSize = newOffSetData.length - displaySize;
                newOffSetData.splice(-1, resetSize);
                if(tree) {
                    self.setHasChildren(newOffSetData, component.mChildren);
                }
                component.set("v.view", newOffSetData);
                component.set("v.offSetIndex", newOffSet);

                scrolling = setTimeout($A.getCallback(function() {
                    scrolling = undefined;
                    $A.util.removeClass(table, "scrolling");
                }, true), 150);
            } else if (e.wheelDeltaY > 0) {
                e.preventDefault();
                newOffSet = ((component.get("v.offSetIndex") - 1 - displaySize) <= 0) ? displaySize : component.get("v.offSetIndex") - 1;
                rangeStart = newOffSet - displaySize;
                newOffSetData = data.slice(rangeStart, newOffSet);
                if(tree) {
                    self.setHasChildren(newOffSetData, component.mChildren);
                }
                component.set("v.view", newOffSetData);
                component.set("v.offSetIndex", newOffSet);

                scrolling = setTimeout($A.getCallback(function() {
                    scrolling = undefined;
                    $A.util.removeClass(table, "scrolling");
                }, true), 150);
            }
        }
    },
    getRootNodes: function(data) {
        function process(chunk, index) {
            return new Promise($A.getCallback(function(resolve, reject) {
                try {
                    if(_.isUndefined(chunk)) {
                        reject();
                    }
                    var roots = [];
                    _.forEach(chunk, function(item) {
                        if(item.parent === null) {
                            item.level = 0;
                            roots.push(item);
                        }
                    });
                    resolve(roots);
                } catch(e) {
                    reject(e);
                }

            }));
        }

        var promiseChunks = [];

        try {
            if(data.length > 1000) {
                this.chunks = _.chunk(data, data.length/10);
                _.forEach(this.chunks, function(chunk, index) {
                    promiseChunks.push(process(chunk, index));
                });
            } else {
                promiseChunks.push(new Promise($A.getCallback(function(resolve, reject) {
                    var roots = [];
                    _.forEach(data, function(item) {
                        if(item.parent === null) {
                            item.level = 0;
                            roots.push(item);
                        }
                    });
                    resolve(roots);
                })));
            }
        } catch(e) {
            $A.reportError(e);
        }

        return promiseChunks;
    },
    findExpandedDepth: function(totalSize, data) {
        totalSize += data.children.length;
        for(var i = 0, len = data.children.length; i < len; i++) {
            if(data.children[i].expanded) {
                data.children[i].expanded = false;
                totalSize = this.findExpandedDepth(totalSize, data.children[i]);
            }
        }
        return totalSize;
    },
    getChildrenMap: function(data) {
        function process(chunk, index) {
            return new Promise($A.getCallback(function(resolve, reject) {
                try {
                    if(_.isUndefined(chunk)) {
                        reject();
                    }
                    var mChildren= new Map();
                    _.forEach(chunk, function(item) {
                        if(item.parent != null) {
                            var childArray = mChildren.get(item.parent);
                            if(!childArray){
                                childArray = [];
                            }
                            childArray.push(item);
                            mChildren.set(item.parent, childArray);
                        }
                    });
                    resolve(mChildren);
                } catch(e) {
                    reject(e);
                }
            }));
        }

        var promiseChunks = [];

        try {
            if(data.length > 1000) {
                _.forEach(this.chunks, function(chunk, index) {
                    promiseChunks.push(process(chunk, index));
                });
            } else {
                promiseChunks.push(new Promise($A.getCallback(function(resolve, reject) {
                    var mChildren= new Map();
                    _.forEach(data, function(item) {
                        if(item.parent != null) {
                            var childArray = mChildren.get(item.parent);
                            if(!childArray){
                                childArray = [];
                            }
                            childArray.push(item);
                            mChildren.set(item.parent, childArray);
                        }
                    });
                    resolve(mChildren);
                })));
            }
        } catch(e) {
            $A.reportError(e);
        }
        return promiseChunks;
    },
    setHasChildren: function(data, mChildren) {
        var len = data.length;
        for(var i = 0; i < len; i++) {
            if(mChildren.has(data[i].data.id)) {
                data[i].hasChildren = true;
                var childArray = mChildren.get(data[i].data.id);
                for(var j = 0, childLen = childArray.length; j < childLen; j++) {
                    childArray[j].level = data[i].level + 1;
                    this.setHasChildren(childArray, mChildren);
                }
                data[i].children = childArray;
            } else {
                data[i].hasChildren = false;
            }
        }
    },
    toggleSpinner: function (component) {
        var spinner = component.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide");
    }
})