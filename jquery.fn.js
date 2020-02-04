$.fn.tableConstructor = function (params) {
    let table = $(this);
    let tHead = $('<thead></thead>');
    let tbody = $('<tbody></tbody>');

    if(!table.is('table') || !table){
        throw 'Elemento informado não é uma <table>';
    }
    
    let conf = {objInTr : undefined,
                header        : [],
                data          : [],
                buttons       : [],
                numberPerPage : 5,
                order         : 0
               };

    $.extend(conf, params);

    let orderFunction = (event)=>{
        table.html('');
        $('.pagination-random-01').remove();

        let property = event.data.obj.property;
        let sortFunction = (a,b)=>{
            if(!conf.order || conf.order == 0){
                if(a[property] < b[property]){
                    return -1;
                }
                if(a[property] > b[property]){
                    return 1;
                }
            }
            else{
                if(a[property] > b[property]){
                    return -1;
                }
                if(a[property] < b[property]){
                    return 1;
                }
            }
            return 0;
        };
        conf.data.sort(sortFunction);
        if(!conf.order || conf.order == 0){
            conf.order = 1;
        }
        else{
            conf.order = 0;
        }
        
        table.tableConstructor(conf);
    };
    
    let trHead = $('<tr></tr>');
    conf.header.forEach((obj)=>{
        let style = '';
        if(obj.thStyle){
            style = 'style = "'+obj.thStyle+'"';
        }
        let th = $('<th '+style+'></th>');
        th.css('cursor', 'pointer');
        th.unbind().on('click',{obj:obj}, orderFunction);
        trHead.append(th.append(obj.head));
    });
    
    //build th for buttons
    let th = $('<th colspan="'+conf.buttons.length+'"></th>');
    trHead.append(th);
    
    //append all head elments to thead tag
    tHead.append(trHead);
    
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
    let parent = table.parent();
    let paginationDiv = $('<div class="pagination-random-01"></div');
    parent.append(paginationDiv);

    paginationDiv.pagination({
        dataSource: conf.data,
        pageSize: conf.numberPerPage,
        callback: function(data, pagination) {
            buildTBody(data);
        }
    })

    table.append(tHead);
    table.append(tbody);
};


