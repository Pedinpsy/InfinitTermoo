
<template>
  <div>
    <!-- <div class="title">Infinitermoo</div> -->
    <div class="game">
      <!-- <div class="stats">
        <p>Pontos: {{ pontos }}</p>
        <p>Partidas jogadas: {{ numeroPartidas }}</p>
      </div> -->
      <div class="blocks">
        <div class="line" v-for="(rowTry, indiceTry) in trys" :key="indiceTry">
          <div
            class="letter"
            v-for="(n, indicecoll) in rowTry"
            :key="indicecoll"
            :class="[
              getColor(indiceTry, indicecoll),
              numeroTentativa == indiceTry && letraLocal == indicecoll
                ? 'selected'
                : '',
            ]"
          >
            <div>{{ n }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="keyboard">
      <div class="line">
        <div class="letter" :class="getColorKeyboard('Q')" @click="onClickKeyboard('q')">
          <div>Q</div>
        </div>
        <div class="letter" :class="getColorKeyboard('W')" @click="onClickKeyboard('w')">
          <div>W</div>
        </div>
        <div class="letter" :class="getColorKeyboard('E')" @click="onClickKeyboard('e')">
          <div>E</div>
        </div>
        <div class="letter" :class="getColorKeyboard('R')" @click="onClickKeyboard('r')">
          <div>R</div>
        </div>
        <div class="letter" :class="getColorKeyboard('T')" @click="onClickKeyboard('t')">
          <div>T</div>
        </div>
        <div class="letter" :class="getColorKeyboard('Y')" @click="onClickKeyboard('y')">
          <div>Y</div>
        </div>
        <div class="letter" :class="getColorKeyboard('U')" @click="onClickKeyboard('u')">
          <div>U</div>
        </div>
        <div class="letter" :class="getColorKeyboard('I')" @click="onClickKeyboard('i')">
          <div>I</div>
        </div>
        <div class="letter" :class="getColorKeyboard('O')" @click="onClickKeyboard('o')">
          <div>O</div>
        </div>
        <div class="letter" :class="getColorKeyboard('P')" @click="onClickKeyboard('p')">
          <div>P</div>
        </div>
      </div>
      <div class="line">
        <div class="letter" :class="getColorKeyboard('A')" @click="onClickKeyboard('a')">
          <div>A</div>
        </div>
        <div class="letter" :class="getColorKeyboard('S')" @click="onClickKeyboard('s')">
          <div>S</div>
        </div>
        <div class="letter" :class="getColorKeyboard('D')" @click="onClickKeyboard('d')">
          <div>D</div>
        </div>
        <div class="letter" :class="getColorKeyboard('F')" @click="onClickKeyboard('f')">
          <div>F</div>
        </div>
        <div class="letter" :class="getColorKeyboard('G')" @click="onClickKeyboard('g')">
          <div>G</div>
        </div>
        <div class="letter" :class="getColorKeyboard('H')" @click="onClickKeyboard('h')">
          <div>H</div>
        </div>
        <div class="letter" :class="getColorKeyboard('J')" @click="onClickKeyboard('j')">
          <div>J</div>
        </div>
        <div class="letter" :class="getColorKeyboard('K')" @click="onClickKeyboard('k')">
          <div>K</div>
        </div>
        <div class="letter" :class="getColorKeyboard('L')" @click="onClickKeyboard('l')">
          <div>L</div>
        </div>
        <div class="letter" @click="onClickKeyboard('Backspace')">
          <div>⌫</div>
        </div>
      </div>
      <div class="line">
        <div class="letter" :class="getColorKeyboard('Z')" @click="onClickKeyboard('z')">
          <div>Z</div>
        </div>
        <div class="letter" :class="getColorKeyboard('X')" @click="onClickKeyboard('x')">
          <div>X</div>
        </div>
        <div class="letter" :class="getColorKeyboard('C')" @click="onClickKeyboard('c')">
          <div>C</div>
        </div>
        <div class="letter" :class="getColorKeyboard('V')" @click="onClickKeyboard('v')">
          <div>V</div>
        </div>
        <div class="letter" :class="getColorKeyboard('B')" @click="onClickKeyboard('b')">
          <div>B</div>
        </div>
        <div class="letter" :class="getColorKeyboard('N')" @click="onClickKeyboard('n')">
          <div>N</div>
        </div>
        <div class="letter" :class="getColorKeyboard('M')" @click="onClickKeyboard('m')">
          <div>M</div>
        </div>
        <div class="letter big" @click="onClickKeyboard('Enter')">
          <div>↵</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4611061654102600"
     crossorigin="anonymous"></script>
<script>
import { Word } from "@andsfonseca/palavras-pt-br";


export default {
  name: "Palavra",
  mounted() {
    window.addEventListener("keydown", this.keyPressed);
    this.selectedWord = Word.getDailyWord(5, true, false, false, false);
 
  },

  computed: {},
  methods: {
    onClickKeyboard(key) {
      
      if (key == "Enter") {
        if (this.letraLocal == 5 && !this.checkExistOnDictionary()) {
          alert("Palavra não existe");
        } else if (this.letraLocal == 5 && this.checkExistOnDictionary()) {
          this.numeroTentativa++;
          this.letraLocal = 0;
          if (this.checkWin()) {
            alert("você ganhou");
            this.resetBoard(true);
          }
        }
        return;
      }

      if (key == "Backspace" && this.letraLocal != 0) {
        this.trys[this.numeroTentativa][this.letraLocal - 1] = "";
        this.letraLocal--;
        this.$forceUpdate();
      } else if (this.letraLocal <= 4 && this.lettersOnly(key)) {
        this.trys[this.numeroTentativa][this.letraLocal] = key.toLowerCase();
        this.letraLocal++;

        this.$forceUpdate();
      }
      this.$forceUpdate();
    },
    getAllIndexes(arr, val) {
      var indexes = [],
        i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
    },

    getColorKeyboard(letter) {
      if (this.colorKeyboard[letter.toLowerCase()] !== undefined) {
        return this.colorKeyboard[letter.toLowerCase()].color;
      }
      return "grey darken-2";
    },

    getColor(it, ic) {
      if (it + 1 > this.numeroTentativa) {
        return "";
      }

      if (this.selectedWord[ic] == this.trys[it][ic]) {
        this.colorKeyboard[this.trys[it][ic]] = { color: "green darken-2" };
        return "correct";
      }

      if (!this.selectedWord.includes(this.trys[it][ic])) {
        if (this.colorKeyboard[this.trys[it][ic]] != undefined) {
          if (
            this.colorKeyboard[this.trys[it][ic]].color !== "green darken-2" &&
            this.colorKeyboard[this.trys[it][ic]].color !== "yellow darken-2"
          ) {
            this.colorKeyboard[this.trys[it][ic]] = { color: "red darken-2" };
          }
        } else
          this.colorKeyboard[this.trys[it][ic]] = { color: "red darken-2" };

        return "wrong";
      }

      if (this.selectedWord.includes(this.trys[it][ic])) {
        var ocorrencias = this.getAllIndexes(
          this.selectedWord,
          this.trys[it][ic]
        );
        var flag = true;

        for (var i = 0; i < ocorrencias.length; i++) {
          if (
            this.selectedWord[ocorrencias[i]] !== this.trys[it][ocorrencias[i]]
          ) {
            flag = false;
          }
        }
        if (!flag) {
          if (this.colorKeyboard[this.trys[it][ic]] != undefined) {
            if (
              this.colorKeyboard[this.trys[it][ic]].color !== "green darken-2"
            )
              this.colorKeyboard[this.trys[it][ic]] = {
                color: "yellow darken-2",
              };
          } else
            this.colorKeyboard[this.trys[it][ic]] = {
              color: "yellow darken-2",
            };

          return "maybe";
        }
        return "wrong";
      }
      return "";
    },
    checkExistOnDictionary() {
      var palavra = this.trys[this.numeroTentativa].join("");

      if (Word.checkValid(palavra, 5, true)) {
        return true;
      } else false;
    },
    lettersOnly(letter) {
     return this.letters.indexOf(letter.toLowerCase()) > -1
    },
    checkWin() {
     
      if (this.selectedWord === this.trys[this.numeroTentativa - 1].join("")) {
        return true;
      } else if (this.numeroTentativa > 5) {
        alert("Voce perdeu burro: a palavra correta era:" + this.selectedWord);
        this.resetBoard(false);
      }
      return false;
    },
    resetBoard(win) {
      this.colorKeyboard = {};
      this.numeroPartidas++;

      if (win) this.pontos++;

      this.selectedWord = Word.getRandomWord(5, true, false, false, false);;
     
      this.trys = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ];

      this.numeroTentativa = 0;
      this.letraLocal = 0;
    },

    keyPressed(event) {
      var key = event.key

      if(event.code == "Backspace")
        key = "Backspace"

      this.onClickKeyboard(key);
    },
  },
  data() {
    return {
      colorKeyboard: {},
      keyBoard1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      keyBoard2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      keyBoard3: ["Z", "X", "C", "V", "B", "N", "M"],
      numeroTentativa: 0,
      pontos: 0,
      numeroPartidas: 1,
      letraLocal: 0,
      selectedWord: "",
      
      letters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
      trys: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ],
      alignments: ["start"],
    };
  },
};
</script>