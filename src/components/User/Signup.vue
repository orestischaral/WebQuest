<template fill-height style="height:100%" inherit>
  <v-container >
      <v-layout row v-if="error">
          <v-flex style="margin:auto">
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
      </v-layout>
      <v-layout>
          <v-flex xs12 sm6 offset-sm3>
              <v-card >
                  <v-card-title>
                      <div > <h4>Sign up</h4></div>
                  </v-card-title>
                  <v-card-text>
                      <form @submit.prevent="onSignup">
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
                                  <v-text-field
                              name="confirmPassword"
                              label="Confirm Password"
                              id="confirmPassword"
                              type="password"
                              maxlength="16"
                              v-model="confirmPassword"
                              required
                              :rules="[comparePasswords]"></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                   <v-select
                                     :items="items"
                                     v-model="role"
                                     label="Role"
                                     item-value="text"
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
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      items: [ 'Teacher', 'Student' ],
      role: ''
    }
  },
  computed: {
    comparePasswords () {
      if (this.password === this.confirmPassword) {
        return true
      } else {
        return 'Passwords do not match'
      }
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== undefined && value !== null && this.role === this.items[0]) {
        console.log('direct to upload')
        this.$router.push('/signup/teacher')
      } else {
        this.$router.push('/signup/student')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUser', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearlogEr')
      console.log('Dismissed alert')
    }
  }
}
</script>
