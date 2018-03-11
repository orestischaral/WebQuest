<template>
  <v-app light >
    <v-navigation-drawer v-model="sideNav" 
    temporary 
    enable-resize-watcher
     app> 
         
       <v-list  style="margin-left: 5%;">
         <v-toolbar-side-icon @click.native="sideNav=!sideNav" ></v-toolbar-side-icon><br/><br/>
        <v-list-tile v-for="item in menuItems" :key="item.title" 
        router 
        :to="item.link"
         >          
          <v-list-tile-action> 
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content > <v-list-tile-title>
              {{ item.title }}</v-list-tile-title> 
            </v-list-tile-content>             
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Εξοδος</v-list-tile-content>
        </v-list-tile>
      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar   color='blue lighten-3' height="60px" >
      <v-toolbar-side-icon @click.native="sideNav=!sideNav" class="hidden-sm-and-up" ></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor:pointer;"><strong> <v-icon>pages</v-icon>WebQuest</strong></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
         <v-btn flat v-for="item in menuItems" :key="item.title" 
         router 
        :to="item.link"> 
           <v-icon>{{ item.icon }}</v-icon> 
          {{ item.title }} 
          </v-btn>
          <v-btn  flat v-if="userIsAuthenticated"
          @click="onLogout" >
            <v-icon>exit_to_app</v-icon>
            Log Out
          </v-btn>   
      </v-toolbar-items>
    </v-toolbar>
  
    <main style=" height:100%; background-color:	#F0FFFF">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Εγγραφή", link: "/signup" },
        { icon: "lock_open", title: "Σύνδεση", link: "/login" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "search", title: "Ιστοεξερευνησεις", link: "/webQuests" },
          { icon: "account_circle", title: "Ο Λογαρισαμός μου", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$router.push("/");
      this.$store.dispatch("logOut", this.$store.getters.user);
    }
  }
};
</script>
