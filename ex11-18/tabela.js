var btnAdd = document.querySelector(".add");
var dadoNome = document.querySelector(".inputNome");
var dadoIdade = document.querySelector(".inputIdade");
var tbody = document.querySelector(".tabelaCtn");
var id = 0;

// Verifica se o botao de salvar clicado
btnAdd.addEventListener("click", function(){
    if(dadoNome.value != '' && dadoIdade.value != ''){
        if(filtroNome(dadoNome.value)){
            addPessoa(dadoNome.value, dadoIdade.value);
        }
        else{
            window.alert("Nome ja em uso na tabela!!!")
        }
    }
    else{
        window.alert("Preencha o(s) campo(s) do formulario!!!")
    }
})

// Add uma pessoa na tabela
function addPessoa(nome, idade){
    let row = tbody.insertRow(-1);
    id++;
    row.classList = 'row' + id;
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);

    let btnRemove = '<button class="btn btn-danger" onclick="remover('+  id + ')">Remover</button>'
    let btnEdit = '<button class="btn btn-edit" onclick="edit('+  id + ')">Editar</button>'

    c1.innerHTML = nome;
    c2.innerHTML = idade;
    c3.innerHTML = btnRemove + btnEdit;
    dadoNome.value = '';
    dadoIdade.value = '';
}

// Verifica se repetiu o nome
function filtroNome(nome){
    if(tbody.rows.length > 0){
        for(let i = 0; i <= tbody.rows.length; i++){
            if(tbody.rows[i].cells[0].innerText != nome){
                return true;
            }
            else{
                return false;
            }
        }
    }else{
        return true;
    }
}

// Remove uma linha da tabela
function remover(index){
    if(confirm("Deseja apagar esta linha?")){
        let delLinha = document.querySelector( '.row' +  index);
        tbody.removeChild(delLinha);
    }
}

// Desbloqueia a edicao da linha da tabela
function edit(index){
    let c1 = document.querySelector( '.row' +  index).children[0];
    let dadoC1 = c1.textContent;
    let c2 = document.querySelector( '.row' +  index).children[1];
    let dadoC2 = c2.textContent;
    let c3 = document.querySelector( '.row' +  index).children[2];

    c1.innerHTML = '<input type="text" name="editNome" id="editNome" class="editNome'+index+'" value="'+ c1.textContent +'">'
    c2.innerHTML ='<input type="number" name="editIdade" id="editIdade" min="0" step="0" class="editIdade'+index+'" value="'+ c2.textContent +'">'
    c3.innerHTML = '<button class="btn btn-danger" onclick="cancelEdit('+  index + ',\'' + dadoC1 + '\',\'' + dadoC2+'\')">Cancelar</button><button class="btn btn-saveEdit" onclick="saveEdit('+  index + ')">Salvar</button>'
} 

// Cancela a edicao
function cancelEdit(index, valC1, valC2){
    let c1 = document.querySelector( '.row' +  index).children[0];
    let c2 = document.querySelector( '.row' +  index).children[1];
    let c3 = document.querySelector( '.row' +  index).children[2];
    
    c1.innerHTML = valC1;
    c2.innerHTML = valC2;
    c3.innerHTML = '<button  class="btn btn-danger" onclick="remover('+  index + ')">Remover</button><button class="btn btn-edit" onclick="edit('+  index + ')">Editar</button>'

}

//Salva a edicao 
function saveEdit(index){
    let c1 = document.querySelector( '.row' +  index).children[0];
    let c2 = document.querySelector( '.row' +  index).children[1];
    let c3 = document.querySelector( '.row' +  index).children[2];
    let valC1 = document.querySelector('.editNome' + index).value;
    let valC2 = document.querySelector('.editIdade' + index).value;

    c1.innerHTML = valC1;
    c2.innerHTML = valC2;
    c3.innerHTML = '<button class="btn btn-danger" onclick="remover('+  index + ')">Remover</button><button class="btn btn-edit" onclick="edit('+  index + ')">Editar</button>';
}