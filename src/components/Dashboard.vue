<template>
  
  <v-container >

<v-layout v-if="userIsAuthenticated">
  <v-layout  column wrap style="padding:3%" class="text-xs-center">
    <v-flex class="primary mb-2 " style="width:75%; margin:auto" >
      <h2 class="white--text">  Η καρτέλα μου! </h2>
      <h3>{{user.name }} {{user.surname}}</h3>
      </v-flex>
       <v-flex v-if="isTeacher">
          <v-btn
              fixed
              right
              dark
              fab
              bottom
              color="red"
              @click="createWebQuest"
            >
              <v-icon>add</v-icon>
            </v-btn>
         </v-flex>
       <v-layout row>
    <v-flex xs12 sm12 >
      <v-card width="75%" style="margin:auto">
        <v-toolbar color="teal" dark >
          
          <v-toolbar-title>Οι ιστοεξερευνήσεις μου!</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-list v-if="hasNoQuests && isTeacher">
           <v-list-tile  >
              <v-list-tile-content >
                <v-list-tile-title class="text-xs-center title"> No Quests! Create now</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            </v-list>
        <v-list v-for="(quest, index) in quests" :key="index">
            
            <v-list-tile>
              <v-list-tile-content style="width:10%">
                
                <v-list-tile-title> {{index+1}}. <strong> {{ quest.title }}</strong> </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-content >
                
              </v-list-tile-content>
              <v-btn class="success" @click="preview(quest.id)">Επισκόπηση</v-btn>
              <v-btn  class="error" @click="deleteWebQuest(quest.id)">Διαγραφή</v-btn>
            </v-list-tile>
            <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-layout>
</v-layout>


  </v-container>

</template>

<script>
export default {
  data() {
    return {
      ass_quests:[],
      flag: false,
      user_role: "",
      data: {
        child: "",
        user_id: null
      }
    };
  },
  mounted: function() {
    if (this.$store.getters.user) {
      if (this.$store.getters.user.role === "Teacher") {
        console.log("start loading quest");
        this.$store.dispatch("loadQuest", {
          child: "author/id",
          value: this.user.id
        });
      } else {
        console.log("start loading quest");
        this.$store.dispatch("loadStudentQuest", {
          child: "assigned_to/id",
          value: this.$store.getters.user.id,
          assigned: this.assQuests
        });
      }
    }
  },
  computed: {
    isCreator() {
      if (this.$store.getters.user.role === "Teacher") return true;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.getters.user;
    },
    isTeacher() {
      if (this.$store.getters.user) {
        if (this.$store.getters.user.role === "Teacher") {
          return true;
        }
      }
    },
    hasNoQuests() {
      if (this.quests !== null && this.quests !== undefined) {
        return false;
      } else {
        return true;
      }
    },
    assQuests(){
      const quests = this.$store.getters.user.assigned_quests
      console.log(this.$store.getters.user.assigned_quests);
      for (var i in quests){
        console.log("test " + quests[i].id);
       this.ass_quests.push(quests[i].id);}
       return this.ass_quests;
    },
    quests() {
      return this.$store.getters.questList;
    },
    runOnce() {
      if (this.flag === false && this.user) {
        if (this.$store.getters.user.role === "Teacher") {
          console.log("start loading quest");
          this.$store.dispatch("loadQuest", {
            child: "author/id",
            user_id: this.user.id
          });
        } else {
          console.log("start loading quest");
          this.$store.dispatch("loadQuest", {
            child: "assigned_to",
            user_id: this.user.id
          });
        }
        this.flag = true;
        return true;
      }
      return false;
    }
  },
  methods: {
    createWebQuest() {
      this.$router.push("/create");
    },
    deleteWebQuest(id) {
      if(this.user.role !== "Teacher"){
      this.$store.dispatch("deleteStudentQuest", {quest_id: id, user_id:this.user.key});}
      // this.$router.go();
    },
    preview(id) {
      this.$router.push("/quest/" + id);
    }
  }
};
</script>
