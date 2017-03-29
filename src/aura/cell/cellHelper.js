({
    provideValueToFacets: function(value, facets) {
        for(var i = 0; i < facets.length; i++) {
            if(facets[i][0]) {
                if(facets[i][0].isInstanceOf("c:cellFacet")) {
                    console.log('yayayaya');
                    facets[i][0].set("v.value", value);
                    return;
                }
                var facet = facets[i][0].get("v.value");
                this.provideValueToFacets(value, facet);
            }
        }
    },
    handleEdit: function(component, event) {
        component.set("v.editMode", false);
        var editor = component.get("v.editors");
        var currentValue = component.get("v.value");
        var newCellValue = editor[0].get("v.value");

        if(currentValue != newCellValue) {
            component.set("v.value", newCellValue);

            var cell = component.find("cell");
            $A.util.addClass(cell, "slds-is-edited");
        }
    },
    syncFacets: function(component) {
        var value = component.get("v.value");
        var decorators = component.get("v.decorators");
        if(decorators.length > 0) {
            decorators[0].set("v.value", value);
            decorators[0].set("v.column", component.get("v.column"));
        }

        var editors = component.get("v.editors");
        if(editors.length > 0) {
            editors[0].set("v.value", value);
            editors[0].set("v.column", component.get("v.column"));
        }
    }
})
