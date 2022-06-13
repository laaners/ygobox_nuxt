<template>
  <div>
    <h2 style="text-align: center;">{{ arc }}</h2>
    <div class="cards-list">
      <div
        v-for="member of members"
        :key="`archetype-type-${member.name}`"
      >
        <img v-if="artwork" :src="getArtwork(member.id)">
        <img v-else :src="getNormalCard(member.id)">
        <p style="text-align: center; margin-top: 0%;">{{ member.name }}</p>
      </div>
    </div>
    <button style="text-align: center;" @click="changeArt">
      Change art
    </button>
    <button style="text-align: center;" @click="backToList">
      Back to list
    </button>
  </div>
</template>

<script>
export default {
  name: 'DetailsPage',
  async asyncData({ route, $axios }) {
    function listOrder(n) {
      if (n===1) return "Normal Monster";
      if (n===2) return "Effect Monster";
      if (n===3) return "Spirit Monster";
      if (n===4) return "Flip Effect Monster";
      if (n===5) return "Toon Monster";
      if (n===6) return "Union Effect Monster";
      if (n===7) return "Gemini Monster";
      if (n===8) return "Tuner Monster";
      if (n===9) return "Normal Tuner Monster";
      if (n===10) return "Pendulum Normal Monster";
      if (n===11) return "Pendulum Effect Monster";
      if (n===12) return "Pendulum Flip Effect Monster";
      if (n===13) return "Pendulum Tuner Effect Monster";
      if (n===14) return "Ritual Monster";
      if (n===15) return "Ritual Effect Monster";
      if (n===16) return "Fusion Monster";
      if (n===17) return "Pendulum Effect Fusion Monster";
      if (n===18) return "Synchro Monster";
      if (n===19) return "Synchro Tuner Monster";
      if (n===20) return "Synchro Pendulum Effect Monster";
      if (n===21) return "XYZ Monster";
      if (n===22) return "XYZ Pendulum Effect Monster";
      if (n===23) return "Link Monster";
      if (n===24) return "Spell Card Normal";
      if (n===25) return "Spell Card Ritual";
      if (n===26) return "Spell Card Quick-Play";
      if (n===27) return "Spell Card Continuous";
      if (n===28) return "Spell Card Equip";
      if (n===29) return "Spell Card Field";
      if (n===30) return "Trap Card Normal";
      if (n===31) return "Trap Card Continuous";
      if (n===32) return "Trap Card Counter";
      if (n===33) return "Skill Card Andrew";
      if (n===34) return "Skill Card Arkana";
      if (n===35) return "Skill Card Bonz";
      if (n===36) return "Skill Card Christine";
      if (n===37) return "Skill Card David";
      if (n===38) return "Skill Card Emma";
      if (n===39) return "Skill Card Espa Roba";
      if (n===40) return "Skill Card Ishizu";
      if (n===41) return "Skill Card Ishizu Ishtar";
      if (n===42) return "Skill Card Joey";
      if (n===43) return "Skill Card Joey Wheeler";
      if (n===44) return "Skill Card Kaiba";
      if (n===45) return "Skill Card Keith";
      if (n===46) return "Skill Card Lumis Umbra";
      if (n===47) return "Skill Card Mai";
      if (n===48) return "Skill Card Mai Valentine";
      if (n===49) return "Skill Card Mako";
      if (n===50) return "Skill Card Odion";
      if (n===51) return "Skill Card Pegasus";
      if (n===52) return "Skill Card Rex";
      if (n===53) return "Skill Card Seto Kaiba";
      if (n===54) return "Skill Card Tea Gardner";
      if (n===55) return "Skill Card Weevil";
      if (n===56) return "Skill Card Yami Bakura";
      if (n===57) return "Skill Card Yami Marik";
      if (n===58) return "Skill Card Yami Yugi";
      if (n===59) return "Skill Card Yugi";
      if (n===60) return "Token Aqua";
      if (n===61) return "Token Beast";
      if (n===62) return "Token Cyberse";
      if (n===63) return "Token Dinosaur";
      if (n===64) return "Token Dragon";
      if (n===65) return "Token Fairy";
      if (n===66) return "Token Fiend";
      if (n===67) return "Token Fish";
      if (n===68) return "Token Insect";
      if (n===69) return "Token Machine";
      if (n===70) return "Token Plant";
      if (n===71) return "Token Pyro";
      if (n===72) return "Token Reptile";
      if (n===73) return "Token Rock";
      if (n===74) return "Token Thunder";
      if (n===75) return "Token Warrior";
      if (n===76) return "Token Winged Beast";
      if (n===77) return "Token Wyrm";
      if (n===78) return "Token Zombie";
    }

    const { id } = route.params;
    const members = await $axios.get('/api/archetypes/'+id.replace(/\//g, '%2F'));
    listOrder(1)
    /*
    const members = [];
    for(let i = 1; i <=78; i++) {                    
      // ordino anche per livelli o link rate
      members.push(...data[0].members.filter(x=>x.type === listOrder(i))
        .sort((a,b) => a.name.localeCompare(b.name))
        .sort((a,b)=>a.atk-b.atk).sort((a,b)=>a.level-b.level)
        .sort((a,b)=>a.linkval-b.linkval));
      members.push(...data[0].members.filter(x=>x.type+" "+x.race === listOrder(i))
        .sort((a,b)=>a.level-b.level)
        .sort((a,b)=>a.linkval-b.linkval)
        .sort((a,b) => a.name.localeCompare(b.name))
        .sort((a,b)=>a.atk-b.atk));
    }
    */
    console.log(members)
    return {
      artwork: false,
      arc: id,
      members,
    }
  },
  methods: {
    backToList() {
      this.$router.push('/');
    },
  	getArtwork(code) {
      if(!isNaN(+code))
        return `https://storage.googleapis.com/ygoprodeck.com/pics_artgame/${code}.jpg`;
      else
        return code;
    },
    getSmallCard(code) {
      return `https://storage.googleapis.com/ygoprodeck.com/pics_small/${code}.jpg`;
    },
    getNormalCard(code) {
      return `https://storage.googleapis.com/ygoprodeck.com/pics/${code}.jpg`;
    },
    changeArt() {
      this.artwork = !this.artwork;
    }
  },
}
</script>

<style scoped>
.cards-list {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.cards-list div {
	width: 14% !important;
}
.cards-list div img {
	width: 100%;
}
</style>
