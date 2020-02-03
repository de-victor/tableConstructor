$.fn.tableConstructor = function (params) {
    let table = $(this);
    let head = [];
    let properties = [];
    let tbody = $('<tbody></tbody>');
    
    
    let conf = {objInTr : undefined,
                header        : [],
                data          : [],
                buttons       : [],
                numberPerPage : 5
               };

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
    
    //table.append(tFoot);
    
    //build th for buttons
    let th = $('<th colspan="'+conf.buttons.length+'"></th>');
    tHead.append(th);
    /*
    conf.buttons.forEach((obj)=>{
        let th = $('<th></th>');
        tHead.append(th.append(obj));
    });
    */
    
    //build table tbody
    let buildTBody = (data)=>{
        
        data.forEach((obj)=>{
            let tr = $('<tr></tr>');
            if(conf.objInTr){
                tr.data(conf.objInTr, obj);
            }
            properties.forEach((propertie)=>{
                let td = $('<td></td>');
                td.append(obj[propertie]);
                tr.append(td);
            });
            conf.buttons.forEach((button)=>{
                let style = 'style = ';
                if(button.style){
                    style += '"'+button.style+'"';
                }
                let td = $('<td '+style+'></td>');
                let element = $(button.element);
                element.unbind().on('click',{tr:tr}, button.function);
                td.append(element);
                tr.append(td);
            });
            tbody.append(tr);
        });
    };
    
    
    //pagination using paginationJS
    table.parent().pagination({
        dataSource: conf.data,
        pageSize: conf.numberPerPage,
        callback: function(data, pagination) {
            buildTBody(data);
        }
    })

    table.append(tHead);
    table.append(tbody);
};


