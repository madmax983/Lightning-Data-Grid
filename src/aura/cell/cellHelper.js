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
    }
})
