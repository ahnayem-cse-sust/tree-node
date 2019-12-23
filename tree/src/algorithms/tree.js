let items = [];

let getTree = (dataArray) => {
    let result = {};
    items = dataArray;
    items.map((v, k) => {
        if(v.parent !== 'root'){
            return;
        } 
        result[v.name] = getItems(v);
    });
    return result;
}

let getItems = (v) => {
    let obj = {};
    obj['parent'] = v.parent;
    obj['name'] = v.name;
    obj['childs'] = getChilds(v.name);
    return obj;
}

let getChilds = (root) => {
    let result = [];
    items.map(v => {
        if (v.parent === root) {
            let childItems = getItems(v);
            result.push(childItems);
        }
    });
    return result;
}

export default getTree;