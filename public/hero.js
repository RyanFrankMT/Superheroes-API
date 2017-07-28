const title = "Superheroes Adavanced"
const heroFormTitle = "Create New Hero"

const app = new Vue({
  el: '#app',
  data: {
    title: title,
    heroes: undefined,
    heroFormTitle: heroFormTitle,
    name: '',
    superpower: '',
    image: '',
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
    },
    createHero: function(){
      let self = this
      let newHero = {name: this.name,
                    superpower: this.superpower,
                    image: this.image
                    }

      $.ajax({
        url:'/api/superheroes',
        method: 'POST',
        data: newHero
      }).done((response) => console.log(response))
    }
  }
})
