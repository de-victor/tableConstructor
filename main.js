$( document ).ready(function() {

    let lista = [{nome: 'fulano de tal', matricula: 10251, codigo: 1},
                 {nome: 'Beltrano de faloste', matricula: 5248, codigo: 2}];
    
    

    let acaoRemover = ()=>{
        console.log($(this));
    };

    let tabela = {header : [{Funcionario : 'nome'}, {Matricula:'matricula'}],
                  data : lista,
                  objInTr : 'funcionario',
                  buttons : [{element : '<button>remover</button>', function : acaoRemover}]
                 };
    

    $('.tabela-teste').natiTable(tabela);
});