<template>
<v-container>
 <v-container fluid grid-list-sm >
      <v-layout row wrap>   
        <v-flex d-flex >
          <v-layout row wrap>
            <v-flex >
              <v-card color="blue lighten-1" dark tile flat class="mt-5 pa-5" style="width:50%; margin:auto;">
                 <h1  style="display: flex; align-items: center; justify-content: center;" >Profile Info</h1>
                <v-icon large style="display: flex; align-items: center; justify-content: center;">account_circle</v-icon><br>
                <h3>Ονομα: {{user.name}} </h3>
                <h3>Επώνυμο:  {{user.surname}}</h3>
                <h3 v-if="isTeacher"> Συμμετέχει ως: Εκπαιδευτικός</h3>
                <h3 v-if="!isTeacher"> Συμμετέχει ως: Μαθητής</h3>
                <h3 v-if="isTeacher"> Ειδικότητα: {{user.speciality}}</h3>
                <h3 v-if="!isTeacher"> Τάξη: {{user.class}}</h3>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        
      </v-layout>
    </v-container>
</v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isTeacher() {
      return this.$store.getters.user.role === "Teacher";
    }
  }
};
</script>
