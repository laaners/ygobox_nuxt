<template>
	<div class="archetype" :style="getFocusBG()">
		<div class="archetype-header">
			<h4>{{ archetype.archetype }}</h4>
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
					v-for="type of archetype.types"
					:key="`${archetype.archetype}-type-${type}`"
					:src="`${type.toUpperCase()}.png`"
					class="type"
					@error="notDisplay"
				/>
			</div>
			<div>
				<img
					v-for="(attribute, index) of archetype.attributes"
					:key="`${archetype.archetype}-attribute-${index}`"
					:src="`${attribute}.png`"
					class="attribute"
				/>
			</div>
		</div>
		<div class="archetype-body">
			<div class="left">
				<img
					:src="isNaN(archetype.imgs.Poster) ? archetype.imgs.Poster : getPicArtUrl(archetype.imgs.Poster)"
					alt=""
					loading="lazy"
				/>
				<img
					v-if="archetype.crest"
					:src="archetype.crest"
					class="crest"
				/>
				<p v-if="archetype.crest">CREST</p>
			</div>
			<div class="right">
				<img
					v-if="archetype.imgs.Effect"
					:src="getPicUrl(archetype.imgs.Effect)"
				/>
				<img
					v-if="archetype.imgs.Ritual"
					:src="getPicUrl(archetype.imgs.Ritual)"
				/>
				<img
					v-if="archetype.imgs.Fusion"
					:src="getPicUrl(archetype.imgs.Fusion)"
				/>
				<img
					v-if="archetype.imgs.Synchro"
					:src="getPicUrl(archetype.imgs.Synchro)"
				/>
				<img
					v-if="archetype.imgs.Xyz"
					:src="getPicUrl(archetype.imgs.Xyz)"
				/>
				<img
					v-if="archetype.imgs.Link"
					:src="getPicUrl(archetype.imgs.Link)"
				/>
			</div>
		</div>
		<div class="archetype-footer">
			<a
				:href="`${encodeURI(
					'/archetypes/' + encodeURIComponent(archetype.archetype)
				)}`"
				target="_blank"
				rel="noopener noreferrer"
			>
				DETAILS
			</a>
			<!--
      <button @click="goToDetails()">
        DETAILS
      </button>
      -->
			<p>&ensp;[{{ archetype.members }}] {{ archetype.date }}</p>
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
import Utils from "~/mixins/utils"
export default {
	name: "ArchetypeComponent",
	mixins: [Utils],
	props: {
		archetype: {
			type: Object,
			required: true,
		},
	},
	methods: {
		getFocusBG() {
			console.log(this.archetype.archetype)
			console.log(this.archetype.focus)
			/*
			Fusion: 0
			Link: 0
			No Extra: 1
			Pendulum: 0
			Ritual: 0
			Synchro: 0
			Xyz: 1 */
/* linear-gradient(0deg,var(--color-light),rgba(214,214,177,0)),url('https://storage.googleapis.com/ygoprodeck.com/pics/38229962.jpg'); */
			const ritual = "#819ecc"
			const fusion = "#843194"
			const synchro = "#f4f4f4"
			const xyz = "#141414"
			const link = "#235392"
			const noExtra = "#b25124"

			let tot = 0
			for(const key in this.archetype.focus) {
				if(key !== "Pendulum")
					tot += this.archetype.focus[key]
			}
			let percentage = 0
			let returnStyle = `${noExtra} 0%,`

			if(percentage+this.archetype.focus["No Extra"]/tot*100 !== percentage) {
				returnStyle += `${ritual} ${this.archetype.focus["No Extra"]/tot*100+percentage}%,`
				percentage += this.archetype.focus["No Extra"]/tot*100
			}

			if(percentage+this.archetype.focus.Ritual/tot*100 !== percentage) {
			returnStyle += `${fusion} ${this.archetype.focus.Ritual/tot*100+percentage}%,`
			percentage += this.archetype.focus.Ritual/tot*100
			}

			if(percentage+this.archetype.focus.Fusion/tot*100 !== percentage) {
			returnStyle += `${synchro} ${this.archetype.focus.Fusion/tot*100+percentage}%,`
			percentage += this.archetype.focus.Fusion/tot*100
			}

			if(percentage+this.archetype.focus.Synchro/tot*100 !== percentage) {
			returnStyle += `${xyz} ${this.archetype.focus.Synchro/tot*100+percentage}%,`
			percentage += this.archetype.focus.Synchro/tot*100
			}

			if(percentage+this.archetype.focus.Xyz/tot*100 !== percentage) {
			returnStyle += `${link} ${this.archetype.focus.Xyz/tot*100+percentage}%,`
			percentage += this.archetype.focus.Xyz/tot*100
			}
			
			console.log(returnStyle)

			return {
				backgroundImage: `linear-gradient(0deg, 
					${returnStyle.slice(0,-1)})`
				//	backgroundImage: `linear-gradient(0deg, ${noExtra} 0%, ${ritual} 10%, ${fusion} 50%, ${synchro} 75%, ${xyz} 80%, ${link} 100%)`
				//	backgroundImage: "linear-gradient(0deg, var(--color-light), rgba(214,214,177,0)), url('https://storage.googleapis.com/ygoprodeck.com/pics/38229962.jpg')"
			}
		},
		notDisplay(e) {
			e.target.style.display = "none"
		},
		goToDetails() {
			this.$router.push(`/details/${this.archetype.archetype}`)
		},
	},
}
</script>

<style scoped>
.archetype {
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
	color: var(--color-light);
}

.archetype {
	flex-direction: column;
	border: 2%;
	border-radius: 1vh;
	background-color: var(--color-darker);
}

.archetype-header,
.archetype-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.archetype-header div {
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	margin: 1%;
	width: 25%;
}

.attribute,
.type {
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
