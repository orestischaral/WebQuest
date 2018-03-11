 <template>
    <div style="margin:auto">  
      <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
       
                  <form @submit.prevent="signStudent">
                      <v-container>
                          <v-layout row wrap>
                              <v-flex xs12>
                                  <v-text-field
                              name="Name"
                              label="Όνομα"
                              id="name"
                              v-model="name"
                              required></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                  <v-text-field
                              name="Surname"
                              label="Επώνυμο"
                              id="surname"
                              v-model="surname"
                              required></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                   <v-select
                                     :items="items"
                                     v-model="studentClass"
                                     label="Επιλέξτε την τάξη σας"
                                     item-value="text"
                                     required
                              ></v-select>
                              </v-flex>
                              <v-flex xs12>
                                  <div style="display: flex; align-items: center; justify-content: center;">
                                      <v-btn type="submit">Continue</v-btn>
                                  </div>

                              </v-flex>
                          </v-layout>
                      </v-container>
                      </form>  
      </v-card>
      </v-flex>
  </div>
  
 </template>

 <script>
 export default {
   data () {
     return {
       items: ['A Γυμνασίου', 'Β Γυμνασίου', 'Γ Γυμνασίου', 'Α Λυκείου', 'Β Λυκείου', 'Γ Λυκείου'],
       name: '',
       surname: '',
       id: '',
       studentClass: null
     }
   },
   computed: {
     formIsValid () {
       return this.name !== '' &&
          this.surname !== '' &&
          this.studentClass !== null
     },
     user () {
       return this.$store.getters.user
     }
   },
   methods: {
     signStudent () {
       if (!this.formIsValid) {
         return
       }
       const StudentData = {
         name: this.name,
         surname: this.surname,
         age: this.age,
         id: this.user.id,
         image: this.image,
         class: this.studentClass
       }
       this.$store.dispatch('signStudent', StudentData)
       this.$store.dispatch('signProcess')
       this.$router.push('/')
     }
   }
 }
 </script>
 