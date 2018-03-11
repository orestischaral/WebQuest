 <template>
    <div style="margin:auto">
       <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
                  <form @submit.prevent="signTeacher">
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
                                     v-model="role"
                                     label="Επιλέξτε ειδικότητα"
                                     item-value="text"
                                     multiple
                                     id="role"
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
       items: ['Πληροφορικής', 'Φυσικής', 'Μαθηματικών', 'Βιολογίας', 'Χημείας'],
       name: '',
       surname: '',
       age: '',
       image: null,
       imageUrl: '',
       id: '',
       email: '',
       role: null
     }
   },
   computed: {
     formIsValid () {
       return this.name !== '' &&
          this.surname !== '' &&
          this.role !== null
     },
     user () {
       return this.$store.getters.user
     }
   },
   methods: {
     signTeacher () {
       if (!this.formIsValid) {
         return
       }
       const TeacherData = {
         name: this.name,
         surname: this.surname,
         role:this.role,
         id: this.user.id,
       }
       this.$store.dispatch('signTeacher', TeacherData)
       this.$store.dispatch('signProcess')
       this.$router.push('/')
     }
   }
 }
 </script>
 