function DataTableModule(name, data = [], columns = []) {
    //Datatable columns {names, displayname, readonly}, dataset
    let module = TableModule(name, 2, columns.length)
    module.data = data
    module.columnObjects = columns

    //columns headers
    columns.forEach((column, c) => {
        let cell = module.GetCell(ColumnIndexToLetter(c) + 1)
        let columnHeader = column["name"]
        if (typeof column["displayName"] !== 'undefined') {
            columnHeader = column["displayName"]
        }
        cell.SetValue(columnHeader)

        //setup intail cells
        cell = module.GetCell(ColumnIndexToLetter(c) + 2)
        SetupDataCell(cell, 0, column)

    })
    //intial load data cells
    let row = 2
    data.forEach((object, index) => {
        module.AddRow()
        columns.forEach((column, c) => {
            let cell = module.GetCell(ColumnIndexToLetter(c) + row)
            let newCell = module.GetCell(ColumnIndexToLetter(c) + (row + 1))
            cell.SetValue(object[column["name"]])
            if (!cell.readonly) {
                cell.children[0].oninput = OnCellChange
            }

            //setup next cells
            SetupDataCell(newCell, index + 1, column)
        })
        ++row
    })

    module.LoadData = function(data = [], columns = []) {
        this.Build(2, columns.length)
        //columns headers
        columns.forEach((column, c) => {
            let cell = this.GetCell(ColumnIndexToLetter(c) + 1)
            let columnHeader = column["name"]
            if (typeof column["displayName"] !== 'undefined') {
                columnHeader = column["displayName"]
            }
            cell.SetValue(columnHeader)

            //setup intail cells
            cell = this.GetCell(ColumnIndexToLetter(c) + 2)
            SetupDataCell(cell, 0, column)

        })
        //intial load data cells
        let row = 2
        data.forEach((object, index) => {
            module.AddRow()
            columns.forEach((column, c) => {
                let cell = this.GetCell(ColumnIndexToLetter(c) + row)
                let newCell = this.GetCell(ColumnIndexToLetter(c) + (row + 1))
                cell.SetValue(object[column["name"]])
                if (!cell.readonly) {
                    cell.children[0].oninput = OnCellChange
                }

                //setup next cells
                SetupDataCell(newCell, index + 1, column)
            })
            ++row
        })
    }

    return module
}

function SetupDataCell(cell, index, column) {
    cell.index = index
    cell.column = column
    if (!cell.readonly) {
        cell.children[0].oninput = OnCellChange
    }
}

function OnCellChange(event) {
    let cell = event.target.offsetParent
    let table = event.target.offsetParent.offsetParent
    let data = table.data
    if (typeof data[cell.index] == "undefined") {
        let obj = {}
        data.push(obj)
        // Add row if last row is empty
        table.AddRow()
        table.columnObjects.forEach((column, c) => {
            let newCell = table.GetCell(ColumnIndexToLetter(c) + (data.length + 2))

            SetupDataCell(newCell, data.length, column)
        })
    }

    data[cell.index][cell.column["name"]] = event.srcElement.value
}
