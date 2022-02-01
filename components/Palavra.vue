<!-- Please remove this file from your project -->
<template>
<div>
  <p> Pontos : {{pontos}}</p>
   <p>Partidas jogadas : {{numeroPartidas}}</p>
    <v-container
  
    style="max-width:600px"
      class="grey "
    >
     <v-row
     
       
        no-gutters        
         v-for="(rowTry,indiceTry) in trys"
         :key="indiceTry"  
      >
        <v-col 
          v-for="(n,indicecoll) in rowTry"
          :key="indicecoll"
        >
          <v-card
            
            align="center"
            class="pa-2"
            outlined
            tile
          >   
          <v-sheet 
                :color="getColor(indiceTry,indicecoll)"
                
                height="70"
                width="70"
             
            >
            <div v-if="n !== ''">
                <font-awesome-icon size="4x" :icon="['fa', n]" />
            </div>
                </v-sheet>

           
          </v-card>
        </v-col>    
      </v-row>
    
    </v-container>


</div>
</template>

<script>

import dataPalavra from "../static/data.json"


export default {
  name: 'Palavra',
    mounted(){  
        window.addEventListener('keydown', this.keyPressed); 
        this.selectedWord = this.todasPalavras[Math.floor(Math.random()*this.todasPalavras.length)]
        console.log(this.selectedWord)
      
    },

    computed:{
    

    },
    methods: {
        getAllIndexes(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
                indexes.push(i);
            }
            return indexes;
        },




        getColor(it,ic)
        {
            if(it+1  > this.numeroTentativa)
                return "grey darken-2"
            if(this.selectedWord[ic] == this.trys[it][ic])
                return "green darken-2"
            if(!this.selectedWord.includes(this.trys[it][ic]))
                return "red darken-2"
            if(this.selectedWord.includes(this.trys[it][ic])){
                var ocorrencias = this.getAllIndexes(this.selectedWord,this.trys[it][ic])       
                var flag = true; 
                
                console.log(ocorrencias)
                    for (var i = 0 ; i < ocorrencias.length ; i ++){
                        if(this.selectedWord[ocorrencias[i]] !== this.trys[it][ocorrencias[i]]){
                            flag = false
                        }
                    
                }
                if(!flag){
                    return "yellow  darken-2"
                }
                 return " red darken-2"
            
                
            }
               return "grey darken-2"
            
          
           
        },
        checkExistOnDictionary(){
            var palavra = this.trys[this.numeroTentativa][0]+this.trys[this.numeroTentativa][1]
            +this.trys[this.numeroTentativa][2]+this.trys[this.numeroTentativa][3]
            +this.trys[this.numeroTentativa][4]
            console.log(palavra)
            if(this.todasPalavras.includes(palavra)){               
                return (true)
                
            }   else false
        },
        lettersOnly(number) 
            {
            var charCode = number;

            if ((charCode > 64 && charCode < 91)  )

                return true;
            else
                return false;
            },
        checkWin(){
                
            if(this.selectedWord === this.trys[this.numeroTentativa-1].join(""))
            {
                return true;
            }else if(this.numeroTentativa >4){
                alert("Voce perdeu burro: a palavra correta era:"+ this.selectedWord)
                this.resetBoard(false)
                
            }
            return false
        },
        resetBoard(win){
            this.numeroPartidas ++;
            if(win)
                this.pontos++;
           
            this.selectedWord = this.todasPalavras[Math.floor(Math.random()*this.todasPalavras.length)]
            this.trys = [
                    ['', '', '', '', ''], 
                   ['', '', '', '', ''], 
                    ['', '', '', '', ''], 
                    ['', '', '', '', ''],
                    ['', '', '', '', '']]
            this.numeroTentativa = 0;
            this.letraLocal = 0;

        },      


        keyPressed(event){
            console.log(this.trys)
            if(event.key == "Enter" ){
                console.log("enter")
                if(this.letraLocal == 5 && !this.checkExistOnDictionary()){
                    alert("Palavra não existe")
                }else if (this.letraLocal == 5 && this.checkExistOnDictionary()){
                    
                    
                    this.numeroTentativa++
                    this.letraLocal = 0
                    if(this.checkWin()){
                        alert("você ganhou")
                        this.resetBoard(true)
                       
                    }
                }
                    
                
                return
            }
            if(event.code == "Backspace" && this.letraLocal !=0 ){
                this.trys[this.numeroTentativa][this.letraLocal-1] = ""
                this.letraLocal--;                
                this.$forceUpdate();
                console.log(this.trys)                
            }
            else if(this.letraLocal <= 4 && this.lettersOnly(event.keyCode) ){
                console.log("insert")
                this.trys[this.numeroTentativa][this.letraLocal] = event.key
                this.letraLocal++;
                console.log(this.trys)
                this.$forceUpdate();
            }
            this.$forceUpdate();
    }

    
    },
   data() {
       return{
           numeroTentativa:0,
           pontos:0,
            numeroPartidas:1,
            letraLocal:0,
            selectedWord:'',
           trys:[
               	['', '', '', '', ''], 
	            ['', '', '', '', ''], 
	            ['', '', '', '', ''], 
	            ['', '', '', '', ''],
                ['', '', '', '', '']],
           alignments: [
        'start'
      ],
           todasPalavras : dataPalavra.palavras.map(e => e.normalize("NFD").replace(/[\u0300-\u036f]/g,""))
       }
   }
}
</script>