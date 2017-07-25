({
    afterRender: function(component) {
        this.superAfterRender();
        var input = component.get("v.body")[0];
        if(input && input.focus) {
            input.focus();
        }
    }
})