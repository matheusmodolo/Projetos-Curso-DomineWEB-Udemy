class Despesa {
  constructor(data, tipo, descricao, valor) {
    this.data = data;
    let num = this.data.split("-");
    this.ano = num[0];
    this.mes = num[1];
    this.dia = num[2];
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;

    if (this.valor != "") {
      this.valor = parseFloat(this.valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    let despesas = Array();

    let id = localStorage.getItem("id");

    //recuperar todas as despesas cadastradas em localStorage
    for (let i = 1; i <= id; i++) {
      //recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(i));

      //existe a possibilidade de haver índices que foram pulados/removidos
      //nestes casos vamos pular esses índices
      if (despesa === null) {
        continue;
      }
      despesa.id = i;
      despesas.push(despesa);
    }

    return despesas;
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarTodosRegistros();
    console.log(despesasFiltradas);
    console.log(despesa);

    if (despesa.ano != "") {
      console.log("filtro de ano");
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }

    if (despesa.mes != "") {
      console.log("filtro de mes");
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }

    if (despesa.dia != "") {
      console.log("filtro de dia");
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }

    if (despesa.tipo != "") {
      console.log("filtro de tipo");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }

    if (despesa.descricao != "") {
      console.log("filtro de descricao");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }

    if (despesa.valor != "") {
      console.log("filtro de valor");
      console.log("despesa.valor:" + despesa.valor);
      console.log("typeof despesa.valor: " + typeof despesa.valor);
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }
    return despesasFiltradas;
  }

  remover(id) {
    localStorage.removeItem(id);
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let data = document.getElementById("data");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    data.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);

    //mensagem de sucesso
    document.getElementById("modal_titulo").innerHTML =
      "Registro inserido com sucesso";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso!";
    document.getElementById("modal_btn").innerHTML = "Voltar";
    document.getElementById("modal_btn").className = "btn btn-success";

    //mensagem de sucesso
    $("#modalRegistraDespesa").modal("show");

    data.value = "";
    tipo.value = "";
    descricao.value = "";
    valor.value = "";
  } else {
    //mensagem de erro
    document.getElementById("modal_titulo").innerHTML =
      "Erro na inclusão do registro";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_conteudo").innerHTML =
      "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!";
    document.getElementById("modal_btn").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_btn").className = "btn btn-danger";

    //mensagem de erro
    $("#modalRegistraDespesa").modal("show");
  }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
  if (despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros();
  }

  let listaDespesas = document.getElementById("listaDespesas");
  listaDespesas.innerHTML = "";
  despesas.forEach(function (d) {
    //Criando a linha (tr)
    var linha = listaDespesas.insertRow();

    //Criando as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

    //Ajustar o tipo
    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Saúde";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    // d.valor = d.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    linha.insertCell(3).innerHTML = d.valor;

    //Criar o botão de exclusão
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = '<i class="fa fa-times"  ></i>';
    btn.id = `id_despesa_${d.id}`;
    btn.onclick = function () {
      let confirmacao = confirm("Deseja mesmo excluir o item?");

      if (confirmacao) {
        let id = this.id.replace("id_despesa_", "");
        bd.remover(id);
        window.location.reload();
      }
    };
    linha.insertCell(4).append(btn);
    // console.log(d);
  });
}

function pesquisarDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let data = ano + "-" + mes + "-" + dia;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Despesa(data, tipo, descricao, valor);

  let despesas = bd.pesquisar(despesa);

  this.carregaListaDespesas(despesas, true);
}
