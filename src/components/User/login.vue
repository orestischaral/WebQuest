<template>
  <v-container style="height:inherit">
    <v-layout row v-if="error">
          <v-flex style="margin:auto;">
              <app-alert @dismissed="onDismissed" :text="error.message" >Hello</app-alert>
          </v-flex>
      </v-layout>
      <v-layout>
          <v-flex xs12 sm6 offset-sm3>
              <v-card style="background-color:white">  <div>
                  <v-card-title>
                     <h4>Sign in</h4>
                  </v-card-title>
                  <v-card-text>
                      <form @submit.prevent="onSignIn">
                      <v-container>
                          <v-layout row wrap>
                              <v-flex xs12>
                                  <v-text-field
                              name="E-mail"
                              label="e-mail"
                              id="email"
                              type="email"
                              v-model="email"
                              required></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                  <v-text-field
                              name="Password"
                              label="Password"
                              id="password"
                              type="password"
                              minlength="7"
                              maxlength="16"
                              v-model="password"
                              required></v-text-field>
                              </v-flex>

                              <v-flex xs12>
                                  <div style="display: flex; align-items: center; justify-content: center;">
                                      <v-btn type="submit">Sign in</v-btn>
                                  </div>

                              </v-flex>
                          </v-layout>
                      </v-container>
                      </form>
                  </v-card-text>
             </div> </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      console.log(this.$store.getters.error)
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    },
    onDismissed () {
      console.log('Dismissed alert')
      this.$store.dispatch('clearlogEr')
    }
  }
}
</script>
