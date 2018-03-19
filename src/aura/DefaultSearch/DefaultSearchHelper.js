({
    findRoot: function(data, parent) {
        var self = this;
        _.find(data, function(o) {
            if(o.parent === null) {
                return o.data.id === parent;
            } else {
                this.findRoot(data, o.parent);
            }
        })
    }
})