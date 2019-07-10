const data = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];
const loadAllItems = () => data;
const getAllBarcodes = () =>{
    const allBarcodes = [];
    for(let i of data){
        allBarcodes.push(i.id);
    }
    return allBarcodes;
}
const isExistBarcode = barcode =>{
    const allBarcodes = getAllBarcodes();
    for(let i of allBarcodes){
        if(i == barcode){
            return true;
        }
    }
    return false;
}
const countItems = barcodes =>{
    const countItems = {};
    for(let i of barcodes){
        if(countItems[i] == undefined){
            countItems[i] = 1;
        }else{
            countItems[i]++;
        }
    }
    return countItems;
}
const decodeBarcodes = barcodes =>{
    const allItems = loadAllItems();
    const countBarcodes = countItems(barcodes);
    const dedupe = Array.from(new Set(barcodes));
    const items = [];
    for(let i of dedupe){
        const item = allItems.find( cur => cur.id == i);
        item.count = countBarcodes[i];
        items.push(item);
    }
    return items;
}
const getEachBarcodeReceipt = item => `${item.name} ${item.price} ${item.count}`
const generateTotalPrice = items =>{
    let totalPrice = 0;
    for(let i of items){
        totalPrice += parseInt(i.price * i.count);
    }
    return `Price: ${totalPrice}`;
}
const generateReceipt = items =>{
    let itemReceipt = ``;
    const totalPrice=generateTotalPrice(items);
    for(let i of items){
        const item=getEachBarcodeReceipt(i);
        itemReceipt = itemReceipt + `${item}\n    `;
    }
    return `Receipts
    ------------------------------------------------------------
    ${itemReceipt}------------------------------------------------------------
    ${totalPrice}`;
}
const printReceipt = barcodes =>{
    let error = `[EORROR]:`;
    let isValid = true;
    for(let i of barcodes){
        isValid = true;
        if(!isExistBarcode(i)){
            isValid = false;
            error = error + `${i} is not valid`;
            return error;
        }
    }
    if(isValid){
        const items = decodeBarcodes(barcodes);
        return generateReceipt(items);
    }
}
module.exports={
    loadAllItems,
    getAllBarcodes,
    isExistBarcode,
    countItems,
    decodeBarcodes,
    getEachBarcodeReceipt,
    generateTotalPrice,
    generateReceipt,
    printReceipt
}