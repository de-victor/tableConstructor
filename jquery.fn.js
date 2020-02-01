$.fn.testeFun = function () {
    console.log(this.length);
    console.log($(this).html());
};


$.fn.natiTable = function (params) {
    let table = $(this);
    let head = [];
    let properties = [];
    
    let conf = {objInTr : undefined,
                header  : [],
                data    : []};

    $.extend(conf, params);
    
    conf.header.forEach((obj)=>{
        for ( var property in obj ) {
            head.push(property);
            properties.push(obj[property]);
        };
    });    
    
    //build table header
    let tHead = $('<tr></tr>');
    head.forEach(function(obj){
        let th = $('<th></th>');
        tHead.append(th.append(obj));
    });
    


    //build table tbody
    let tbody = $('<tbody></tbody>');
    conf.data.forEach((obj)=>{
        let tr = $('<tr></tr>');
        if(conf.objInTr){
            tr.data(conf.objInTr, obj);
        }
        properties.forEach((propertie)=>{
            let td = $('<td></td>');
            td.append(obj[propertie]);
            tr.append(td);
        });
        tbody.append(tr);
    });

    
    //apend for table element
    table.append(tHead);
    table.append(tbody);
};


