document.addEventListener('DOMContentLoaded', () => {
    const inputTarefa = document.getElementById('task-input');
    const addBotao = document.getElementById('add-task');
    const listaT = document.getElementById('task-list');

    loadT(); //carrega as tarefas localmente

    addBotao.addEventListener('click', () => {
        const conteudoT = inputTarefa.value.trim();
        if(conteudoT !== ''){
            addTarefa(conteudoT);
            inputTarefa.value = ''; //limpa o campo de entrada    
        }
    });

    //captura a tecla enter para adicionar tarefa
    inputTarefa.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const conteudoT = inputTarefa.value.trim();
            if(conteudoT !== '') {
                addTarefa(conteudoT);
                inputTarefa.value = ''; //limpa o input
            }
        }
    })

    // -----------------------------------------------------------------------------------------
    function addTarefa(conteudoT) {

        const li = document.createElement('li'); //cria item da lista
        li.innerHTML = `${conteudoT} <button class="btn-delete">Excluir</button>`;

        listaT.appendChild(li); //adiciona o item
        salvaT(conteudoT); //adiciona a tarefa localmente

        li.querySelector('.btn-delete').addEventListener('click', () => {
            listaT.removeChild(li);
            removeT(conteudoT);
        });
    }

    // -----------------------------------------------------------------------------------------
    function salvaT(conteudoT) {
        const tarefas = pegaTarefaLocalmente();

        if(!tarefas.includes(conteudoT)){
            tarefas.push(conteudoT);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }        
    }

    // -----------------------------------------------------------------------------------------
    function removeT(conteudoT) {
        const tarefas = pegaTarefaLocalmente();
        const updateT = tarefas.filter(task => task !== conteudoT);
        localStorage.setItem('tarefas', JSON.stringify(updateT));
    }

    // -----------------------------------------------------------------------------------------
    function loadT() {
        const tarefas = pegaTarefaLocalmente();
        listaT.innerHTML = ''; //limpa a lista antess de recarregar as tarefas
        tarefas.forEach(task => {
            addTarefa(task);
        });
    }

    // -----------------------------------------------------------------------------------------
    function pegaTarefaLocalmente() {
        const tarefas = localStorage.getItem('tarefas');
        return tarefas ? JSON.parse(tarefas) : [];
    }
});