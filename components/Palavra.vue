
<template>
  <div>
    <div class="title">Título</div>
    <div class="game">
      <div class="stats">
        <p>Pontos: {{ pontos }}</p>
        <p>Partidas jogadas: {{ numeroPartidas }}</p>
      </div>
      <div class="blocks">
        <div class="line" v-for="(rowTry, indiceTry) in trys" :key="indiceTry">
          <div
            class="letter"
            v-for="(n, indicecoll) in rowTry"
            :key="indicecoll"
            :class="[getColor(indiceTry, indicecoll), ( numeroTentativa == indiceTry && letraLocal == indicecoll ? 'selected' : '')]" 
          >
            <div>{{ n }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="keyboard">
      <div class="line">
        <div class="letter" :class="getColorKeyboard('Q')">
          <div>Q</div>
        </div>
        <div class="letter" :class="getColorKeyboard('W')">
          <div>W</div>
        </div>
        <div class="letter" :class="getColorKeyboard('E')">
          <div>E</div>
        </div>
        <div class="letter" :class="getColorKeyboard('R')">
          <div>R</div>
        </div>
        <div class="letter" :class="getColorKeyboard('T')">
          <div>T</div>
        </div>
        <div class="letter" :class="getColorKeyboard('Y')">
          <div>Y</div>
        </div>
        <div class="letter" :class="getColorKeyboard('U')">
          <div>U</div>
        </div>
        <div class="letter" :class="getColorKeyboard('I')">
          <div>I</div>
        </div>
        <div class="letter" :class="getColorKeyboard('O')">
          <div>O</div>
        </div>
        <div class="letter" :class="getColorKeyboard('P')">
          <div>P</div>
        </div>
      </div>
      <div class="line">
        <div class="letter" :class="getColorKeyboard('A')">
          <div>A</div>
        </div>
        <div class="letter" :class="getColorKeyboard('S')">
          <div>S</div>
        </div>
        <div class="letter" :class="getColorKeyboard('D')">
          <div>D</div>
        </div>
        <div class="letter" :class="getColorKeyboard('F')">
          <div>F</div>
        </div>
        <div class="letter" :class="getColorKeyboard('G')">
          <div>G</div>
        </div>
        <div class="letter" :class="getColorKeyboard('H')">
          <div>H</div>
        </div>
        <div class="letter" :class="getColorKeyboard('J')">
          <div>J</div>
        </div>
        <div class="letter" :class="getColorKeyboard('K')">
          <div>K</div>
        </div>
        <div class="letter" :class="getColorKeyboard('L')">
          <div>L</div>
        </div>
        <div class="letter">
          <div>⌫</div>
        </div>
      </div>
      <div class="line">
        <div class="letter" :class="getColorKeyboard('Z')">
          <div>Z</div>
        </div>
        <div class="letter" :class="getColorKeyboard('X')">
          <div>X</div>
        </div>
        <div class="letter" :class="getColorKeyboard('C')">
          <div>C</div>
        </div>
        <div class="letter" :class="getColorKeyboard('V')">
          <div>V</div>
        </div>
        <div class="letter" :class="getColorKeyboard('B')">
          <div>B</div>
        </div>
        <div class="letter" :class="getColorKeyboard('N')">
          <div>N</div>
        </div>
        <div class="letter" :class="getColorKeyboard('M')">
          <div>M</div>
        </div>
        <div class="letter big">
          <div>↵</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Word } from "@andsfonseca/palavras-pt-br";

export default {
  name: "Palavra",
  mounted() {
    window.addEventListener("keydown", this.keyPressed);
    this.selectedWord = Word.getRandomWord(5, true, false, false, false);
  },

  computed: {},
  methods: {
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
    lettersOnly(number) {
      var charCode = number;

      if (charCode > 64 && charCode < 91) return true;
      else return false;
    },
    checkWin() {
      console.log(
        Word.wordleValidator(
          this.selectedWord,
          this.trys[this.numeroTentativa - 1].join("")
        )
      );
      if (this.selectedWord === this.trys[this.numeroTentativa - 1].join("")) {
        return true;
      } else if (this.numeroTentativa > 4) {
        alert("Voce perdeu burro: a palavra correta era:" + this.selectedWord);
        this.resetBoard(false);
      }
      return false;
    },
    resetBoard(win) {
      this.colorKeyboard = {};
      this.numeroPartidas++;

      if (win) this.pontos++;

      this.selectedWord = Word.getRandomWord(5, true, false, false, false);
      console.log(this.selectedWord);
      this.trys = [
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
      if (event.key == "Enter") {
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
      if (event.code == "Backspace" && this.letraLocal != 0) {
        this.trys[this.numeroTentativa][this.letraLocal - 1] = "";
        this.letraLocal--;
        this.$forceUpdate();
      } else if (this.letraLocal <= 4 && this.lettersOnly(event.keyCode)) {
        this.trys[this.numeroTentativa][this.letraLocal] = event.key;
        this.letraLocal++;

        this.$forceUpdate();
      }
      this.$forceUpdate();
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
      trys: [
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