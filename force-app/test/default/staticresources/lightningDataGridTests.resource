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
                        expect(grid.get("v.data").length).toBe(300);
                        expect(grid.get("v.view").length).toBe(10);
                        expect(grid.find("rows").length).toBe(10);
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

        it('test childToggle', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    return $T.waitFor(function() {
                        var grid = component.find("exampleGrid");
                        return grid.get("v.view").length > 0;
                    }).then(function(){
                        var grid = component.find("exampleGrid");
                        var rows = grid.find("rows");
                        var cells = rows[0].find("cells");
                        var dataItem = cells[0].get("v.dataItem");
                        var childrenVisible = cells[0].get("v.childrenVisible");
                        cells[0].set("v.childrenVisible", !childrenVisible);
                        var cmpEvt = cells[0].getEvent("childToggle");
                        cmpEvt.setParams({
                            "childrenVisible": cells[0].get("v.childrenVisible"),
                            "dataItem": dataItem
                        });
                        cmpEvt.fire();

                        rows = grid.find("rows");
                        var subRow = rows[9];
                        expect(grid.get("v.hierarchy").length).toBe(101);
                        expect(rows[0].get("v.rowData").expanded).toBe(true);
                        expect(subRow.get("v.rowData").data.name).toBe("Sub Contact Name 0");
                        done();
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });
    });
});