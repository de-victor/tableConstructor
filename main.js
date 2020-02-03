$( document ).ready(function() {

    let lista = [{nome: 'fulano de tal', matricula: 10251, codigo: 1},
                 {nome: 'Beltrano de faloste', matricula: 5248, codigo: 2}];

    let acaoRemover = (event)=>{
        let obj = event.data.tr.data('funcionario');
        alert('Removendo funcionario de codigo: '+obj.codigo);
    };

    let acaoAlterar = (event)=>{
        let obj = event.data.tr.data('funcionario');
        alert('Alterando funcionario de codigo: '+obj.codigo);
    };

    let tabela = {header : [{head : 'Funcionario prin', 
                             propertie: 'nome',
                             thStyle : 'width : 50%'}, 
                            {head : 'Matricula', 
                             propertie: 'matricula'}],
                  data : lista,
                  numberPerPage : 10,
                  objInTr : 'funcionario',
                  buttons : [{element : '<button class="button1">remover</button>', function : acaoRemover, style : 'width : 1%'},
                             {element : '<button class="button2">alterar</button>', function : acaoAlterar, style : 'width : 1%'}]
                 };
    

    $('.tabela-teste').tableConstructor(tabela);
});