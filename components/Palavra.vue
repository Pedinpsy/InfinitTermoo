<!-- Please remove this file from your project -->
<template>
<div>
    
    <v-container
  
    style="max-width:600px"
      class="grey align-content-center"
       align="center"
       align-content=" center"
    >
     <v-row
     
        class="align-content-center"
        no-gutters        
         v-for="(rowTry,indiceTry) in trys"
         :key="indiceTry"  
      >
        <v-col class="align-content-center"
          v-for="(n,indicecoll) in rowTry"
          :key="indicecoll"
        >
          <v-card
            align="center"
            class="pa-2"
            outlined
            tile
          >   
          <v-sheet class="align-content-center"
                :color="getColor(indiceTry,indicecoll)"
                elevation="24"
                height="80"
                width="80"
                align-self="center"
            >
                {{n}}
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
        getColor(it,ic)
        {
            if(it+1  > this.numeroTentativa)
                return "grey darken-2"
            if(this.selectedWord[ic] == this.trys[it][ic])
                return "green darken-2"
            if(!this.selectedWord.includes(this.trys[it][ic]))
                return "red darken-2"
            if(this.selectedWord.includes(this.trys[it][ic]))
                return "yellow darken-2"
            
          
           
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


        keyPressed(event){
            console.log(this.trys)
            if(event.key == "Enter" ){
                console.log("enter")
                if(this.letraLocal == 5 && !this.checkExistOnDictionary()){
                    alert("Palavra não existe")
                }else if (this.letraLocal == 5 && this.checkExistOnDictionary()){
                    
                    this.numeroTentativa++
                    this.letraLocal = 0
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
            tentativa:0,
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