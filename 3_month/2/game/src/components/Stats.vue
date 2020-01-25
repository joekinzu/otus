<template>
    <div>
        <table>
        <thead>
          <th>Time</th>
          <th>Result</th>
          <th>Success %</th>
        </thead>
        <tbody>
            <tr v-for="result of resultarray" :key="result.id">
                <td>{{result.time}}</td>
                <td>{{result.answers}} of {{result.tries-1}}</td>
                <td>{{percent(result.answers,result.tries-1)}}</td>
            </tr>
        </tbody>
        </table>
        <button @click="backClick">Back</button> 
    </div>
</template>

<script>
  export default {
    id: 'Stats',
    data() {
      return {
        resultarray: this.$store.state.resultarray
      }
    },
    methods: {
      percent(a,b){
        return Math.round((a/b)*100)
      },
      backClick() {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  table, th, td {
    border: 1px solid black
  }
</style>