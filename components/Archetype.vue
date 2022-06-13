<template>
  <div class="archetype">
    <div class="archetype-header">
      <h4>{{ name }}</h4>
      <!--
      <template v-for="(type,index) of types">
        <img style="align-self: flex-start;"
          v-if="type"
          :key="`archetype-type-${index}`"
          :src="`${type.toUpperCase()}.png`"
          class="type"
        />
      </template>
      -->
      <div>
        <img
          v-for="type of types"
          :key="`archetype-type-${type}`"
          :src="`${type.toUpperCase()}.png`"
          class="type"
          @error="notDisplay"
        />
      </div>
      <div>
        <img
          v-for="(attribute, index) of attributes"
          :key="`archetype-attribute-${index}`"
          :src="`${attribute}.png`"
          class="attribute"
        />
      </div>
    </div>
    <div class="archetype-body">
      <div class="left">
        <img :src="getArtwork(imgs.Poster)" alt="" loading="lazy">
        <img v-if="crest" :src="crest" class="crest">
        <p v-if="crest">CREST</p>
      </div>
      <div class="right">
        <img v-if="imgs.Effect"  :src="getNormalCard(imgs.Effect)">
        <img v-if="imgs.Ritual"  :src="getNormalCard(imgs.Ritual)">
        <img v-if="imgs.Fusion"  :src="getNormalCard(imgs.Fusion)">
        <img v-if="imgs.Synchro" :src="getNormalCard(imgs.Synchro)">
        <img v-if="imgs.Xyz"     :src="getNormalCard(imgs.Xyz)">
        <img v-if="imgs.Link"    :src="getNormalCard(imgs.Link)">
      </div>
    </div>
    <div class="archetype-footer">
      <a :href="`${encodeURI('/details/'+encodeURIComponent(name))}`" target="_blank" rel="noopener noreferrer">
        DETAILS
      </a>
      <!--
      <button @click="goToDetails()">
        DETAILS
      </button>
      -->
      <p>&ensp;[{{ members }}] {{ date }}</p>
    </div>
  </div>
  <!-- 
    | NAME  #ATTR #TYPE
    | |     | [SYMBOL]
    | | IMG | [EFF] [RITUAL]  [FUSION]  [SYNCHRO] [XYZ] [LINK]
    | |     |
    | WAIFU #MEMBERS  DATE
  -->
</template>

<script>
export default {
  name: 'ArchetypeComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    trueName: {
      type: String,
      required: true
    },
    members: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    attributes: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    imgs: {
      type: Object,
      required: true
    },
    crest: {
      type: String,
      required: true
    }
  },
  methods: {
    notDisplay(e) {
      e.target.style.display = "none";
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
    goToDetails() {
      this.$router.push(`/details/${this.name}`)
    }
  }
}
</script>

<style scoped>
.archetype {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.archetype {
  flex-direction: column;
  border: 2%;
  border-style: double;
  border-color: lightblue;
  border-radius: 1vh;
  background-color: lightblue;
  margin: 0.5%;
}

.archetype-header, .archetype-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.archetype-footer {
  font-size: 60%;
}

.archetype-footer button {
  font-size: 90% !important;
}

.archetype-header h4 {
  font-size: 80%;

  width: 50%;
  margin: 1%;
}

.archetype-header div {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 1%;
  width: 25%;
}

.attribute, .type {
  width: 12% !important;
  margin: 0 1% 0 1%;
}

.archetype-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.archetype-body .left {
  margin: 1%;
  width: 25%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.archetype-body .left img {
  width: 100%;
  border-radius: 10%;
}

.crest {
  background-color: white;
  width: 20% !important;
  margin-top: 3%;
  margin-bottom: -9%;
  border-radius: 10%;
}

.archetype-body .right {
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.archetype-body .right img {
  width: 16%;
  margin: 0 0.2% 0 0.2%;
}

</style>

