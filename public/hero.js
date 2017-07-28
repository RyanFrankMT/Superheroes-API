const title = "Superheroes Adavanced"

const app = new Vue({
  el: '#app',
  data: {
    title: title,
    heroes: undefined,
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData: function(){
      let self = this

      $.ajax({
        url: '/api/superheroes',
        method: 'GET'
      }).done((response) => self.heroes = response.data)
    }
  }
})
