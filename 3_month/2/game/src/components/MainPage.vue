<template>
    <div class="main-page">
        <h1>New Game</h1>
        <hr>
        <h3>Last Result {{correctAnswers}} of {{Tries-1}} 
          ({{percent(correctAnswers,Tries-1)}} %)</h3>
        <button @click="statsClick">Stats</button>  
        <ul>
          <li>Round Time : <input v-model="roundTime"></li>
          Game Level : <select v-model="level">
            <option disabled value="">Choose game level</option>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </ul>
        <ul>
          operations are: {{checked}}
            <li v-for="operation of operationsarray" :key="operation.id">
                <input type="checkbox" :value="operation.sign" v-model="checked">
                <label>{{operation.title}}</label>
            </li>
        </ul>
        <button @click="handleSubmit">Play</button>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    id: 'MainPage',
    data() {
      return {
        correctAnswers: this.$store.state.correctAnswers,
        Tries: this.$store.state.Tries,
        roundTime: 1000,
        level: 1,
        operationsarray: [
          {id: 'sum', title: 'SUM', sign: '+'},
          {id: 'dif', title: 'DIF', sign: '-'},
          {id: 'mul', title: 'MUL', sign: '×'},
          {id: 'div', title: 'DIV', sign: '÷'}
        ],
        checked: ['+']
      }
    },
    methods: {
      ...mapMutations([
        'setTime',
        'setLevel',
        'setOperations',
      ]),
      percent(a,b){
        return Math.round((a/b)*100)
      },
      handleSubmit() {
        this.setTime({amount: this.roundTime})
        this.setLevel({amount: this.level})
        this.setOperations({amount: this.checked})
        this.$router.push('/game')
      },
      statsClick() {
        this.$router.push('/stats')
      }
    }
  }
</script>
<style scoped>
  li {
      list-style-type: none;
  }
</style>