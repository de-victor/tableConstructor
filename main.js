$( document ).ready(function() {
    app.tableController.init();
});

const app = {};

app.tableController = (()=>{
    let scope = {};

    let init = ()=>{
        loadScope();
        loadDummyData();
        buildTableTeste();
    };

    let loadScope = ()=>{
        let elements = {tableTeste : $('.tabela-teste')}
        
        scope.elements = elements;
    }

    let loadDummyData = ()=>{
        let lista = [{nome: 'Fulano de tal', matricula: 10251, codigo: 1},
                     {nome: 'Alana maria', matricula: 2, codigo: 3},
                     {nome: 'Juão Paulo', matricula: 78, codigo: 4},
                     {nome: 'Ana Livia', matricula: 101, codigo: 100},
                     {nome: 'Anna Mara', matricula: 125, codigo: 105},
                     {nome: 'Claudio Furtado', matricula: 785, codigo: 45},
                     {nome: 'Beltrano de faloste', matricula: 5248, codigo: 2}];
        
        scope.list = lista;
    };

    let buildTableTeste = ()=>{
        let acaoRemover = (event)=>{
            let obj = event.data.tr.data('funcionario');
            alert('Removendo funcionario de codigo: '+obj.codigo);
        };
    
        let acaoAlterar = (event)=>{
            let obj = event.data.tr.data('funcionario');
            alert('Alterando funcionario de codigo: '+obj.codigo);
        };
    
        let tabela = {header : [{head : 'Funcionaro ground', 
                                 property: 'nome',
                                 thStyle : 'width : 50%'}, 
                                {head : 'Matricula', 
                                 property: 'matricula'}],
                      data : scope.list,
                      numberPerPage : 10,
                      objInTr : 'funcionario',
                      buttons : [{element : '<input type="button" value="remover" class="btn btn-primary button1"></input>', function : acaoRemover, style : 'width : 1%'},
                                 {element : '<input type="button" value="alterar" class="btn btn-primary button2"></input>', function : acaoAlterar, style : 'width : 1%'}]
                     };

        scope.elements.tableTeste.tableConstructor(tabela);
    };

    return {init : init};
})();

