<template>
    <div style="margin: auto; margin-top:3%; width:60%; " >  

<v-stepper v-model="e1">

    <v-stepper-header>

      <v-stepper-step step="1" :complete="e1 > 1">Τίτλος και Εισαγωγή</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">Εισαγωγή - Στόχοι</v-stepper-step>
      <v-divider></v-divider>      
      <v-stepper-step step="3" :complete="e1 > 3">Διαδικασία</v-stepper-step>
       <v-divider></v-divider>     
      <v-stepper-step step="4" :complete="e1 > 4">Αξιολόγηση </v-stepper-step>
      <v-divider></v-divider>   
      <v-stepper-step step="5">Συμπεράσματα - Σελίδα εκπαιδευτικού</v-stepper-step>
      
    </v-stepper-header>


    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-4" class="mb-5" >
           <v-flex xs12>
            <div style="text-align:center;"><h3>Δημιούργησε μία ιστοεξερευνηση</h3></div>        
          </v-flex>
          <v-layout column>
          <v-flex xs12 sm12 md8 offset-xs1>
            <v-text-field 
            name="title" 
            label="Δώσε τίτλο για την ιστοεξερεύνηση"
            id="title"
            v-model="title"
            maxlength="80"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="abstract" 
            hint="Γράψε ένα σύντομο κείμενο σχετικά με την ιστοεξερεύνηση και τους στόχους της"
            label="Περίληψη"
            id="abstract"
             v-model="abstract"
             multi-line
             box
            ></v-text-field>
          </v-flex>
           <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="keywords" 
            hint="Σημείωσε τις λέξεις κλειδιά της ιστοεξερέυνησης"
            label="Λέξεις κλειδιά"
            id="keywords"
             v-model="keywords"
            ></v-text-field>
          </v-flex>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 2" :disabled="!ffIsValid">Συνεχεια</v-btn>
        <v-btn flat @click.native="dialog=true">Πισω</v-btn>
      </v-stepper-content>
      <!-- STEP 2 -->
      <v-stepper-content step="2">
        <v-card color="grey lighten-4" class="mb-5" >
           <v-flex xs12>
            <div style="text-align:center;"><h3>Εισαγωγή - Στόχοι</h3></div>        
          </v-flex>
          <v-layout column>
          <v-flex xs12 class="pr-3 pl-3">
            <v-text-field 
            name="intro" 
            hint="Γράψε ένα εισαγωγικό κείμενο σχετικά με την ιστοεξερεύνηση που σχεδιάζετε"
            label="Εισαγωγή"
            id="intro"
             v-model="intro"
             multi-line
             box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="goals" 
            hint="Γράψε ένα σύντομο κείμενο σχετικά με τους στόχους της ιστοεξερεύνησης"
            label="Στόχοι"
            id="goals"
             v-model="goals"
             multi-line
             box
            ></v-text-field>
          </v-flex>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 3" :disabled="!sfIsValid">Συνεχεια</v-btn>
        <v-btn flat @click.native="e1 = 1">Πισω</v-btn>
      </v-stepper-content>
      <!-- STEP 3 -->
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5">
          <v-stepper v-model="e6" vertical> 
             <v-flex xs12>
            <div style="text-align:center;"><h3>Διαδικασία</h3></div>        
          </v-flex>
               <v-stepper-step step="1" :complete="e6 > 1">
      Βήμα 1
      <small>Δώσε τις απαραίτητες οδηγίες και πηγές για την ιστοεξερευνηση</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey lighten-4" class="mb-5">
         
         <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="procedure" 
            hint="Δώσε οδηγίες για το βήμα της ιστοεξερεύνησης"
            label="Οδηγίες"
            id="procedure1"
             v-model="procedure[e6-1]"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="link" 
            hint="Δώσε το URL της πηγής !"
            label="URL"
            id="link"
             v-model="links[e6-1]"
            ></v-text-field>
        </v-flex>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 2" :disabled="!pfIsValid">Συνεχεια</v-btn>
      <v-btn flat @click.native="e1 = 2">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" :complete="e6 > 2"> Βήμα 2</v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey lighten-4" class="mb-5" >
        <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="procedure" 
            hint="Δώσε οδηγίες για το βήμα της ιστοεξερεύνησης"
            label="Οδηγίες"
            id="procedure2"
             v-model="procedure[e6-1]"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="link" 
            hint="Δώσε το URL της πηγής !"
            label="URL"
            id="link"
             v-model="links[e6-1]"
            ></v-text-field>
        </v-flex>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 3" :disabled="!pfIsValid">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6 = 1">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" :complete="e6 > 3"> Βήμα 3</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-4" class="mb-5" >
        <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="procedure" 
            hint="Δώσε οδηγίες για το βήμα της ιστοεξερεύνησης"
            label="Οδηγίες"
            id="procedure3"
             v-model="procedure[e6-1]"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="link" 
            hint="Δώσε το URL της πηγής !"
            label="URL"
            id="link3"
             v-model="links[e6-1]"
            ></v-text-field>
        </v-flex>
      </v-card>
      <v-btn color="primary"   @click.native="e6 = 4">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6 = 2">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="4" :complete="e6 > 4" :disabled="!pfIsValid"> Βήμα 4</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-4" class="mb-5" >
        <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="procedure" 
            hint="Δώσε οδηγίες για το βήμα της ιστοεξερεύνησης"
            label="Οδηγίες"
            id="procedure4"
             v-model="procedure[e6-1]"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="link" 
            hint="Δώσε το URL της πηγής !"
            label="URL"
            id="link4"
             v-model="links[e6-1]"
            ></v-text-field>
        </v-flex>
      </v-card>
      <v-btn color="primary"  @click.native="e6 = 5" :disabled="!pfIsValid">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6 = 3">Πισω</v-btn>
    </v-stepper-content>
    <v-stepper-step step="5"> Βήμα 5</v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="grey lighten-4" class="mb-5" >
        <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="procedure" 
            hint="Δώσε οδηγίες για το βήμα της ιστοεξερεύνησης"
            label="Οδηγίες"
            id="procedure"
             v-model="procedure[e6-1]"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        <v-flex xs12 sm12 md8 offset-xs1 >
            <v-text-field 
            name="link" 
            hint="Δώσε το URL της πηγής !"
            label="Λέξεις κλειδιά"
            id="link5"
             v-model="links[e6-1]"
            ></v-text-field>
        </v-flex>
      </v-card>
      <v-btn color="primary" @click.native="e1 = 4" :disabled="!pfIsValid">Συνεχεια</v-btn>
      <v-btn flat @click.native="e6=4">Πισω</v-btn>
    </v-stepper-content>
          </v-stepper>
  <!--Main Stepper-->
        </v-card>
        

      </v-stepper-content>
        <v-stepper-content step="4">
        <v-card color="grey lighten-4" class="mb-5" >
           <v-flex xs12>
            <div style="text-align:center;"><h3>Αξιολόγηση</h3></div>        
          </v-flex>
           <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="rank" 
            hint="Διατύπωσε το τελικό ερώτημα της ιστοεξερεύνησης"
            label="Ερώτημα - Άσκηση"
            id="rank"
             v-model="question"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 5" :disabled="!tfIsValid">Συνεχεια</v-btn>
        <v-btn flat @click.native="e1 = 3">Πισω</v-btn>
      </v-stepper-content>
       <v-stepper-content step="5">
        <v-card color="grey lighten-4" class="mb-5" >
           <v-flex xs12>
            <div style="text-align:center;"><h3>Συμπεράσματα - Σελίδα εκπαιδευτικού</h3></div>        
          </v-flex>
           <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="concl" 
            hint="Παρουσίασε τα συμπεράσματα της ιστοεξερέυνησης"
            label="Συμπεράσματα"
            id="concl"
             v-model="concl"
             multi-line
             box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="pr-3 pl-3" >
            <v-text-field 
            name="selida" 
            label="Σελίδα εκπαιδευτικού"
            id="selida"
             v-model="selida"
             multi-line
             box
            ></v-text-field>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click.native="onSaveWebQuest" :disabled="!lfIsValid">Τελος</v-btn>
        <v-btn flat @click.native="e1 = 4">πισω</v-btn>
      </v-stepper-content>
    </v-stepper-items>

</v-stepper>

<!-- Dialogue-->
 <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Γενικές πληροφορίες</span>
        </v-card-title>
        <v-card-text>
          
            <v-layout  column wrap>
              <v-flex xs12 sm7 >                
                <v-text-field label="Επώνυμο δημιουργού" :value="user.surname" disabled required></v-text-field>
              </v-flex>
              <v-flex xs12 sm7 >
                <v-text-field label="Όνομα δημιουργού" :value="user.name" disabled required></v-text-field>
              </v-flex>
             
              <v-flex xs12 sm6>
                <v-select
                  label="Τάξη"
                  v-model="taksi"
                  autocomplete
                  chips
                  :items="items"
                ></v-select>
              </v-flex>
               <v-flex xs12>
            <v-btn raised class="primary" @click="onPickFile">
             Επελεξε εικονα 
            </v-btn> 
            <input type="file" 
            style="display:none" 
            accept="image/*"
            ref="fileInput"
            @change="onFilePicked">
          </v-flex>
              <v-flex xs12>
                  <img :src="imageUrl" height="200px;">
              </v-flex>
            </v-layout>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="back">Ακυρωση</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog=false" :disabled="!image">Συνεχεια</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>







<br>


  </div>
</template>

<script>
export default {
  data() {
    return {
      taksi: "Χωρίς περιορισμό",
      items: [
        "A Γυμνασίου",
        "Β Γυμνασίου",
        "Γ Γυμνασίου",
        "Α Λυκείου",
        "Β Λυκείου",
        "Γ Λυκείου"
      ],
      dialog: true,
      concl: "",
      selida: "",
      question: "",
      procedure: [],
      links: [],
      e6: 1,
      e1: 1,
      title: "",
      theme: "",
      abstract: "",
      keywords: "",
      imageUrl: "",
      intro: "",
      goals: "",
      body: "",
      date: "",
      author: {
        name: "",
        id: ""
      },
      id: "",
      image: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.abstract !== "" &&
        this.theme !== "" &&
        this.intro !== "" &&
        this.body !== "" &&
        this.keywords !== "" &&
        this.goals !== ""
      );
    },
    ffIsValid() {
      return (this.title !== "" && this.abstract !== "" && this.keywords !== "");
    },
    sfIsValid(){
      return (this.intro!=="" && this.goals!=="");
    },
    pfIsValid(){
      return (this.procedure[this.e6-1] !== null && this.procedure[this.e6-1] !== undefined && this.procedure[this.e6-1]!=="")
    },
    tfIsValid(){
      return (this.question !== "");
    },
    lfIsValid(){
      return (this.concl!=="" && this.selida !== "")
    },
    user() {
      return this.$store.getters.user;
    },
    therapist() {
      return this.$store.getters.user;
    }
  },
  methods: {
    hide() {},
    onSaveWebQuest() {
      const webQuestData = {
        title: this.title,
        abstract: this.abstract,
        intro: this.intro,
        procedure: this.procedure,
        links: this.links,
        conclusions: this.concl,
        selida: this.selida,
        goals: this.goals,
        question: this.question,
        keywords: this.keywords,
        taksi:this.taksi,
        date: new Date().toISOString(),
        author: {
          name: this.user.name + " " + this.user.surname,
          id: this.user.id,
          speciality: this.user.speciality
        },
        image: this.image
      };
      this.$store.dispatch("saveWebQuest", webQuestData);
      this.$router.push("/");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    back() {
      this.$router.push("/");
    },
    onFilePicked() {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add an image!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
