$( document ).ready(function() {
    app.tableController.init();
});

const app = {};

app.tableController = (()=>{
    let scope = {};

    let init = ()=>{
        loadScope();
        apiRequest();
    };

    let apiRequest = ()=>{
        const uri = 'https://swapi.co/api/people/';
        $.ajax({
            url: uri,
            contentType: "application/json",
            dataType: 'json',
            success: function(result){
                scope.data.films = result.results;
                buildTableTeste(scope.data.films);
                console.log(scope.data.films);
            }
        });
      
    };

    let loadScope = ()=>{

        let data = {films : []};
        let elements = {tableTeste  : $('.table-film')}
        
        scope.elements = elements;
        scope.data = data;
    };

    let buildTableTeste = (list)=>{
       let acaoVerUrl = (event)=>{
            let obj = event.data.tr.data('personagem');
            alert('url: '+obj.url);
        };
    
        let tableSetting = {header : [{head : 'Nome', 
                                       property: 'name'}, 
                                      {head : 'Altura', 
                                       property: 'height'},
                                      {head : 'Peso',
                                       property: 'mass'},
                                      {head : 'Cor do cabelo',
                                       property : 'hair_color'},
                                      {head : 'Genero',
                                       property : 'gender'}],
                            data : list,
                            numberPerPage : 6,
                            objInTr : 'personagem',
                            filterClass : 'btn-primary',
                            sort : false,
                            buttons : [{element : '<input type="button" value="url" class="btn btn-primary button1"></input>', function : acaoVerUrl, style : 'width : 1%'}]
                        };

        scope.elements.tableTeste.tableConstructor(tableSetting);
        
    };

    return {init : init};
})();