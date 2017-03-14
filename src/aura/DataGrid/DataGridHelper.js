({
    getRootNodes: function(data) {
        var rootNodes = [];
        for(var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            if(dataItem.parent === null) {
                rootNodes.push(dataItem);
            }
        }
        return rootNodes;
    },
    getChildrenMap: function(data) {
        var mChildren= new Map();
        for(var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            if(dataItem.parent != null) {
                var childArray = mChildren.get(dataItem.parent);
                if(!childArray){
                    childArray = [];
                }
                childArray.push(dataItem)
                mChildren.set(dataItem.parent, childArray);
            }
        }
        return mChildren;
    },
    setHasChildren: function(data, mChildren) {
        for(var i = 0; i < data.length; i++) {
            if(mChildren.has(data[i].id)) {
                data[i].hasChildren = true;
                data[i].children = mChildren.get(data[i].id);
                for(var j = 0; j < data[i].children.length; j++) {
                    this.setHasChildren(data[i].children, mChildren);
                }
            } else {
                data[i].hasChildren = false;
            }
        }
    }
})
