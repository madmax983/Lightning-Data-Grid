({
    chunks: {},
    initWheelPolyfill: function() {
        // https://gist.github.com/asemler/f914c7a5fb115f0574ef
        // creates a global "addWheelListener" method
        // example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
        (function(window,document) {

            var prefix = "", _addEventListener, support;

            // detect event model
            if ( window.addEventListener ) {
                _addEventListener = "addEventListener";
            } else {
                _addEventListener = "attachEvent";
                prefix = "on";
            }

            // detect available wheel event
            support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

            window.addWheelListener = function( elem, callback, useCapture ) {
                _addWheelListener( elem, support, callback, useCapture );

                // handle MozMousePixelScroll in older Firefox
                if( support == "DOMMouseScroll" ) {
                    _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
                }
            };

            function _addWheelListener( elem, eventName, callback, useCapture ) {
                elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
                    !originalEvent && ( originalEvent = window.event );

                    // create a normalized event object
                    var event = {
                        // keep a ref to the original event object
                        originalEvent: originalEvent,
                        target: originalEvent.target || originalEvent.srcElement,
                        type: "wheel",
                        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function() {
                            originalEvent.preventDefault ?
                                originalEvent.preventDefault() :
                                originalEvent.returnValue = false;
                        }
                    };

                    // calculate deltaY (and deltaX) according to the event
                    if ( support == "mousewheel" ) {
                        event.deltaY = - 1/40 * originalEvent.wheelDelta;
                        // Webkit also support wheelDeltaX
                        originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
                    } else {
                        event.deltaY = originalEvent.detail;
                    }

                    // it's time to fire the callback
                    return callback( event );

                }, useCapture || false );
            }

        })(window,document);
    },
    treeInit: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var data = component.get("v.data"),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 20,
            offSetIndex = component.get("v.offSetIndex") ? component.get("v.offSetIndex") : displaySize,
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
                var rangeStart = offSetIndex - displaySize;
                var offSetData = parents.slice(rangeStart, offSetIndex);
                self.setHasChildren(offSetData, component.mChildren);

                self.toggleSpinner(component);
                component.set("v.hierarchy", parents);
                component.set("v.view", offSetData);
                component.set("v.offSetIndex", rangeStart + displaySize);
            });
        });
        if(scrollable) {
            component.mouseWheelHandler = self.mouseWheelHandler("v.hierarchy", component);
        }
    },
    gridInit: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        var data = component.get("v.data"),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 20,
            offSetIndex = component.get("v.offSetIndex") ? component.get("v.offSetIndex") : displaySize;

        this.toggleSpinner(component);
        var rangeStart = offSetIndex - displaySize;
        var offSetData = data.slice(rangeStart, offSetIndex);
        component.set("v.hierarchy", data);
        component.set("v.view", offSetData);
        component.set("v.offSetIndex", rangeStart + displaySize);

        if(scrollable) {
            component.mouseWheelHandler = this.mouseWheelHandler("v.hierarchy", component);
        }
    },
    mouseWheelHandler: function(attribute, component) {
        var scrolling;
        var ticking = false;
        var scrollingTracker = 0;
        var self = this;
        var offSetIndex = component.get("v.offSetIndex"),
            displaySize = component.get("v.config.rowsDisplayed"),
            tree = component.get("v.config.tree"),
            newOffSet,
            rangeStart,
            newOffSetData;
        return function(e) {
            if(e.deltaY != -0) {
                e.preventDefault();
                e.stopImmediatePropagation();
                if(!ticking) {
                    window.requestAnimationFrame($A.getCallback(function() {
                        if(component.isValid()) {
                            clearTimeout(scrolling);
                            var data = component.get(attribute);
                            var table = component.find("table");
                            $A.util.addClass(table, "scrolling");
                            ticking = false;
                            if (e.deltaY > 0) {
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
                                    scrollingTracker = 0;
                                }, true), 150);
                            } else if (e.deltaY < 0) {
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
                                    scrollingTracker = 0;
                                }, true), 150);
                            }
                        }
                    }));
                }
                ticking = true;
            }
        }
    },
    updateView: function(component) {
        var view = component.get("v.view");
        var hierarchy = component.get("v.hierarchy");
        var tree = tree = component.get("v.config.tree");
        var displaySize = component.get("v.config.rowsDisplayed");
        var newData = hierarchy.slice(0, displaySize);
        var self = this;

        if(!_.isEqual(component._lastSearch, newData)) {
            component._lastSearch = _.cloneDeep(newData);
            if(tree) {
                var promises = self.getRootNodes(hierarchy);

                Promise.all(promises).then(function(response) {
                    var parents = [].concat.apply([], response);
                    if(parents.length > 0) {
                        var offSetData = parents.slice(0, displaySize);
                        self.setHasChildren(offSetData, component.mChildren);
                        component.set("v.hierarchy", parents);
                        component.set("v.view", offSetData);
                        component.set("v.offSetIndex", displaySize);
                    } else {
                        var offSetData = hierarchy.slice(0, displaySize);
                        self.setHasChildren(offSetData, component.mChildren);

                        component.set("v.hierarchy", hierarchy);
                        component.set("v.view", offSetData);
                        component.set("v.offSetIndex", displaySize);
                    }
                });
            } else {
                component.set("v.view", newData);
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