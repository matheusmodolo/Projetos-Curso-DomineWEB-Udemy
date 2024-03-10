function getDadosEnderecoPorCEP(cep){
    // Validação do CEP
    if (!cep || cep.length !== 8 || isNaN(cep)) {
        if (cep) {
            // Se o CEP for inválido, mostra o modal de erro
            $('#errorModal').modal('show');
        }
        return;
    }

    // Monta a URL para a API do ViaCEP
    let url = "https://viacep.com.br/ws/" + cep + "/json/";

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);

    // Mostra o indicador de carregamento
    document.querySelector('.loading').style.display = 'block';

    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4){
            // Esconde o indicador de carregamento
            document.querySelector('.loading').style.display = 'none';

            if(xmlHttp.status == 200){
                // Se a requisição foi bem sucedida, parseia a resposta e preenche os campos do endereço
                let dadosJSONText = xmlHttp.responseText;
                let dadosJSONObj = JSON.parse(dadosJSONText); 

                if (dadosJSONObj.logradouro === undefined || dadosJSONObj.bairro === undefined || dadosJSONObj.localidade === undefined || dadosJSONObj.uf === undefined) {
                    // Se a resposta não contém todas as informações necessárias, mostra o modal de erro
                    $('#errorModal').modal('show');
                    return;
                }

                document.getElementById('endereco').value = dadosJSONObj.logradouro;
                document.getElementById('bairro').value = dadosJSONObj.bairro;
                document.getElementById('cidade').value = dadosJSONObj.localidade;
                document.getElementById('uf').value = dadosJSONObj.uf;
            } else {
                // Se a requisição falhou, mostra o modal de erro
                $('#errorModal').modal('show');
            }
        }
    }; 

    // Envia a requisição
    xmlHttp.send();
}