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

        it('has a toolbar', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    var grid = component.find("exampleGrid");
                    var toolbar = grid.find("toolbar");
                    expect(toolbar).toBeTruthy();
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has headers', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    var grid = component.find("exampleGrid");
                    var headers = grid.find("headers");
                    expect(headers).toBeTruthy();
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('offsets the view', function(done) {
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

        it('handles mouse wheel events', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {}, renderInto)
                .then(function(component) {
                    return $T.waitFor(function() {
                        var grid = component.find("exampleGrid");
                        return grid.get("v.view").length > 0;
                    }).then(function(){
                        var grid = component.find("exampleGrid");
                        var table = grid.find("table");
                        var mouseEnter = new MouseEvent("mouseenter");
                        table.getElement().dispatchEvent(mouseEnter);
                        expect(typeof grid.mouseWheelHandler).toBe("function");
                        //LockerService isn't currently exposing the WheelEvent as a CTOR. Workaround for now.
                        var wheelDown = new CustomEvent("wheel");
                        wheelDown.wheelDeltaY = -1;
                        table.getElement().dispatchEvent(wheelDown);
                        return $T.waitFor(function() {
                            var grid = component.find("exampleGrid");
                            return grid.get("v.offSetIndex") === 11;
                        }).then(function() {
                            expect(grid.get("v.offSetIndex")).toBe(11);
                            expect(grid.get("v.view")[0].data.name).toBe("Contact Name 1");
                            var wheelUp = new CustomEvent("wheel");
                            wheelUp.wheelDeltaY = 1;
                            table.getElement().dispatchEvent(wheelUp);
                            return $T.waitFor(function() {
                                var grid = component.find("exampleGrid");
                                return grid.get("v.offSetIndex") === 10;
                            }).then(function() {
                                expect(grid.get("v.offSetIndex")).toBe(10);
                                expect(grid.get("v.view")[0].data.name).toBe("Contact Name 0");
                                var mouseLeave = new MouseEvent("mouseleave");
                                table.getElement().dispatchEvent(mouseLeave);
                                done();
                            });
                        });
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('handles the child toggle', function(done) {
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
                        cells[0].toggleChildren();

                        return $T.waitFor(function() {
                            var grid = component.find("exampleGrid");
                            return grid.get("v.hierarchy").length > 100;
                        }).then(function() {
                            rows = grid.find("rows");
                            var subRow = rows[9];
                            expect(grid.get("v.hierarchy").length).toBe(101);
                            expect(rows[0].get("v.rowData").expanded).toBe(true);
                            expect(subRow.get("v.rowData").data.name).toBe("Sub Contact Name 0");

                            var subCells = subRow.find("cells");
                            subCells[0].toggleChildren();

                            return $T.waitFor(function() {
                                var grid = component.find("exampleGrid");
                                return grid.get("v.hierarchy").length > 101;
                            }).then(function() {
                                rows = grid.find("rows");
                                var subSubRow = rows[9];
                                expect(grid.get("v.hierarchy").length).toBe(102);
                                expect(rows[8].get("v.rowData").expanded).toBe(true);
                                expect(subSubRow.get("v.rowData").parent).toBe("Id-Sub-00");

                                cells[0].toggleChildren();

                                return $T.waitFor(function() {
                                    var grid = component.find("exampleGrid");
                                    return grid.get("v.hierarchy").length == 100;
                                }).then(function() {

                                    expect(grid.get("v.hierarchy").length).toBe(100);
                                    expect(rows[0].get("v.rowData").expanded).toBe(false);

                                    done();
                                });
                            });
                        });
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('handles a cell edit', function(done) {
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

                        var cellEle = document.getElementById("ltng-grid-col-name-row-0-clickable");
                        var dblClickEvent = new MouseEvent('dblclick');
                        cellEle.dispatchEvent(dblClickEvent);
                        expect(cells[0].get("v.editMode")).toBe(true);
                        var editor = cells[0].get("v.editors")[0];
                        editor.set("v.value", "Peter Venkman");
                        cells[0].editCell();
                        expect(cells[0].get("v.editMode")).toBe(false);
                        expect(grid.get("v.data")[0].data.name).toBe("Peter Venkman");
                        done();
                    });
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('handles larger volume', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {"dataSize": 1000}, renderInto)
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

        it('renders a grid instead of a tree', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:DataGridImpl", {"type": "grid"}, renderInto)
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
    });
});