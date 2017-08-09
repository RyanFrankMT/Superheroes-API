const villainTitle = "The Villains"
const villainFormTitle = "Create New Villain"

const villainApp = new Vue({
  el: '#villain',
  data: {
    title: villainTitle,
    villains: undefined,
    villainFormTitle: villainFormTitle,
    name: '',
    power: '',
    image: '',
    selectedVillain: undefined,
    villainIndex: undefined,
    showEdit: false
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData(){
      const self = this

      $.ajax({
        url: '/api/villains',
        method: 'GET'
      }).done((response) => self.villains = response.data)
    },
    createVillain(){
      let self = this
      let newVillain = {name: this.name,
                    power: this.power,
                    image: this.image
                    }

      $.ajax({
        url: '/api/villains',
        method: 'POST',
        data: newVillain
      }).done((response) => console.log(response))
    },
    deleteVillain(villain_id){
      const self = this

      $.ajax({
        url: `/api/villains/${villain_id}`,
        method: 'DELETE'
      }).done((response) => self.loadData())
    },
    toggleEdit(villain_id, index){
      this.showEdit = !this.showEdit
      this.selectedVillain = (this.showEdit) ? villain_id : undefined
      this.villainIndex = (this.showEdit) ? index: undefined
    },
    editVillain(){
      const self = this

      const modifiedVillain = {
        name: (self.name.length > 0) ? self.name : null,
        power: (self.power.length > 0) ? self.power : null,
        image: (self.image.length > 0) ? self.image : null
      }
      $.ajax({
        url: `/api/villains/${villain_id}`,
        method: 'PUT',
        data: modifiedVillain
      }).done((response) => {
        self.villains[self.villainIndex] = response.data;
        self.showEdit = false
      })
    }
  }
})
