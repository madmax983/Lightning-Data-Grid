({
    chunks: {},
    getRootNodes: function(data) {
        function process(chunk, index) {
            return new Promise($A.getCallback(function(resolve, reject) {
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
            }));
        }

        var promiseChunks = [];

        if(data.length > 1000) {
            this.chunks = _.chunk(data, data.length/10);
            _.forEach(this.chunks, function(chunk, index) {
                promiseChunks.push(process(chunk, index));
            });
        } else {
            promiseChunks.push(new Promise($A.getCallback(function(resolve, reject) {
                var roots = [];
                _.forEach(chunk, function(item) {
                    if(item.parent === null) {
                        item.level = 0;
                        roots.push(item);
                    }
                });
                resolve(roots);
            })));
        }

        return promiseChunks;
    },
    getChildrenMap: function(data) {
        function process(chunk, index) {
            return new Promise($A.getCallback(function(resolve, reject) {
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
                console.log('doing expensive map work' + index);
                resolve(mChildren);
            }));
        }

        var promiseChunks = [];

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