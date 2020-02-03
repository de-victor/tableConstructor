$.fn.tableConstructor = function (params) {
    let table = $(this);
    let tHead = $('<tr></tr>');
    let tbody = $('<tbody></tbody>');
    
    let head = [];
    let properties = [];
    

    
    
    
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

    /*
    conf.header.forEach((obj)=>{
        for ( var property in obj ) {
            head.push(property);
            properties.push(obj[property]);
        };
    });    
    
    
    //build table header
    
    head.forEach(function(obj){
        let th = $('<th></th>');
        tHead.append(th.append(obj));
    });
    */
    
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
            conf.header.forEach((head)=>{
                let style = '';
                if(head.tdStyle){
                    style = 'style = "'+head.tdStyle+'"';
                }
                let td = $('<td '+style+'></td>');
                td.append(obj[head.propertie]);
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


