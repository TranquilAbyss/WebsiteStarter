function CreateEle(tag, options = {}) {
    let element = document.createElement(tag)
    Object.keys(options).forEach((key) => {
        element[key] = options[key]
    });
    element.InsertEle = function(innerElement) {
        this.appendChild(innerElement)
        return this
    }
    element.InsertEles = function(innerElements = []) {
        innerElements.forEach(innerElement => this.appendChild(innerElement))
        return this
    }
    element.Empty = function() {
        while(element.firstElementChild) {
            element.firstElementChild.remove();
        }
    }

    return element
}

function InsertEle(outerElement, innerElement) {
    outerElement.appendChild(innerElement)
    return outerElement
}

function InsertEles(outerElement, innerElements = []) {
    innerElements.forEach(innerElement => outerElement.appendChild(innerElement))
    return outerElement
}

function LoadScript(url)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
