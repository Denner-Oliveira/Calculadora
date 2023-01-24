const numeros = document.querySelectorAll('.numero');
const operadores = document.querySelectorAll('.operadores');
const igual = document.querySelector('#igual');
const resp = document.querySelector('#calc');
const visor = document.querySelector('#dig');
const ce = document.querySelector('#CE');
const c = document.querySelector('#C');
const porcent = document.querySelector('#porcentagem');

let arr0 = [];      //ARRAY DE NÚMENOS INSERIDOS
let arr1 = [];      //ARRAY PARA O CÁLCULO
let count = 0;      //CONTAGEM DE OPERAÇÕES 
let resultado = 0;  //VARIÁVEL DO RESULTADO DAS OPERAÇÕES
let valor;          //VARIÁVEL PARA INSERIR VALORES NO ARRAY DE CÁLCULO

operadores.forEach((elemento)=>elemento.addEventListener('click',()=>calculo(elemento.textContent)));
numeros.forEach((elemento)=>elemento.addEventListener('click',()=>calculo(elemento.textContent)));
igual.addEventListener('click',operacao);
ce.addEventListener('click', apagaCalc);
c.addEventListener('click', apagaVisor);
porcent.addEventListener('click',()=>calculo(porcent.textContent));

function calculo(a){

    if(Number(a) || a == 0 || a == '.'){

        if(!arr0.includes('.') || a != '.'){        //CONDIÇÃO PARA NÃO INCLUIR MAIS DE 1 PONTO NO ARRAY

            arr0.push(a);

        }
        visor.textContent = arr0.join('');           //CÓDIGO PARA INSERIR VALORES NO 'VISOR'

    }else{

        if(arr0.length>1){                          //CONDIÇÃO PARA 'CONSERTAR' OS NÚMEROS INSERIDOS

            valor = arr0.reduce((x,y)=>x+y);        //SOMA AS STRINGS DOS NÚMEROS INSERIDAS

        }else{

            valor = arr0[0];                        //

        }
        if(valor){                                  //
            
            arr1.push(valor);                       //INSERE OS DADOS NO SEGUNDA ARRAY(DE CÁLCULOS)
            resp.textContent = valor+a;             //MOSTRA A CONTA ATUAL ACIMA DO VISOR

            if(count == 0){                         //CONDIÇÃO PARA CONTAGEM DE CÁLCULOS

                arr1.push(a);                       //
                visor.textContent = '';             //
                count++;                            //
                arr0 = [];                          //ZERA O ARRAY DE VALORES INSERIDOS

            }else{                                  //SE HOUVER MAIS DE UM CÁLCULO PARA FAZER CONCLUI O INSERIDO PRIMEIRO

                operacao();                         //CHAMA A FUNÇÃO PARA RESOLVER
                visor.textContent = '';             //RETIRA O VALOR DO VISOR
                resp.textContent = resultado + a;   //INSERE O RESULTADO ACIMA DO VISOR 'UM NOVO CÁLCULO PODE SER INSERIDO'
                arr1.push(resultado);               //
                arr1.push(a);                       //
                
            }
        }
    }
}

function operacao(){

    if(arr0.length>0){

        let a = arr0.reduce((a,b)=>a+b);
        arr1.push(a);

    }
    if(arr1.includes('+')){

        let indice = arr1.indexOf('+');
        arr1.splice(indice,1);
        soma(Number(arr1[0]),Number(arr1[1]));

    }else if(arr1.includes('-')){

        let indice = arr1.indexOf('-');
        arr1.splice(indice,1);
        sub(Number(arr1[0]),Number(arr1[1]));

    }else if(arr1.includes('*')){

        let indice = arr1.indexOf('*');
        arr1.splice(indice,1);
        mult(Number(arr1[0]),Number(arr1[1]));

    }else if(arr1.includes('/')){

        let indice = arr1.indexOf('/');
        arr1.splice(indice,1);
        div(Number(arr1[0]),Number(arr1[1]));

    }else if(arr1.includes('%')){

        let indice = arr1.indexOf('%');
        arr1.splice(indice,1);
        porcentagem(Number(arr1[0]),Number(arr1[1]));

    }
    if(resultado || resultado == 0){

        visor.textContent = resultado;
        arr0 = [];
        arr1 = [];
        resp.textContent = '';

    }else{

        visor.textContent = 'ERRO';

    }
}

function apagaVisor(){

    arr0 = [];
    visor.textContent = '0';
    console.log(resultado);
    console.log(arr1);

}

function apagaCalc(){

    resp.textContent = '';
    visor.textContent = '';
    arr0 = [];
    arr1 = [];
    count = 0;
    resultado = 0;
    visor.textContent = '0';

}

function soma(x,y){

    resultado = x+y;

}

function sub(x,y){

    resultado = x - y;

}

function mult(x,y){

    resultado = x * y;

}

function div(x,y){

    resultado = x / y;

}

function porcentagem(x,y){
    
    resultado = x / 100 * y;

}
