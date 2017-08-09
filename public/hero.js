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
    selectedHero: undefined,
    heroIndex: undefined,
    showEdit: false
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData(){
      const self = this

      $.ajax({
        url: '/api/superheroes',
        method: 'GET'
      }).done((response) => self.heroes = response.data)
    },
    createHero(){
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
    },
    deleteHero(hero_id){
      const self = this

      $.ajax({
        url: `/api/superheroes/${hero_id}`,
        method: 'DELETE'
      }).done((response) => self.loadData())
    },
    toggleEdit(hero_id, index){
      this.showEdit = !this.showEdit
      this.selectedHero = (this.showEdit) ? hero_id : undefined
      this.heroIndex = (this.showEdit) ? index: undefined
    },
    editHero(){
      const self = this

      const modifiedHero = {
        name: (self.name.length > 0) ? self.name : null,
        superpower: (self.superpower.length > 0) ? self.superpower: null,
        image: (self.image.length > 0) ? self.image : null
      }
      $.ajax({
        url: `/api/superheroes/${self.selectedHero}`,
        method: 'PUT',
        data: modifiedHero
      }).done((response) => {
        self.heroes[self.heroIndex] = response.data;
        self.showEdit = false
      })
    }
  }
})
