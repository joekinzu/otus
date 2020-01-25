<template>
    <div>
        Result {{correctAnswers}} of {{Tries-1}} 
        <hr>
        <button @click="stop">Stop</button>
        {{currentTime}} seconds left
        <div>
          <p>
              <span>{{firstNumber}}</span>
              <span> {{currentOperation}} </span>
              <span :style="`color: ${userInputColor}`">{{userAnswer}}</span>
              <span> = </span>
              <span>{{resultNumber}} </span>
              <span>? </span>
          </p>
        </div>
        <ul>
          <li>
            <button @click="digin(1)">1</button>
            <button @click="digin(2)">2</button>
            <button @click="digin(3)">3</button>
          </li>
          <li>
            <button @click="digin(4)">4</button>
            <button @click="digin(5)">5</button>
            <button @click="digin(6)">6</button>
          </li>
          <li>
            <button @click="digin(7)">7</button>
            <button @click="digin(8)">8</button>
            <button @click="digin(9)">9</button>
          </li>
          <li>
            <button @click="digout()">&#60;</button>
            <button @click="digin(0)">0</button>
            <button @click="equal()">=</button>
          </li>
        </ul>             
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    id: 'GamePage',
    data() {
      return {
        level: this.$store.state.level,
        operations: this.$store.state.operations,
        resultarray: this.$store.state.resultarray,
        currentTime: this.$store.state.time,
        currentOperation: '+',
        timer: null,
        userInput: [],
        userInputColor: 'gray',
        firstNumber: 0,
        secondNumber: 0,
        resultNumber: 0,
        Tries: 0,
        correctAnswers: 0,
        pause: false
      }
    },

    computed: {
      userAnswer() {
        const underscoreCount = this.level - this.userInput.length
        return ('_'.repeat(underscoreCount) + this.userInput.join('')).substring(0, this.level)
      },
    },

    methods: {
      ...mapMutations([
        'setTries',
        'setcorrectAnswers',
        'setResultArray'
      ]),

      start() {
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.currentTime > 0) {
              if (!this.pause) {
                this.currentTime--
              }
            } else {
              this.pause = true
              this.stop()
            }
          }, 1000)
        }
      },

      stop() {
        clearInterval(this.timer)
        this.setTries({amount: this.Tries})
        this.setcorrectAnswers({amount: this.correctAnswers})
        this.resultarray.push({time: new Date, answers: this.correctAnswers, tries: this.Tries})
        this.setResultArray({amount: this.resultarray})
        this.$router.push('/')
      },

      digin(value) {
        this.level > this.userInput.length ? this.userInput.push(value) : this.userInput
      },

      digout() {
        this.userInput.pop()
      },

      equal() {
        if (this.checkUserInput()) {
            this.correctAnswers++;
            this.userInputColor = 'green';
          } else {
            this.userInputColor = 'red';
          }
        this.pause = true;
        setTimeout(this.generateTask, 500)
      },

      generateTask() {
        this.pause = false
        this.Tries++
        const opIndex = Math.floor(Math.random() * this.operations.length)
        this.currentOperation = this.operations[opIndex]
        this.userInput = []
        this.userInputColor = 'gray'
        const levelSet = Math.pow(10, this.level) - 1
        this.prepareTask(levelSet)
      },

      prepareTask(levelSet) {
        let tempVar
        this.firstNumber = Math.floor(Math.random() * levelSet) + 1
        this.secondNumber = Math.floor(Math.random() * levelSet) + 1
        switch (this.currentOperation) {
          case '+':
            this.resultNumber = this.firstNumber + this.secondNumber
            return
          case '-':
            tempVar = this.firstNumber
            this.resultNumber = this.firstNumber + this.secondNumber
            this.firstNumber = this.resultNumber
            this.resultNumber = tempVar
            return
          case '×':
            this.resultNumber = this.firstNumber * this.secondNumber
            return
          case '÷':
            tempVar = this.firstNumber
            this.resultNumber = this.firstNumber * this.secondNumber
            this.firstNumber = this.resultNumber
            this.resultNumber = tempVar
            return
        }
      },
      checkUserInput() {
        return parseInt(this.userInput.join('')) === this.secondNumber
      }
    },
    mounted() {
      this.generateTask()
      this.start()
    }
  }
</script>
<style scoped>
  li {
      list-style-type: none;
  }
</style>
