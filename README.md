# Lightning-Data-Grid  
A data grid for Lightning Component Framework  

Currently supports read-only hierarchies, and virtual scrolling. Early days, huge WIP.  

The Data Grid contains a toolbar component (currently just a placeholder), a header component (right now this just renders the column names, in the future it can contain filtering/column menus), a row component, and a cell component.  

The Data Grid currently has a pretty simple API, it expects a config javascript object, and a data javascript object.   

The config should look like:  
<code>
<pre>
{
  columns: [
      {
          name: "columnName that matches the name of the dataField",
          label: "Label string that is displayed for the column header"
      }
  ],
  rowsDisplayed: *Integer*,
  scrollable: *boolean*
}
</pre>
</code>

columns: Column definition of the data grid. Requires name and label or rendering. Any properties you set here will get populated down to the column.  

rowsDisplayed: How many rows are initially rendered. Control how big the table is!  

scrollable: Enables virtual scrolling on desktop.

The data object currently takes the following shape:
<code>
<pre>
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
</pre>
</code>

Right now I am trying to keep the actual record data separate from some of the row properties needed for displaying hierarchies and such. This way you only have to extract the data object out of the row data, instead of doing a bunch of property deleting, which is always fun.  

Explanation of other properties:  
  
parent: id of the parent row for a child row. In the future, I would like to be able to determine this via configuration, and specify a parent field within the data object.  

hasChildren: This is set by a method in the grid, but needs to exist on the javascript object. Hopefully this can be excluded at some point. Currently used by the grid to determine whether the chevron should be displayed.  

expanded: Again, set by grid, but currently needs to exist in the data set in the grid. Used to persist whether a row is expanded as a user scrolls.  

children: Same situation as above. Would like for these to not have to be included initally, but trying to dynamically add them doesn't appear to work (at least the way I was trying). This holds the rows children as an array for easy iteration when the chevron is clicked.  
Toolbar is using facets. You can currently set the title, buttons, footer, and body.

Decorators and Editors implement the cellFacet interface. Check out the defaultDecorator and defaultEditor for an example of how this could go. You could either implement it declaratively with aura:if like these do, or programmtically. They get fed the cell value and the associated column data. The general idea is to conditionally render a component based on that information. Editors won't do much until inline editing takes fuller shape, but decorators are totally functional right now.

Look at DataGridImpl component for an example of all of this being setup.  

Lots of things to add. Search. Pagination. Filtering. Etc. Currently working on inline editing.
