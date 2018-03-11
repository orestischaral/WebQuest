<template>
  <v-container fluid>
      <v-card class="pr-4 pl-4" width="40%" style="margin:auto;">
      <v-flex xs12>
        <v-select
          v-model="select"
          label="Επέλεξε μία τάξη"
          autocomplete
          :items="items"
          :disabled="!isTeacher"
        ></v-select>
      </v-flex>
    </v-card>


    <v-layout row wrap >
        <v-flex v-if="quests[0]===undefined">
            <v-card class="mt-5" width="50%" style="margin:auto">
                <v-card-title class="headline">
                    Καμία ιστοεξερεύνηση
                </v-card-title>
            </v-card>
        </v-flex>
    <v-flex   xs12
              v-for="quest in quests"
              :key="quest.id" >
              <v-container>
      <v-card  width="85%" style="margin:auto" color="purple lighten-3" class=" mb-3" v-for="(quest, i) in quests"  v-bind:key="i" >
        <v-container fluid>
          <v-layout row>
            <v-flex xs12 sm4 md4>
              <v-card-media  
                 :src="quest.imageUrl" height="250px" ></v-card-media>
            </v-flex>
            <v-flex>
              <v-card-title>
                 <div> Τίτλος: <h3>{{quest.title}}</h3> 
                  
                   <p>Περίληψη: <br> {{quest.abstract}} </p>
                    <div style= "text-align: right;">
            Τάξη:  {{quest.taksi}} <br>
            Δημιουργός: {{quest.author.name}} <br>
            Ειδκότητα: {{quest.author.speciality}}
            </div>
                  </div>
              </v-card-title>
            </v-flex>
            <v-flex>
             <v-container fluid style="margin-top:25%">
               <v-layout column wrap>
                 <v-flex xs12 class="text-xs-right">
                <v-btn medium color="indigo" style="color:orange;" @click="preview(quest.id)">
                Δες την ιστοεξερεύνηση
                </v-btn></v-flex>
                <v-flex v-if="!isTeacher" xs12 class="text-xs-center">
                <v-tooltip bottom>
                <v-btn  fab dark small color="red" slot="activator" @click="assigneWebQuest(quest.id)">
                  <v-icon dark>assignment</v-icon>
                </v-btn>
                 <span>Ανάθεση ιστοεξερεύνησης</span>
    </v-tooltip>
                </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
                </v-layout>
                
          </v-container>
           

      </v-card>
      </v-container>
    </v-flex>
</v-layout>


  </v-container>
</template>

<script>
export default {
  data() {
    return {
      select: "",
      prSelect: "",
      items: [
        "A Γυμνασίου",
        "Β Γυμνασίου",
        "Γ Γυμνασίου",
        "Α Λυκείου",
        "Β Λυκείου",
        "Γ Λυκείου",
        "Χωρίς περιορισμό"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted: function () {
      this.$store.dispatch("loadQuest", {
        child: "taksi",
        value: ""
      });
  },
  updated: function() {
    if (this.select !== this.prSelect) {
      console.log("start loading quest");
      this.$store.dispatch("loadQuest", {
        child: "taksi",
        value: this.select
      });
      this.prSelect = this.select;
    }
  },
  computed: {
    selection() {
      return this.select;
    },
    quests() {
      return this.$store.getters.questList;
    },
    user() {
      return this.$store.getters.user;
    },
    isTeacher() {
      if (this.$store.getters.user) {
        if (this.$store.getters.user.role === "Teacher") {
          return true;
        }else {
            this.select = this.$store.getters.user.class;
            return false
        }
      }
    }
  },
  methods: {
    preview(id) {
      this.$router.push("/quest/" + id);
    },
    assigneWebQuest(id) {
      this.$store.dispatch("assignWeb", {
        quest_id: id,
        user_id: this.user.key
      });
      this.$router.push("/");
    }
  }
};
</script>
 