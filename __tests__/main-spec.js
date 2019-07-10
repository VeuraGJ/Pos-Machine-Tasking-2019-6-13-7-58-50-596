const functions=require('../main');
//test loadAllItems
it('should get all data',() =>{
    expect(functions.loadAllItems()).toEqual([
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
    ]);
});
//test getAllBarcodes
it('should get all exist barcode',() =>{
    expect(functions.getAllBarcodes()).toEqual([
        "0001","0002","0003","0004","0005","0006","0007","0008","0009","0010"
    ]);
});
//test isExistBarcode
it('should be false,if barcode is not exist',() =>{
    expect(functions.isExistBarcode('0000')).toBe(false);
});
it('should be true,if barcode is exist',() =>{
    expect(functions.isExistBarcode('0001')).toBe(true);
});
//test countItems
it('count barcodes',() =>{
    expect(functions.countItems(['0001', '0003', '0005', '0003'])).toEqual(
        {
            '0001': 1,
            '0003': 2,
            '0005': 1
        }
    );
});
//test decodeBarcodes
it('decode barcodes',() =>{
    expect(functions.decodeBarcodes(['0001', '0003', '0005', '0003'])).toEqual([
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7, "count": 1},
    ]);
});
//test getEachBarcodeReceipt
it('get each barcode receipt',() =>{
    expect(functions.getEachBarcodeReceipt({"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2})).toEqual("Pepsi-Cola 5 2");
});
//test generateTotalPrice
it('get total price from barcodes',() =>{
    expect(functions.generateTotalPrice([
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7, "count": 1}
    ])).toEqual("Price: 20");
});
//test generateReceipt
it('get receipt from barcodes',() =>{
    expect(functions.generateReceipt([
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7, "count": 1}
    ])).toEqual(`Receipts
    ------------------------------------------------------------
    Coca Cola 3 1
    Pepsi-Cola 5 2
    Dr Pepper 7 1
    ------------------------------------------------------------
    Price: 20`);
});
//test printReceipt
it('print receipt from barcodes if not error happened',() =>{
    expect(functions.printReceipt(['0001', '0003', '0005', '0003'])).toEqual(`Receipts
    ------------------------------------------------------------
    Coca Cola 3 1
    Pepsi-Cola 5 2
    Dr Pepper 7 1
    ------------------------------------------------------------
    Price: 20`);
});
it('print receipt from barcodes if error happened',() =>{
    expect(functions.printReceipt(['0001', '0000', '0005', '0003'])).toEqual(`[EORROR]:0000 is not valid`);
});