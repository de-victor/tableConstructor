$.fn.tableConstructor = function (params) {
    let table = $(this);
    let tHead = $('<tr></tr>');
    let tbody = $('<tbody></tbody>');

    if(!table.is('table') || !table){
        throw 'Elemento informado não é uma <table>';
    }
    
    let conf = {objInTr : undefined,
                header        : [],
                data          : [],
                buttons       : [],
                numberPerPage : 5
               };

    $.extend(conf, params);
    

    conf.header.forEach((obj)=>{
        let style = '';
        if(obj.thStyle){
            style = 'style = "'+obj.thStyle+'"';
        }
        let th = $('<th '+style+'></th>');
        tHead.append(th.append(obj.head));
    });
    
    //build th for buttons
    let th = $('<th colspan="'+conf.buttons.length+'"></th>');
    tHead.append(th);
    
    //build table tbody
    let buildTBody = (data)=>{
        tbody.html('');
        data.forEach((obj)=>{
            let tr = $('<tr></tr>');
            if(conf.objInTr){
                tr.data(conf.objInTr, obj);
            }
            conf.header.forEach((head)=>{
                let style = '';
                if(head.tdStyle){
                    style = 'style = "'+head.tdStyle+'"';
                }
                let td = $('<td '+style+'></td>');
                td.append(obj[head.property]);
                tr.append(td);
            });
            conf.buttons.forEach((button)=>{
                let style = '';
                if(button.style){
                    style = 'style = "'+button.style+'"';
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


