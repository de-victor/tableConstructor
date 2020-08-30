# tableConstructor

## Dependências
Jquery v3.4.1(https://jquery.com/)<br/>
PaginationJS v2.1.5(https://pagination.js.org/)

## Atributos
1. objInTr(Object)
    - Informar um objeto neste atributo para ser usado em uma function caso deseje fazer algum processamento de dados da lista

2. header(Array)
    - Atributo de mapeamento onde irá vincular em que coluna deseja que os dados da lista de dados apareçam na tabela. O mapeamento é feito utilizando a seguinte estrutura de objeto
        1. head 
            - titulo da th
        2. property 
            - nome do atributo na lista de objetos a ser renderizado no tbody da table
        3. thStyle 
            - qualquer customização que seja necessário para aquela coluna

2. data(Array)
    - Lista de objetos a serem renderizados na table

3. buttons(Array)
    - Lista de objetos contendo a estrutura dos botões e a função do que ser feito quando clicado seguindo a estrutura abaixo
        1. element 
            - atributo com a estrutura visual do butão
        2. function 
            - função de ação ao clicar no butão
        3. style 
            - qualquer style adicional para o botão
4. numberPerPage(Number)
    - Quantidade de resultados por página(default : 20)

5. filterClass(String)
    - Classe a ser usada no cabeçaho caso use ordenação

6. sort(Boolean)
    - Flag para utilizar ordenação no cabeçalho da table(default : false)
