$.fn.tableConstructor = function (params) {

    let table = $(this);
    let parentDiv = $('<div class="table-constructor-div"></div>');
    let tHead = $('<thead></thead>');
    let tbody = $('<tbody class="table-constructor-t-body"></tbody>');
    let paginationDiv = $('<div class="pagination-random-01"></div');

    if(table.parent().hasClass('table-constructor-div')){
        parentDiv = table.parent();
        parentDiv.html('');
        table.html('');
    }

    table.parent().prepend(parentDiv);

    if(!table.is('table') || !table){
        throw 'Elemento informado não é uma <table>';
    }
    
    //default configurations
    let conf = {objInTr : undefined,
                header        : [],
                data          : [],
                buttons       : [],
                numberPerPage : 5,
                order         : 0,
                filterClass   : 'btn-primary',
                sort : false
               };

    //initialization of user params into default params
    $.extend(conf, params);

    let orderFunction = (event)=>{

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
        
        table.find('.table-constructor-t-body').html('');
        paginationDiv.html('');
        createPagination();
        parentDiv.append(paginationDiv);
        tHead.find('.'+conf.filterClass).removeClass();
        event.data.th.addClass(conf.filterClass);
    };
    
    let trHead = $('<tr></tr>');
    conf.header.forEach((obj)=>{
        let style = '';
        if(obj.thStyle){
            style = 'style = "'+obj.thStyle+'"';
        }
        let th = $('<th '+style+'></th>');
        
        if(conf.sort){
            th.css('cursor', 'pointer');
            th.unbind().on('click',{obj:obj, th:th}, orderFunction);
        }
        
        trHead.append(th.append(obj.head));
    });
    
    //build th for buttons
    if(conf.buttons.length > 0){
        let th = $('<th colspan="'+conf.buttons.length+'"></th>');
        trHead.append(th);
    }
    
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
    
    let createPagination = ()=>{
        paginationDiv.pagination({
            dataSource: conf.data,
            pageSize: conf.numberPerPage,
            callback: function(data, pagination) {
                buildTBody(data);
            }
        });
    };

    createPagination();

    table.append(tHead);
    table.append(tbody);

    parentDiv.append(table);
    parentDiv.append(paginationDiv);
};


