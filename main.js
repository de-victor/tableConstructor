$( document ).ready(function() {

    let lista = [{nome: 'fulano de tal', matricula: 10251, codigo: 1},
                 {nome: 'Beltrano de faloste', matricula: 5248, codigo: 2}];
    
    
    let tabela = {header : [{Funcionario : 'nome'}, {Matricula:'matricula'}],
                  data : lista,
                  objInTr : 'funcionario'};
    

    $('.tabela-teste').natiTable(tabela);
});