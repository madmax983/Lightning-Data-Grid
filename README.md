# Lightning-Data-Grid [![Build Status](https://travis-ci.org/madmax983/Lightning-Data-Grid.svg?branch=master)](https://travis-ci.org/madmax983/Lightning-Data-Grid)
A data grid for Lightning Component Framework  

![screenshot of lightning data grid](/assets/screenshot.png "Ligthing Data Grid Screenshot")

Currently supports inline-editing of hierarchical data , and virtual scrolling. This is a huge WIP, use as your own risk.

The Data Grid contains a toolbar component, a header component (right now this just renders the column names, in the future it can contain filtering/column menus), a row component, and a cell component.  

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
  scrollable: *boolean*,
  editable: *boolean*
}
</pre>
</code>

columns: Column definition of the data grid. Requires name and label for rendering. Any properties you set here will get populated down to the cell decorators and cell editors.

rowsDisplayed: How many rows are initially rendered. Control how big the table is!  

scrollable: Enables virtual scrolling on desktop.

editable: You can control whether the entire grid is editable. Columns also take an editable flag, so you can control it ast the column level as well.

The data object currently takes the following shape:
<code>
<pre>
{
    data: {
        id: "dataId",
        name: "dataName"
        etc . . . These keys should match your column names, and is how the data in the row will get displayed
    },
    parent: null
}
</pre>
</code>

Right now I am trying to keep the actual record data separate from some of the row properties needed for displaying hierarchies and such. This way you only have to extract the data object out of the row data, instead of doing a bunch of property deleting, which is always fun.  

Explanation of other properties:  

parent: id of the parent row for a child row. In the future, I would like to be able to determine this via configuration, and specify a parent field within the data object.  

Decorators and Editors implement the cellFacet interface. Check out the defaultDecorator, defaultEditor, programmaticDecorator, and programmaticEditor for examples. The two default use aura:if for their implementation, while the two programmatic components perform their logic with a javascript controller and $A.createComponent. They get fed the cell value and the associated column data. The general idea is to conditionally render a component based on that information.

Look at DataGridImpl component for an example of all of this being setup.  

Lots of things to add. Search. Pagination. Filtering. Etc.
