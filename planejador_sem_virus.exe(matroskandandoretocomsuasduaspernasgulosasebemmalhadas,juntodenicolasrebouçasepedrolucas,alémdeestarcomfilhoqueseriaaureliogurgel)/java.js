const tarefas = [];

const elementos = {
  nome: document.getElementById("tarefa"),
  materia: document.getElementById("materia"),
  prioridade: document.getElementById("prioridade"),
  mensagem: document.getElementById("mensagem"),
  lista: document.getElementById("listaTarefas"),
  contador: document.getElementById("contador"),
  contadorConcluidas: document.getElementById("contadorConcluidas")
};

function mostrarMensagem(texto, tipo = "info") {
  elementos.mensagem.textContent = texto;

  if (tipo === "erro") {
    elementos.mensagem.style.color = "red";
    elementos.mensagem.style.backgroundColor = "#fce4ec";
    return;
  }

  if (tipo === "sucesso") {
    elementos.mensagem.style.color = "green";
    elementos.mensagem.style.backgroundColor = "#e8f5e9";
    return;
  }

  elementos.mensagem.style.color = "#c2185b";
  elementos.mensagem.style.backgroundColor = "#fce4ec";
}

function limparCampos() {
  elementos.nome.value = "";
  elementos.materia.value = "";
  elementos.prioridade.value = "";
  elementos.nome.focus();
}

function atualizarContadores() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  elementos.contador.textContent = `Tarefas cadastradas: ${total}`;
  elementos.contadorConcluidas.textContent = `Tarefas concluídas: ${concluidas}`;
}

function renderizarTarefas() {
  if (!elementos.lista) {
    return;
  }

  if (tarefas.length === 0) {
    elementos.lista.innerHTML = "<p>Nenhuma tarefa cadastrada ainda.</p>";
    atualizarContadores();
    return;
  }

  elementos.lista.innerHTML = tarefas
    .map(
      (tarefa) => `
        <div class="tarefa ${tarefa.concluida ? "concluida" : ""}">
          <h3>${tarefa.nome}</h3>
          <p><strong>Matéria:</strong> ${tarefa.materia}</p>
          <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
          <div class="acoes">
            <button type="button" data-acao="toggle" data-id="${tarefa.id}">
              ${tarefa.concluida ? "Marcar como pendente" : "Concluir"}
            </button>
            <button type="button" data-acao="excluir" data-id="${tarefa.id}">
              Excluir
            </button>
          </div>
        </div>
      `
    )
    .join("");

  atualizarContadores();
}

function adicionarTarefa() {
  const nome = elementos.nome.value.trim();
  const materia = elementos.materia.value.trim();
  const prioridade = elementos.prioridade.value;

  if (!nome || !materia || !prioridade) {
    mostrarMensagem("Preencha todos os campos!", "erro");
    return;
  }

  const jaExiste = tarefas.some(
    (tarefa) =>
      tarefa.nome.toLowerCase() === nome.toLowerCase() &&
      tarefa.materia.toLowerCase() === materia.toLowerCase()
  );

  if (jaExiste) {
    mostrarMensagem("Essa tarefa já existe!", "erro");
    return;
  }

  tarefas.push({
    id: Date.now() + Math.random(),
    nome,
    materia,
    prioridade,
    concluida: false
  });

  mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
  limparCampos();
  renderizarTarefas();
}

function limparTarefas() {
  tarefas.length = 0;
  renderizarTarefas();
  mostrarMensagem("Lista limpa com sucesso!", "sucesso");
}

function alternarModo() {
  document.body.classList.toggle("modo-concentracao");
}

if (elementos.lista) {
  elementos.lista.addEventListener("click", (event) => {
    const botao = event.target.closest("button");

    if (!botao) {
      return;
    }

    const acao = botao.dataset.acao;
    const id = botao.dataset.id;
    const indice = tarefas.findIndex((tarefa) => String(tarefa.id) === String(id));

    if (indice === -1) {
      return;
    }

    if (acao === "toggle") {
      tarefas[indice].concluida = !tarefas[indice].concluida;
      mostrarMensagem("Status da tarefa atualizado!", "sucesso");
      renderizarTarefas();
      return;
    }

    if (acao === "excluir") {
      tarefas.splice(indice, 1);
      mostrarMensagem("Tarefa removida!", "sucesso");
      renderizarTarefas();
    }
  });
}

window.adicionarTarefa = adicionarTarefa;
window.limparCampos = limparCampos;
window.alternarModo = alternarModo;
window.limparTarefas = limparTarefas;

renderizarTarefas();

function destacarPrioridade(card, prioridade) {
  if (!card) {
    return;
  }

  if (prioridade === "Alta") {
    card.style.borderLeft = "5px solid red";
  } else if (prioridade === "Média") {
    card.style.borderLeft = "5px solid orange";
  } else if (prioridade === "Baixa") {
    card.style.borderLeft = "5px solid blue";
  } else {
    card.style.borderLeft = "";
  }
}

function destacarprioridade(card, prioridade) {
  return destacarPrioridade(card, prioridade);
}

function concluirTarefa(indice) {
  if (indice < 0 || indice >= tarefas.length) {
    return false;
  }

  const tarefa = tarefas[indice];

  if (!tarefa || tarefa.concluida) {
    return false;
  }

  tarefa.concluida = true;
  mostrarMensagem("Tarefa concluída com sucesso!", "sucesso");
  renderizarTarefas();
  return true;
}

function concluirtarefa(indice) {
  return concluirTarefa(indice);
}

function exibirTarefas() {
  renderizarTarefas();
}

function limparcampos() {
  limparCampos();
}

function alterarmodo() {
  alternarModo();
}

window.concluirTarefa = concluirTarefa;
window.concluirtarefa = concluirtarefa;
window.destacarPrioridade = destacarPrioridade;
window.destacarprioridade = destacarprioridade;
window.exibirTarefas = exibirTarefas;
window.limparcampos = limparcampos;
window.alterarmodo = alterarmodo;