({
    afterRender: function(component) {
        this.superAfterRender();
        var input = component.find("input");
        if(input && input.focus) {
            input.focus();
        }
    }
})