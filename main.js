let header
let toolbar
let content

let title = "Demo"

let demoData = Observer([{name: "bob", age: "10", intrest: "fishing"}, {name: "sally", age: "22", intrest: "gaming"}, {name: "emma", age: "36", intrest: "sports"}])
let demoColumns = [{name:"name"},{name:"age"},{name:"intrest"}]

function LoadScripts() {
    LoadScript("module/table.js")
    LoadScript("module/savebutton.js")
    LoadScript("module/loadfilebutton.js")
    LoadScript("module/datatable.js")
}

LoadScripts()

window.onload = function() {
    SetupCore()
    SetupContent()
}

function SetupCore() {
    header = CreateEle('div', {id:"header", innerText:title})
    content = CreateEle('div', {id:"content"})

    InsertEles(document.body, [header, content])
}

function SetupContent() {
    // Some demo content
    // TODO readonly for titles and specified columns
    content.InsertEle(CreateEle("p", {innerText:"This demo allows additional data to be added to the table. \
    \nThen \"Save\" will download changed data and \"Choose File\" will load it after a refresh"}))
    let table = DataTableModule("demo", demoData, demoColumns)
    content.InsertEle(table)
    content.InsertEle(LoadFileButtonModule(LoadFromFileJson))
    demoData.Subscribe((data) => table.LoadData(data))
    content.InsertEle(SaveButtonModule("demo.json", GenerateSaveString))
}

// Project specific Functions
function LoadFromFileJson(text) {
    json = JSON.parse(text)
    demoData.Update(json)
}

function GenerateSaveString() {
    json = demoData.data
    text = JSON.stringify(json)
    return text
}
