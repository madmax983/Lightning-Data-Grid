({
    handleSearch: function(component, event, helper) {
        var getHierarchy = component.getEvent("getAttribute");
        getHierarchy.setParams({
            attributeName: "v.data",
            callback: "setHierarchy"
        });
        getHierarchy.fire();
    },

    setHierarchy: function(component, event) {
        var params = event.getParam("arguments")[0];
        var query = component.get("v.query");
        var matches = [];
        _.forEach(params, function(item){
            _.forIn(item.data, function(value, key) {
                if(value && value.match && value.toLowerCase().match(query.toLowerCase())) {
                    //if(item.parent === null) {
                        matches.push(item);
                        return false;
                    //}
                }
            });
        });
        var evt = component.getEvent("viewMutation");
        evt.setParams({
            type: "search",
            values: matches
        });
        evt.fire();
    }
})