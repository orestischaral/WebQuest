<template>
<v-container>
    
  <v-stepper v-model="e6" vertical style="width:70%; margin:auto;">
      <v-flex xs12>
            <div style="text-align:center;" class="headline mb-2"><h3> {{quest.title}}</h3>
           </div> 
          </v-flex>

    <v-stepper-step step="1" :complete="e6 > 1">Περίληψη
      
    
    </v-stepper-step>
    <v-stepper-content step="1"> 
      <v-card color="grey lighten-3" class="mb-5" >
        <v-card-media :src="quest.imageUrl" height="400px"></v-card-media>
        <v-card-text class="pa-4">
            <strong>Περίληψη </strong><br>
            {{quest.abstract}} <br>
            <v-divider></v-divider>
            <br>
    <div style= "text-align: right;">
            Τάξη:  {{quest.taksi}} <br>
            Δημιουργός: {{quest.author.name}} <br>
            Ειδκότητα: {{quest.author.speciality}}
            </div>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6=2">Συνεχεια</v-btn>
      <v-btn flat @click="back">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" :complete="e6 > 2"> Εισαγωγή - Στόχοι</v-stepper-step>
    <v-stepper-content step="2">
        <v-card color="grey lighten-3" class="mb-5">
        <v-card-text class="pa-4">
            <strong>Εισαγωγή </strong><br>
            {{quest.intro}} <br>
            <v-divider></v-divider>
            <br>
             <strong>Στόχοι </strong><br>
            {{quest.goals}} <br>
             <v-divider></v-divider>
            <br>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 3">Συνεχεια</v-btn>
      <v-btn flat  @click.native="e6 = 1">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" :complete="e6 > 3">Διαδικασία</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-3" class="mb-5">

        <v-card-text class="pl-3" v-for="(value, index) in quest.procedure" :key="index">
            <strong>Βήμα {{index +1}} </strong><br>
            {{value}} <br>
            
            <br>
              <a v-if="quest.links[index]" :href="quest.links[index]">Πηγή {{index +1}}</a> <br><br>
             <v-divider></v-divider>
            <br>
  
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 4">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6=2">Πισω</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" :complete="e6 > 4">Αξιολόγηση</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-3" class="mb-5" >
        <v-card-text class="pa-4">
            <strong>Χρησιμοποιούμε ότι βρήκαμε και απαντάμε! </strong><br>
            {{quest.question}} <br>
            <v-divider></v-divider>
           
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 5">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6=3">Πισω</v-btn>
    </v-stepper-content>

        <v-stepper-step step="5" :complete="e6 > 5">Συμπεράσματα!</v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="grey lighten-3" class="mb-5" >
        <v-card-text class="pa-4">
            <strong>Συμπεράσματα: </strong><br>
            {{quest.conclusions}} <br>
            <v-divider></v-divider>
            <br>
            
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 6">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6=5">Πισω</v-btn>
    </v-stepper-content>

       <v-stepper-step step="6" >Σελίδα Εκπαιδευτικού</v-stepper-step>
    <v-stepper-content step="6">
      <v-card color="grey lighten-3" class="mb-5" >
        <v-card-text class="pa-4">
            <strong>Σελίδα Εκπαιδευτικού </strong><br>
            {{quest.selida}} <br>
            <v-divider></v-divider>
            <br>
             
    <div style= "text-align: right;">
            Τάξη:  {{quest.taksi}} <br>
            Δημιουργός: {{quest.author.name}} <br>
            Ειδκότητα: {{quest.author.speciality}}
            </div>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="back">Τελος</v-btn>
      <v-btn flat @click.native="e6=5">Πισω</v-btn>
    </v-stepper-content>
  </v-stepper>
  
  </v-container>
</template>
<script>
export default {
  data() {
    return {
        e6:1
    };
  },
  props: ["id"],
  computed:{
      quest () {
          return  this.$store.getters.quest(this.id)
      }
  },
  methods : {
      test () {
          console.log(this.quest.author);
      },
      back() {
      this.$router.push("/");
    }
  }
};
</script>

