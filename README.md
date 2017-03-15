# Lightning-Data-Grid
A data grid for Lightning Component Framework

Currently supports read-only hierarchies, and virtual scrolling. Early days, huge WIP. 

The Data Grid contains a toolbar component (currently just a placeholder), a header component (right now this just renders the column names, in the future it can contain filtering/column menus), a row component, and a cell component.

The Data Grid currently has a pretty simple API, it expects a config javascript object, and a data javascript object. 

The config should look like:

{
  columns: [
      {
          name: "columnName that matches the name of the dataField",
          label: "Label string that is displayed for the column header"
      }
  ],
  rowsDisplayed: *Integer*
}

The columns portion of the config object is your columns Model, and the rowsDisplayed controls how many rows are displayed at one time. 

The data object currently takes the following shape:

{
    data: {
        id: "dataId",
        name: "dataName"
        etc . . . These keys should match your column names, and is how the data in the row will get displayed
    },
    parent: null,
    hasChildren: false,
    expanded: false,
    children: null
}

Right now I am trying to keep the actual record data seperate from some of the row properties needed for displaying hierarchies and such. This way you only have to extract the data object out of the row data, instead of doing a bunch of property deleting, which is always fun.
Explanation of other properties:

parent: id of the parent row for a child row. In the future, I would like to be able to determine this via configuration, and specify a parent field within the data object.
hasChildren: This is set by a method in the grid, but needs to exist on the javascript object. Hopefully this can be excluded at some point. Currently used by the grid to determine whether the chevron should be displayed.
expanded: Again, set by grid, but currently needs to exist in the data set in the grid. Used to persist whether a row is expanded as a user scrolls.
children: Same situation as above. Would like for these to not have to be included initally, but trying to dynamically add them doesn't appear to work (at least the way I was trying). This holds the rows children as an array for easy iteration when the chevron is clicked.

Look at DataGridImpl component for an example of all of this being setup.

Lots of things to add. Configuration for toolbar. Search. Editors and decorators for cells.
