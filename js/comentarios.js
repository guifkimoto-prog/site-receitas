// Formulário de comentários da página da receita
// Os comentários ficam salvos no navegador (localStorage)

const form = document.getElementById("form-comentario");
const lista = document.getElementById("lista-comentarios");
const chave = "comentarios-" + document.body.dataset.receita;

function carregarComentarios() {
  let salvos = [];
  try {
    salvos = JSON.parse(localStorage.getItem(chave)) || [];
  } catch (e) {
    salvos = [];
  }
  return salvos;
}

function mostrarComentarios() {
  const comentarios = carregarComentarios();
  lista.innerHTML = "";

  if (comentarios.length === 0) {
    lista.innerHTML = '<p class="text-muted">Ainda não tem comentários. Seja o primeiro!</p>';
    return;
  }

  comentarios.forEach(function (c) {
    const div = document.createElement("div");
    div.className = "comentario";

    const titulo = document.createElement("strong");
    titulo.textContent = c.nome;

    const nota = document.createElement("span");
    nota.className = "estrelas ms-2";
    nota.textContent = "★".repeat(c.nota) + "☆".repeat(5 - c.nota);

    const data = document.createElement("small");
    data.className = "d-block";
    data.textContent = c.data;

    const texto = document.createElement("p");
    texto.className = "mb-0 mt-1";
    texto.textContent = c.texto;

    div.append(titulo, nota, data, texto);
    lista.appendChild(div);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const comentarios = carregarComentarios();
  comentarios.unshift({
    nome: document.getElementById("nome").value.trim(),
    nota: Number(document.getElementById("nota").value),
    texto: document.getElementById("comentario").value.trim(),
    data: new Date().toLocaleDateString("pt-BR")
  });

  try {
    localStorage.setItem(chave, JSON.stringify(comentarios));
  } catch (e) {
    alert("Não foi possível salvar o comentário.");
  }

  form.reset();
  form.classList.remove("was-validated");
  mostrarComentarios();
});

mostrarComentarios();
