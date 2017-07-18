describe("Grid Tests", function() {
    afterEach(function() {
        // Each spec (test) renders its components into the same div,
        // so we need to clear that div out at the end of each spec.
        $T.clearRenderedTestComponents();
    });

    describe('Test Lightning-Data-Grid', function(){

        it('renders the Data Grid', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    expect(component.isRendered()).toBe(true);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('Offsets the view', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    return $T.waitFor(function() {
                        var grid = component.find("exampleGrid");
                        return grid.get("v.view").length > 0;
                    }).then(function(){
                        var grid = component.find("exampleGrid");
                        expect(grid.get("v.view").length).toBe(10);
                        done();
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('binds the mouse wheel handler', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    return $T.waitFor(function() {
                        var grid = component.find("exampleGrid");
                        return grid.get("v.view").length > 0;
                    }).then(function(){
                        var grid = component.find("exampleGrid");
                        expect(typeof grid.mouseWheelHandler).toBe("function");
                        done();
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });
    });
});