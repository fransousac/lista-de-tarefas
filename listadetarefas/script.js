//1º Precisamos pegar os itens do html: o que a pessoa digitou(input), pegar a ul e o botão para ação de click.


let listElement = document.querySelector('#app ul');   //usamos # para pegar id e ponto para pegar classe
let inputElement = document.querySelector('#app input');
let buttonElemennt = document.querySelector('#app button');


//Iremos armazenar toda nossa lista dentro de um array, a lista começa vazia
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];  //serve para buscarmos se ja tem alguma tarefa dentro do local storage, ou se esta vazia e converte para array

function renderTarefas(){
    listElement.innerHTML = "";   //Acessamos a tag <ul> e deixamos ela vazia


tarefas.map((todo) =>{                   //Criamos uma funcao anonima que ira percorrer por cada elemento da lista e passamos um parametro que terá acesso ao item que for adicionado
let liElement = document.createElement("li");                         //Criamos o liElement e o tarefaText para mostrar o conteudo na tela e nao no console
let tarefaText = document.createTextNode(todo);         

let linkElement = document.createElement("a");  //Esta linha cria um novo elemento de link (<a>) no documento HTML. O document.createElement("a") cria um novo elemento <a>, e o let linkElement atribui esse novo elemento a uma variável chamada linkElement.//
linkElement.setAttribute("href", "#");    // Aqui, estamos definindo o atributo "href" do elemento de link (<a>) criado na linha anterior. O "href" é o atributo que define para onde o link direciona quando é clicado. Neste caso, estamos definindo-o como "#" apenas como um valor padrão, o que geralmente significa que o link não vai a lugar nenhum (um link de espaço reservado).

let linkText = document.createTextNode("Excluir"); //Criamos o texto excluir
linkElement.appendChild(linkText);   //Colocamos o texto excluir dentro do elemento de link

let posicao = tarefas.indexOf(todo);  //o indexoff serve para identificar qual é a posicao que quero excluir e se tiver dentro de todo, ele mostrará

linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`)



liElement.appendChild(tarefaText);          //Precisamos adicionar o texto(tarefatext) dentro da nossa li(liElement)
liElement.appendChild(linkElement);
listElement.appendChild(liElement);         // Agora colocamos  a li dentro da ul
                       


})           

}

renderTarefas();

function adicionarTarefas(){
    if(inputElement.value === ''){   //Se o que a pessoa digitou dentro de input element, for uma string vazia, significa que ele nao digitou nada
        alert('Digite alguma tarefa');
        return false;        //Colocamos falso para parar a execução e não prosseguir depois do if
    }else{
       let novaTarefa = inputElement.value // Criamos uma variavel para receber o que a pessoa digitar dentro do input

       tarefas.push(novaTarefa);       //o Push adiciona uma nova tarefa na nossa lista de tarefas
       inputElement.value = '';        //Voltamos para o nosso campo vazio
       renderTarefas();        //Apos ele adicionar uma tarefa, ele precisa renderizar ela(mostrar conteudo na tela)
       salvarDados();
    }

}

buttonElemennt.onclick = adicionarTarefas;

function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);
    renderTarefas();
    salvarDados();   //toda vez que deletamos uma tarefa, tambem precisamos salvar as alteracoes

}


function salvarDados(){
    localStorage.setItem("@listaTarefas",JSON.stringify(tarefas)) //O local storage nao reconhece uma lista, entao temos que converte-la para string
}

