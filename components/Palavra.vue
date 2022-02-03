<!-- Please remove this file from your project -->
<template>
<div>
    <v-row style = "margin-bottom:20px">
    <v-col><p> Pontos : {{pontos}}</p>
   <p>Partidas jogadas : {{numeroPartidas}}</p></v-col>
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
    <v-col></v-col>
     </v-row>
  
    <v-container
  
    style="max-width:70%"
      class="grey "
    >
     <v-row
        no-gutters        
       
      >
        <v-col 
          v-for="(n,indicecoll) in keyBoard1"
          :key="indicecoll"
        >
          <v-card
            align="center"
            class="pa-2"
            outlined
            tile
          >   
          <v-sheet   
          :color="getColorKeyboard(n)"                                     
                height="70"
                width="70"             
            >
            <div v-if="n !== ''">
                <font-awesome-icon size="4x" :icon="['fa', n.toLowerCase()]" />
            </div>
                </v-sheet>

           
          </v-card>
        </v-col>    
      </v-row>
    </v-container>
     <v-container
  
    style="max-width:60%"
      class="grey "
    >
           <v-row
        no-gutters        
       
      >
        <v-col 
          v-for="(n,indicecoll) in keyBoard2"
          :key="indicecoll"
        >
          <v-card
            align="center"
            class="pa-2"
            outlined
            tile
          >   
          <v-sheet 
                :color="getColorKeyboard(n)"                    
                height="70"
                width="70"             
            >
            <div v-if="n !== ''">
                <font-awesome-icon size="4x" :icon="['fa', n.toLowerCase()]" />
            </div>
                </v-sheet>

           
          </v-card>
        </v-col>    
      </v-row>
     </v-container>
      <v-container
  
    style="max-width:40%"
      class="grey "
    >
           <v-row
        no-gutters        
       
      >
        <v-col 
          v-for="(n,indicecoll) in keyBoard3"
          :key="indicecoll"
        >
          <v-card
            align="center"
            class="pa-2"
            outlined
            tile
          >   
          <v-sheet 
                  :color="getColorKeyboard(n)"              
                height="70"
                width="70"             
            >
            <div v-if="n !== ''">
                <font-awesome-icon size="4x" :icon="['fa', n.toLowerCase()]" />
            </div>
                </v-sheet>

           
          </v-card>
        </v-col>    
      </v-row>
     
    
    </v-container>



</div>
</template>

<script>


import {Word} from "@andsfonseca/palavras-pt-br"


export default {
  name: 'Palavra',
    mounted(){  
      
        window.addEventListener('keydown', this.keyPressed); 
        this.selectedWord = Word.getRandomWord(5,true,false,false,false)
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

        getColorKeyboard(letter){
              if(this.colorKeyboard[letter.toLowerCase()] !== undefined){
                  
                    return this.colorKeyboard[letter.toLowerCase()].color 
                }                
                return "grey darken-2"
        
        },

        getColor(it,ic)
        {
         
            if(it+1 > this.numeroTentativa){
                
                return "grey darken-2"
            }
               
            if(this.selectedWord[ic] == this.trys[it][ic])
            {              
               
                this.colorKeyboard[this.trys[it][ic]] = { color :"green darken-2"}           
                return "green darken-2"
            }
              
            if(!this.selectedWord.includes(this.trys[it][ic]))
             {
             if( this.colorKeyboard[this.trys[it][ic]]!= undefined){
                if(  
                (this.colorKeyboard[this.trys[it][ic]].color !== "green darken-2") 
                && this.colorKeyboard[this.trys[it][ic]].color !== "yellow darken-2" ){
                    this.colorKeyboard[this.trys[it][ic]] ={ color :"red darken-2"}
                 }                
             }else
             this.colorKeyboard[this.trys[it][ic]] ={ color :"red darken-2"}
             
                               
                return "red darken-2"
            }
              
               
            if(this.selectedWord.includes(this.trys[it][ic])){
                var ocorrencias = this.getAllIndexes(this.selectedWord,this.trys[it][ic])       
                var flag = true; 
               
                    for (var i = 0 ; i < ocorrencias.length ; i ++){
                        if(this.selectedWord[ocorrencias[i]] !== this.trys[it][ocorrencias[i]]){
                            flag = false
                        }
                    
                }
                if(!flag){
                    if( this.colorKeyboard[this.trys[it][ic]]!= undefined  ){
                        if(this.colorKeyboard[this.trys[it][ic]].color !== "green darken-2")
                              this.colorKeyboard[this.trys[it][ic]] ={ color :"yellow darken-2"}
                    }else
                         this.colorKeyboard[this.trys[it][ic]] ={ color :"yellow darken-2"}
                   
                    return "yellow  darken-2"
                }
                 return " red darken-2"
            
                
            }
               return "grey darken-2"
            
          
           
        },
        checkExistOnDictionary(){  

            var palavra = this.trys[this.numeroTentativa].join("")
           
            if(Word.checkValid(palavra,5,true)){               
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
              console.log(Word.wordleValidator(this.selectedWord,this.trys[this.numeroTentativa-1].join("")))
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
            this.colorKeyboard =   {}
            this.numeroPartidas ++;

            if(win)
                this.pontos++;
           
            this.selectedWord = Word.getRandomWord(5,true,false,false,false)
            console.log(this.selectedWord)
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
       
            if(event.key == "Enter" ){
                
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
                             
            }
            else if(this.letraLocal <= 4 && this.lettersOnly(event.keyCode) ){
            
                this.trys[this.numeroTentativa][this.letraLocal] = event.key
                this.letraLocal++;
              
                this.$forceUpdate();
            }
            this.$forceUpdate();
    }

    
    },
   data() {
       return{
           colorKeyboard:{},
           keyBoard1 :["Q","W","E","R","T","Y","U","I","O","P"],
           keyBoard2 : ["A","S","D","F","G","H","J","K","L"],
            keyBoard3 :["Z","X","C","V","B","N","M"],
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
          
       }
   }
}
</script>