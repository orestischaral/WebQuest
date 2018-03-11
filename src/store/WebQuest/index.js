import * as firebase from 'firebase';

export default {
  actions: {
    deleteStudentQuest({
      commit
    }, payload) {
      // DELETE QUEST from Students DB
      // commit('setLoading', true);
      // console.log(payload.quest_id);
      // var ref=firebase.database().ref('user/' + payload.user_id + '/assigned_quests/');
      // ref.orderByChild('id').equalTo(payload.quest_id).remove();
    },
    assignWeb({
      commit
    }, payload) {
      commit('setLoading', true);
      console.log("assigned")
      var db = firebase.database().ref('user/' + payload.user_id + '/assigned_quests');
      const quest = {
        id: payload.quest_id
      };
      db.push(quest);
    },
    loadQuest({
      commit
    }, payload) {
      commit('setLoading', true);
      var db = firebase.database().ref('WebQuest');
      db.orderByChild(payload.child).equalTo(payload.value).on("value", function (snapshot) {
        var obj = snapshot.val()
        console.log(obj)
        const questList = [];
        for (let key in obj) {

          questList.push({
            id: key,
            abstract: obj[key].abstract,
            author: {
              id: obj[key].author.id,
              name: obj[key].author.name,
              speciality: obj[key].author.speciality
            },
            conclusions: obj[key].conclusions,
            date: obj[key].date,
            goals: obj[key].goals,
            imageUrl: obj[key].imageUrl,
            intro: obj[key].intro,
            keywords: obj[key].intro,
            links: obj[key].links,
            procedure: obj[key].procedure,
            question: obj[key].question,
            selida: obj[key].selida,
            taksi: obj[key].taksi,
            title: obj[key].title
          });
        }
        commit('setUserQuest', questList);
        console.log('quests are setting');
        commit('setLoading', false);
      });
    },
    loadStudentQuest({
      commit
    }, payload) {
      commit('setLoading', true);
      const quests = payload.assigned;
      console.log(quests);
      const questList = [];
      for (var i in quests) {
        console.log(quests[i])
        firebase.database().ref('WebQuest/' + quests[i]).once("value", function (snapshot) {
          var obj = snapshot.val()
          console.log(obj)
          questList.push({
            id: snapshot.key,
            abstract: obj.abstract,
            author: {
              id: obj.author.id,
              name: obj.author.name,
              speciality: obj.author.speciality
            },
            conclusions: obj.conclusions,
            date: obj.date,
            goals: obj.goals,
            imageUrl: obj.imageUrl,
            intro: obj.intro,
            keywords: obj.intro,
            links: obj.links,
            procedure: obj.procedure,
            question: obj.question,
            selida: obj.selida,
            taksi: obj.taksi,
            title: obj.title
          });
          console.log(snapshot.key);
          commit('setUserQuest', questList);
          console.log('quests are setting ');
          commit('setLoading', false);
        });
      }

    },
    saveWebQuest({
      commit
    }, payload) {
      let imageUrl
      let key
      firebase.database().ref('WebQuest').push(payload)
        .then((data) => {
          key = data.key
          // console.log(data)
          // commit('writeArticle', {
          //   ...article,
          //   id: key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('WebQuest/' + payload.author.id + '/' + payload.title + '.' + ext).put(payload.image)
        })
        .then(filedata => {
          imageUrl = filedata.metadata.downloadURLs[0]
          return firebase.database().ref('WebQuest').child(key).update({
            imageUrl: imageUrl
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    }
  }
}
