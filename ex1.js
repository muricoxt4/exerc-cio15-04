const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pergunta = (texto) => new Promise((resolve) => rl.question(texto,resolve));


let lembretes = []

menu ();

function menu(){
    console.log("====MENU LEMBRETES===")
    console.log("1. Adicionar lembrete.")
    console.log("2. Listar lembretes.")
    console.log("3. Editar lembretes.")
    console.log("4. Marcar lembrete como concluído.")
    console.log("5. Fechar menu.")

    rl.question("\nSelecione a opção desejada: ", inputMenu =>{ 
        let opcao = Number(inputMenu)
            switch (opcao){
                case 1:
                    adicionarLembrete();
                    break
                case 2: 
                    listarLembretes();
                    break
                case 3:
                    editarLembretes();
                    break
                case 4:
                    marcarConcluido();
                    break
                case 5:
                    fecharMenu();
                    break
                default:
                    console.log("Digite uma opção válida! Retorando ao menu...\n")
                    menu();
                    break
            }
    })
}

async function adicionarLembrete(){
    const adcLembrete = await pergunta("Qual o nome do lembrete a ser adicionado? R: ")
    const dataLembrete = await pergunta("Qual o prazo (data) para conclusão? (Ex: amanhã, hoje, 01/04....) R: ")
    let maisLembretes = await pergunta("Deseja adicionar mais lembretes? (Responda apenas com: s ou n) R: ")
    console.log("\n")

    maisLembretes = maisLembretes.toLowerCase()

        let lembreteAdicionado = {
            nomeLembrete: adcLembrete,
            dataLembrete: dataLembrete,
            statusLembrete: "Pendente"
        }
        lembretes.push(lembreteAdicionado)

        if (maisLembretes === "s"){
            return adicionarLembrete()
        } else{
            console.log(`Lembrete adicionado: ${lembreteAdicionado.nomeLembrete}, ${lembreteAdicionado.dataLembrete}, ${lembreteAdicionado.statusLembrete}!`)
            console.log("Retornando ao menu.... \n")
            return menu()
        }


}

function listarLembretes(){

    if (lembretes.length === 0){
        console.log("Não há lembretes cadastrados. Cadastre um para listá-los.\n")
        return menu()
    }

    lembretes.forEach((lembrete, i) =>{
        console.log(`${i + 1}. Nome: ${lembretes[i].nomeLembrete}. Data: ${lembretes[i].dataLembrete}. Status: ${lembretes[i].statusLembrete}.`)
    })
    console.log("\nRetornando ao menu inicial... \n")
    menu()
}

async function editarLembretes(){

    if (lembretes.length === 0){
        console.log("Não há lembretes cadastrados. Cadastre um para editá-los. \n")
        return menu()
    }

    let perguntaPrimaria = await pergunta("Você lembra o número do lembrete? Senão, retorne ao menu e verifique. (Responda com sim ou não). R: ")
    perguntaPrimaria = perguntaPrimaria.toLowerCase()

    if (perguntaPrimaria !== "sim"){
        console.log("Retornando ao menu...\n")
        menu()
    } 

    let indiceEdicao = await pergunta("Digite o número do lembrete a ser ajustado (apenas números): R: ")
        indiceEdicao = Number(indiceEdicao - 1)

    const adcLembrete = await pergunta("Qual o novo nome do lembrete? R: ")
    const dataLembrete = await pergunta("Qual o novo prazo (data) para conclusão? R: ")
    let maisLembretes = await pergunta("Deseja adicionar editar mais lembretes? (Responda apenas com: s ou n) R: ")
    console.log("\n")
    maisLembretes = maisLembretes.toLowerCase()

    let lembreteEdicao = { 
        nomeLembrete: adcLembrete,
        dataLembrete: dataLembrete,
        statusLembrete: "Pendente"
    }

    lembretes[indiceEdicao] = lembreteEdicao

    if (maisLembretes === "s"){
        editarLembretes()
    } else{
        console.log(`Lembrete editado: ${lembreteEdicao.nomeLembrete}, ${lembreteEdicao.dataLembrete}, ${lembreteEdicao.statusLembrete}!`)
        console.log("Retornando ao menu.... \n")
        menu()
    }
}

async function marcarConcluido(){

    if (lembretes.length === 0){
        console.log("Não há lembretes cadastrados. Cadastre um para concluí-los. \n")
        menu()
    }

    let perguntaPrimaria = await pergunta("Você lembra o número do lembrete? Senão, retorne ao menu e verifique. (Responda com sim ou não). R: ")
    perguntaPrimaria = perguntaPrimaria.toLowerCase()

    if (perguntaPrimaria !== "sim"){
        console.log("Retornando ao menu...\n")
        menu()
    } 

    let indiceEdicao = await pergunta("Digite o número do lembrete a ser marcado como concluído (apenas números): R: \n")
        indiceEdicao = Number(indiceEdicao - 1)

    lembretes[indiceEdicao].statusLembrete = "Concluído"

    console.log(`Lembrete editado: ${lembretes[indiceEdicao].nomeLembrete}. Data: ${lembretes[indiceEdicao].dataLembrete}. Status: ${lembretes[indiceEdicao].statusLembrete}!`)
    console.log("Retornando ao menu... \n")
    menu()
}

function fecharMenu(){
    console.log("Fechando menu... muito obrigado!")
    rl.close()
}
