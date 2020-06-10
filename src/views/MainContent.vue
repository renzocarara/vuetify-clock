<template>
    <v-container class="main-content">
      <v-row class="text-center">
        <v-col cols="12" class="pt-0 pb-0">
          <v-img
            :src="require('../assets/clock.png')"
            class="clock-img"
            contain
          />
        </v-col>

        <v-col cols="12" class="">
          <h1 class="font-weight-bold">Welcome to Vuetify-Clock</h1>
          <p class="subheading font-weight-regular mb-0">Get the time in words</p>
        </v-col>

        <v-col cols="12" class="">
          <v-alert class="blue--text time-in-numbers mb-0 mr-3"
              dense
              color="#a9d8fc"
              elevation="5"
              >
              <h3 class="time-in-numbers"><strong><span class="hours">{{h.val}}</span> : <span class="minutes">{{m.val>9 ? m.val : '0' + m.val}}</span></strong></h3>  
          </v-alert>
          <v-btn class="mx-2" fab dark color="primary" x-small title="Get current time">
                <v-icon dark @click="setCurrentTime">mdi-clock-outline</v-icon>
              </v-btn>
        </v-col>

        <v-col cols="12" class="">
          <v-alert class="blue--text time-in-words mb-0"
              dense
              color="#a9d8fc"
              elevation="5"
              >
                <h2>{{ timeInWords(h.val, m.val) }}</h2>
          </v-alert>
        </v-col>

        <v-col cols="12" class="mt-8 mb-4">
            <v-card flat color="transparent"> 
                <v-slider 
                  v-model="h.val"
                  :label="h.label"
                  thumb-label="always"
                  :thumb-color="h.color"
                  :thumb-size="h.size"
                  min="1"
                  max="12"
                  inverse-label
                  ticks="always"
                  tick-size="4"
                  :tick-labels="hourstTicksLabels"

                ></v-slider>
            </v-card>
        </v-col>

        <v-col cols="12" class="mb-10">
            <v-card flat color="transparent">
              <v-slider 
                v-model="m.val"
                :label="m.label"
                thumb-label="always"
                :thumb-color="m.color"
                :thumb-size="m.size"
                inverse-label
                color="red"
                track-color="red"
                min="0"
                max="59"
                ticks="always"
                tick-size="4"
                :tick-labels="minutesTicksLabels"

              ></v-slider>
            </v-card>
        </v-col>

      </v-row>
    </v-container>
</template>

<script>
export default {
    name: "MainContent",

    data() {
        return {
            h: {
                label: "hrs",
                val: this.getCurrentTime().h, // leggo le ore da sistema
                color: "blue"
            },
            m: {
                label: "min",
                val: this.getCurrentTime().m, // leggo i minuti da sistema
                color: "red"
            },

            hourstTicksLabels: this.initTicksLabels(12, 1, 3), // ticks totali, valore iniziale, step
            minutesTicksLabels: this.initTicksLabels(60, 0, 15), // ticks totali, valore iniziale, step

            // contiene tutte le parole per tradurre il tempo numerico in testo
            WORDS: [
                "o' clock",
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
                "nine",
                "ten",
                "eleven",
                "twelve",
                "thirteen",
                "fourteen",
                "quarter",
                "sixteen",
                "seventeen",
                "eighteen",
                "nineteen",
                "twenty",
                "twenty one",
                "twenty two",
                "twenty three",
                "twenty four",
                "twenty five",
                "twenty six",
                "twenty seven",
                "twenty eight",
                "twenty nine",
                "half"
            ]
        };
    },

    methods: {
        setCurrentTime() {
            // DESCRIZIONE:
            // recupero ore e minuti e li assegno alle mie variabili in data()

            this.h.val = this.getCurrentTime().h;
            this.m.val = this.getCurrentTime().m;
        },

        getCurrentTime() {
            // DESCRIZIONE:
            // recupero ore e minuti dall'orario di sistema e li ritorno
            // le ore vengono normalizzate in un formato 1..12 anzichè 0..23

            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            // trasformo le ore da formato 0-23 a quello 1-12
            if (hours > 12 || hours == 0) {
                hours = Math.abs(hours - 12);
            }

            // ritorno un oggetto con 2 proprietà, ore e minuti
            return { h: hours, m: minutes };
        },

        initTicksLabels(total, start, step) {
            // DESCRIZIONE:
            // start indica il valore del primo tick (1 per le ore, 0 per i minuti)
            // inserisco una label numerica ogni "step" ticks
            // restituisco un array di "total" elementi, dovo ho inserito le label solo per alcuni ticks

            let ticksLabels = [];
            for (let i = start; i < total; i++) {
                if (i % step == 0) {
                    ticksLabels.push(i);
                } else {
                    ticksLabels.push("");
                }
            }
            return ticksLabels;
        },
        timeInWords(h, m) {
            // DESCRIZIONE:
            // sostanzialmente il formato dell'ora in parole e' il seguente:
            // MINUTI + UNITA' + PREPOSIZIONE + ORA,
            // fa eccezione il caso in cui i minuti sono uguali a zero, dove il formato diventa:
            // ORA + "O' CLOCK"
            // UNITA' puo valere "minute", "minutes" o ""
            // PREPOSIZIONE può valere "past" o "to"
            // i valori di ORA e MINUTI li leggo da un array di 31 parole usando come indici i valori di ora e minuti letti in input
            // con opportuni aggiustamenti (ovvero i valori da 31 a 59 devono indirizzare gli elementi con indice da 29 a 1)

            let prep; // può valere "to" o "past"
            let unit; // può valere "minutes" o "minute" o ""

            // calcolo la "preposizione" da inserire tra minuti e ore
            m > 30 ? (prep = " to ") : (prep = " past ");

            // aggiusto gli indici (i valori ricevuti in input) per accedere alle parole dell'array
            if (m > 30) {
                m = 60 - m; // se è passata la mezz'ora, mi servono i minuti mancanti alla prossima ora
                if (h == 12) {
                    h = 1; // se sono le dodici ed è passata la mezz'ora, la prossima ora è "one" e non "thirteen"!
                } else {
                    h++;
                }
            }

            // calcolo l'unità da inserie dopo i minuti
            switch (m) {
                default:
                    // tutti i casi diversi da "quarter" e da "one"
                    unit = " minutes";
                    break;
                case 15:
                case 30:
                case 45:
                    // i minuti corrispondono alla parola "quarter", non serve una unità
                    unit = "";
                    break;
                case 1:
                    // i minuti corrispondono alla parola "one"
                    unit = " minute";
            }

            // costruisco la stringa
            if (m == 0) {
                // unica eccezione, i minuti valgono zero devo usare "o' clock"
                return this.WORDS[h] + " " + this.WORDS[m];
            } else {
                // tutti gli altri 59 casi possibili per i differenti valori dei minuti
                return this.WORDS[m] + unit + prep + this.WORDS[h];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>