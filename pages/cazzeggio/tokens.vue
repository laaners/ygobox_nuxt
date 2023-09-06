<template>
	<div v-if="ready" class="flex-col">

		<h1 style="text-transform: uppercase;">Physical printed specific tokens</h1>
		<grid-view :columns="4" :col-gap="1" :row-gap="0" style="width: 100%">
			<div
				v-for="token of tokens.printed"
				:key="token.name"
				class="flex-col"
				style="border-bottom: 2px solid black; padding: 1%; margin: 1%"
			>
				<h3>{{ token.name.replaceAll("_", " ") }}</h3>
				<div class="flex-row" style="width: 100%">
					<grid-view
						:columns="
							token.summoner_details.length > 10
								? 3
								: token.summoner_details.length > 2
								? 2
								: token.summoner_details.length
						"
						:col-gap="0"
						:row-gap="0"
						style="width: 50%"
					>
						<card-modal
							v-for="card of token.summoner_details.filter(
								(_) => _ !== undefined
							)"
							:key="card.id"
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
					</grid-view>
					<span style="width: 2%"></span>
					<grid-view
						:columns="token.list.length > 1 ? 2 : 1"
						:col-gap="0"
						:row-gap="0"
						style="width: 50%"
					>
						<div
							v-for="token_image of token.list"
							:key="token_image"
							:style="{ width: 100 + '%' }"
						>
							<img
								:src="token_image"
								style="width: 100%; object-fit: cover"
							/>
						</div>
					</grid-view>
				</div>
			</div>
		</grid-view>
			
		<h1 style="text-transform: uppercase;">Video games appearances only specific tokens</h1>
		<grid-view :columns="4" :col-gap="1" :row-gap="0" style="width: 100%">
			<div
				v-for="token of tokens.artwork"
				:key="token.name"
				class="flex-col"
				style="border-bottom: 2px solid black; padding: 1%; margin: 1%"
			>
				<h3>{{ token.name.replaceAll("_", " ") }}</h3>
				<div class="flex-row" style="width: 100%">
					<grid-view
						:columns="
							token.summoner_details.length > 10
								? 3
								: token.summoner_details.length > 2
								? 2
								: token.summoner_details.length
						"
						:col-gap="0"
						:row-gap="0"
						style="width: 50%"
					>
						<card-modal
							v-for="card of token.summoner_details.filter(
								(_) => _ !== undefined
							)"
							:key="card.id"
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
					</grid-view>
					<span style="width: 2%"></span>
					<grid-view
						:columns="token.list.length > 1 ? 2 : 1"
						:col-gap="0"
						:row-gap="0"
						style="width: 50%"
					>
						<div
							v-for="token_image of token.list"
							:key="token_image"
							:style="{ width: 100 + '%' }"
						>
							<img
								:src="token_image"
								style="width: 100%; object-fit: cover"
							/>
						</div>
					</grid-view>
				</div>
			</div>
		</grid-view>

		<h1 style="text-transform: uppercase;">Generic tokens</h1>
		<grid-view :columns="8" :col-gap="1" :row-gap="0" style="width: 100%">
			<div
				v-for="token of tokens.generic"
				:key="token.name"
				class="flex-col"
				style="border-bottom: 2px solid black; padding: 1%; margin: 1%"
			>
				<h3 style="text-align: center">
					{{
						token.name
							.replaceAll("_", " ")
							.replaceAll("%22", '"')
							.replaceAll("%26", "&")
							.replaceAll("%27", "'")
							.replaceAll("%C3%A9", "é")
					}}
				</h3>
				<div class="flex-row" style="width: 100%">
					<grid-view
						:columns="token.list.length > 1 ? 2 : 1"
						:col-gap="0"
						:row-gap="0"
						style="width: 100%"
					>
						<div
							v-for="token_image of token.list"
							:key="token_image"
							:style="{ width: 100 + '%' }"
						>
							<img
								:src="token_image"
								style="width: 100%; object-fit: cover"
							/>
						</div>
					</grid-view>
				</div>
				<p
					style="
						text-align: left;
						white-space: pre-line;
						background-color: white;
						border: 1px solid black;
						padding: 1em;
					"
				>{{
					token.desc
						.replaceAll(
							"This card can be used as any Token.",
							""
						)
						.replaceAll(
							"This card can be used as any Token or Counter.",
							""
						).length <= 5 ? token.desc : token.desc
						.replaceAll(
							"This card can be used as any Token.",
							""
						)
						.replaceAll(
							"This card can be used as any Token or Counter.",
							""
						)
				}}</p>
			</div>
		</grid-view>

		<h1 style="text-align: center; white-space: pre-line; text-transform: uppercase;">Mentioned only tokens
			(no physical printing, use the artwork of one of the parent cards in video game appearances)</h1>
		<grid-view :columns="8" :col-gap="1" :row-gap="0" style="width: 100%">
			<div
				v-for="token of tokens.mentioned"
				:key="token.name"
				class="flex-col"
				style="border-bottom: 2px solid black; padding: 1%; margin: 1%"
			>
				<h3>{{ token.name.replaceAll("_", " ").replaceAll("%27", "'") }}</h3>
				<div class="flex-row" style="width: 100%">
					<grid-view
						:columns="
							token.summoner_details.length > 10
								? 3
								: token.summoner_details.length > 2
								? 2
								: token.summoner_details.length
						"
						:col-gap="0"
						:row-gap="0"
						style="width: 100%"
					>
						<card-modal
							v-for="card of token.summoner_details.filter(
								(_) => _ !== undefined
							)"
							:key="card.id"
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
						<img
							v-if="token.name === 'Nytro_Token'"
							src="https://ms.yugipedia.com//thumb/5/54/GoldPrideNytroHead-PHHY-EN-1E-OP.png/450px-GoldPrideNytroHead-PHHY-EN-1E-OP.png"
							style="width: 100%"
						/>
						<img
							v-if="token.name === 'Icejade_Token'"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3154e667-2860-4f43-a32d-a40bbfec95cf/dfmcoxg-2dc0ee72-018d-483f-a579-45258198504e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxNTRlNjY3LTI4NjAtNGY0My1hMzJkLWE0MGJiZmVjOTVjZlwvZGZtY294Zy0yZGMwZWU3Mi0wMThkLTQ4M2YtYTU3OS00NTI1ODE5ODUwNGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._vzBZ_rKeLeXU_UGWiSE5u_eDm0tvSSCyQmBJ5Sbgbg"
							style="width: 100%"
						/>
					</grid-view>
				</div>
			</div>
		</grid-view>

		-->
	</div>
</template>

<script>
import CardModal from "../../components/CardModal.vue"
import GridView from "../../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	// eslint-disable-next-line vue/no-unused-components
	components: { GridView, CardModal },
	mixins: [Utils],
	layout: "empty",
	async asyncData({ $axios }) {
		const allsets = await $axios.$get("/api/allsets")
		// Sort by release data
		/*
		data.cards.sort((a, b) => {
			const aY = +a.date.split(" ")[0].split("-")[0]
			const aM = +a.date.split(" ")[0].split("-")[1]
			const aD = +a.date.split(" ")[0].split("-")[2]
			const bY = +b.date.split(" ")[0].split("-")[0]
			const bM = +b.date.split(" ")[0].split("-")[1]
			const bD = +b.date.split(" ")[0].split("-")[2]
			return aY * 10000 + aM * 100 + aD - (bY * 10000 + bM * 100 + bD)
		})
		*/
		// Sort by name
		const tokens = {
			mentioned: [
				{
					name: "Adventurer_Token",
					list: [
						"https://ms.yugipedia.com//thumb/7/76/AdventurerToken-MADU-EN-VG-artwork.png/300px-AdventurerToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Adventurer Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Curse of Aramatir","Rite of Aramesir"],
				},
				{
					name: "Ancient_Warriors_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/41/AncientWarriorsToken-MADU-EN-VG-artwork.png/300px-AncientWarriorsToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Ancient Warriors Saga - Chivalrous Path"],
				},
				{
					name: "Alligator_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/4f/AlligatorToken-MADU-EN-VG-artwork.png/300px-AlligatorToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Dark Alligator"],
				},
				{
					name: "Army_Ant_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/9e/ArmyAntToken-MADU-EN-VG-artwork.png/300px-ArmyAntToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Multiplication of Ants". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Multiplication of Ants"],
				},
				{
					name: "Baby_Mantis_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Praying Mantis"],
				},
				{
					name: "Batteryman_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/cb/BatterymanToken-MADU-EN-VG-artwork.png/300px-BatterymanToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Batteryman Solar"],
				},
				{
					name: "Battle_Eagle_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f2/BattleEagleToken-MADU-EN-VG-artwork.png/300px-BattleEagleToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Number 42: Galaxy Tomahawk". Destroy this Token during the End Phase of the turn it is Special Summoned.\n',
					summoner: ["Number 42: Galaxy Tomahawk"],
				},
				{
					name: "Beetrooper_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a5/BeetrooperToken-MADU-EN-VG-artwork.png/300px-BeetrooperToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Beetrooper Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: [
						"Beetrooper Formation","Beetrooper Descent","Beetrooper Squad",
					],
				},
				{
					name: "Bellcat_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/3a/BellcatToken-MADU-EN-VG-artwork.png/300px-BellcatToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Bellcat Fighter"],
				},
				{
					name: "Block_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/df/BlockToken-MADU-EN-VG-artwork.png/300px-BlockToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Blockman". This Token cannot declare an attack.\n',
					summoner: ["Blockman"],
				},
				{
					name: "Chewbone_Jr._Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/8e/ChewboneJrToken-MADU-EN-VG-artwork.png/300px-ChewboneJrToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Chewbone".\n',
					summoner: ["Chewbone"],
				},
				{
					name: "Clock_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/31/ClockToken-MADU-EN-VG-artwork.png/300px-ClockToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Clock Wyvern"],
				},
				{
					name: "Clone_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/97/CloneToken-MADU-EN-VG-artwork.png/300px-CloneToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Cloning". If the monster is destroyed and sent to the Graveyard, destroy this Token.\n',
					summoner: ["Cloning"],
				},
				{
					name: "Cynet_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a0/CynetToken-MADU-EN-VG-artwork.png/300px-CynetToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Cynet Ritual"],
				},
				{
					name: "Dark_Beast_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Chaos Witch"],
				},
				{
					name: "Data_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d7/DataToken-MADU-EN-VG-artwork.png/300px-DataToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Link Streamer"],
				},
				{
					name: "Data_Acorn_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d8/DataAcornToken-MADU-EN-VG-artwork.png/300px-DataAcornToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Datacorn"],
				},
				{
					name: "Dinomorphia_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a3/DinomorphiaToken-MADU-EN-VG-artwork.png/300px-DinomorphiaToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Dinomorphia Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Dinomorphia Shell"],
				},
				{
					name: "Divine_Dragon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f6/DivineDragonToken-MADU-EN-VG-artwork.png/300px-DivineDragonToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["White Aura Bihamut"],
				},
				{
					name: "DOG_Fighter_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/5b/DOGFighterToken-MADU-EN-VG-artwork.png/300px-DOGFighterToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Kozmo DOG Fighter"],
				},
				{
					name: "Dragon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Wish Dragon"],
				},
				{
					name: "Epigonos_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d7/EpigonosToken-MADU-EN-VG-artwork.png/300px-EpigonosToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as an "Epigonos Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Epigonen, the Impersonation Invader"],
				},
				{
					name: "Eva_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/39/EvaToken-MADU-EN-VG-artwork.png/300px-EvaToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Zeta Reticulant".\n',
					summoner: ["Zeta Reticulant"],
				},
				{
					name: "Familiar_of_the_Evil_Eye_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d8/FamiliaroftheEvilEyeToken-MADU-EN-VG-artwork.png/300px-FamiliaroftheEvilEyeToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Evil Eye Reemergence"],
				},
				{
					name: "Fire_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/22/FireToken-MADU-EN-VG-artwork.png/300px-FireToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Libromancer Realized"],
				},
				{
					name: "Fox_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/38/FoxToken-MADU-EN-VG-artwork.png/300px-FoxToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Nine-Tailed Fox"],
				},
				{
					name: "Gadget_Box_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: 'This card can be used as a "Gadget Box Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Gadget Box"],
				},
				/*
				{
					name: "Hailon,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster A"],
				},
				*/
				{
					name: "Haunted_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/6c/HauntedToken-MADU-EN-VG-artwork.png/300px-HauntedToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Haunted Zombies"],
				},
				{
					name: "Hundred_Apple_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Ringowurm the Hundred Apple Dragon"],
				},
				{
					name: "Iceblade_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/64/BrandedSword-MADU-EN-VG-artwork.png/300px-BrandedSword-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Iceblade Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Branded Sword"],
				},
				{
					name: "Icejade_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Icejade Aegirine Rahn_"],
				},
				{
					name: "@Ignister_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/04/IgnisterToken-MADU-EN-VG-artwork.png/300px-IgnisterToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["The Arrival Cyberse @Ignister","You and A.I."],
				},
				/*
				{
					name: "Kamion,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster A"],
				},
				*/
				{
					name: "Koa%27ki_Meiru_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/8c/KoakiMeiruToken-MADU-EN-VG-artwork.png/300px-KoakiMeiruToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Koa\'ki Meiru Prototype".\n',
					summoner: ["Koa'ki Meiru Prototype"],
				},
				{
					name: "Lekunga_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/cd/LekungaToken-MADU-EN-VG-artwork.png/300px-LekungaToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Lekunga".\n',
					summoner: ["Lekunga"],
				},
				{
					name: "Light_Beast_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Chaos Witch"],
				},
				{
					name: "Link_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/26/LinkToken-MADU-EN-VG-artwork.png/300px-LinkToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Link Devotee","Linkross"],
				},
				{
					name: "Lunalight_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d5/LunalightToken-MADU-EN-VG-artwork.png/300px-LunalightToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Lunalight Serenade Dance"],
				},
				{
					name: "Maize_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/b4/MaizeToken-MADU-EN-VG-artwork.png/300px-MaizeToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Sweet Corn".\n',
					summoner: ["Sweet Corn"],
				},
				/*
				{
					name: "Metaion,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster C"],
				},
				*/
				{
					name: "Moult_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/fc/MoultToken-MADU-EN-VG-artwork.png/300px-MoultToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Transcicada"],
				},
				{
					name: "Noble_Knight_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/cd/NobleKnightToken-MADU-EN-VG-artwork.png/300px-NobleKnightToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Noble Knight Iyvanne"],
				},
				/*
				{
					name: "Number_1_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Don Thousand/Spell B"],
				},
				{
					name: "Number_2_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Don Thousand/Spell B"],
				},
				{
					name: "Number_3_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Don Thousand/Spell B"],
				},
				{
					name: "Number_4_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Don Thousand/Spell B"],
				},
				*/
				{
					name: "Nytro_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Gold Pride - Nytro Head"],
				},
				{
					name: "Otoshidamashi_Token",
					list: [
						"https://ms.yugipedia.com//thumb/7/70/OtoshidamashiToken-MADU-EN-VG-artwork.png/300px-OtoshidamashiToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Otoshidamashi"],
				},
				{
					name: "Parasomnia_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/2c/ParasomniaToken-MADU-EN-VG-artwork.png/300px-ParasomniaToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Parasomnia Pillow"],
				},
				{
					name: "Phantasm_Spiral_Token",
					list: [
						"https://ms.yugipedia.com//thumb/1/1c/PhantasmSpiralToken-MADU-EN-VG-artwork.png/300px-PhantasmSpiralToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Pacifis, the Phantasm City"],
				},
				{
					name: "Phantom_Glimmer_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: 'This card can be used as a "Phantom Glimmer Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Blackwing - Sudri the Phantom Glimmer"],
				},
				{
					name: "Plunder_Patroll_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Plunder Patrollship Jord"],
				},
				{
					name: "Poisonous_Snake_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/54/PoisonousSnakeToken-MADU-EN-VG-artwork.png/300px-PoisonousSnakeToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Cobra Jar". When this Token is destroyed as a result of battle, inflict 500 points of damage to your opponent\'s Life Points.\n',
					summoner: ["Cobra Jar"],
				},
				{
					name: "Prank-Kids_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/08/PrankKidsToken-MADU-EN-VG-artwork.png/300px-PrankKidsToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Prank-Kids Pranks"],
				},
				{
					name: "Radian_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/65/RadianToken-MADU-EN-VG-artwork.png/300px-RadianToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Radian, the Multidimensional Kaiju"],
				},
				/*
				{
					name: "Raphion,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster B"],
				},
				*/
				{
					name: "Reptilianne_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/22/ReptilianneToken-MADU-EN-VG-artwork.png/300px-ReptilianneToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Reptilianne Spawn".\n',
					summoner: ["Reptilianne Recoil","Reptilianne Spawn"],
				},
				{
					name: "Rockstone_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/ed/RockstoneToken-MADU-EN-VG-artwork.png/300px-RockstoneToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Rockstone Warrior". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Rockstone Warrior"],
				},
				/*
				{
					name: "Sadion,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster B"],
				},
				*/
				{
					name: "Security_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f2/SecurityToken-MADU-EN-VG-artwork.png/300px-SecurityToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["One-Time Passcode"],
				},
				{
					name: "Shiranui_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/47/ShiranuiToken-MADU-EN-VG-artwork.png/300px-ShiranuiToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Shiranui Swordsaga"],
				},
				{
					name: "Siphon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/38/SiphonToken-MADU-EN-VG-artwork.png/300px-SiphonToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Star Siphon".\n',
					summoner: ["Star Siphon"],
				},
				{
					name: "Speedroid_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f4/SpeedroidToken-MADU-EN-VG-artwork.png/300px-SpeedroidToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Speedroid Block-n-Roll"],
				},
				{
					name: "Spool_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/63/SpoolToken-MADU-EN-VG-artwork.png/300px-SpoolToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Spool Code"],
				},
				{
					name: "Squid_Ink_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f0/SquidInkToken-MADU-EN-VG-artwork.png/300px-SquidInkToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Squirt Squid"],
				},
				{
					name: "Stardust_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/33/StardustToken-MADU-EN-VG-artwork.png/300px-StardustToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Stardust Trail"],
				},
				{
					name: "Swordsoul_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/52/SwordsoulToken-MADU-EN-VG-artwork.png/300px-SwordsoulToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Swordsoul Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: [
						"Swordsoul Assessment","Swordsoul Blackout","Swordsoul of Mo Ye","Swordsoul of Taia","Swordsoul Strife","Swordsoul Strategist Longyuan",
					],
				},
				{
					name: "T.G._Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a5/TGToken-MADU-EN-VG-artwork.png/300px-TGToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["T.G. Tank Grub"],
				},
				{
					name: "Tellus_Wing_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/c6/TellusWingToken-MADU-EN-VG-artwork.png/300px-TellusWingToken-MADU-EN-VG-artwork.png",
					],
					desc: 'This card can be used as a "Tellus Wing Token". *If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Tellus the Little Angel"],
				},
				{
					name: "Tenyi_Spirit_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/6d/TenyiSpiritToken-MADU-EN-VG-artwork.png/300px-TenyiSpiritToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Tenyi Spirit - Sahasrara"],
				},
				{
					name: "Tindangle_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e1/TindangleToken-MADU-EN-VG-artwork.png/300px-TindangleToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Tindangle Acute Cerberus"],
				},
				{
					name: "Tricky_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/21/TrickyToken-MADU-EN-VG-artwork.png/300px-TrickyToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Tricky Spell 4". This Token cannot declare an attack.\n',
					summoner: ["Tricky Spell 4"],
				},
				{
					name: "V-LAN_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/88/VLANToken-MADU-EN-VG-artwork.png/300px-VLANToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["V-LAN Hydra"],
				},
				{
					name: "Vendread_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/24/VendreadToken-MADU-EN-VG-artwork.png/300px-VendreadToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Vendread Reorigin"],
				},
				{
					name: "Vilepawn_Salmon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Infernalqueen Salmon"],
				},
				{
					name: "Waltz_Token",
					list: [
						"https://ms.yugipedia.com//thumb/1/13/WaltzToken-MADU-EN-VG-artwork.png/300px-WaltzToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Battle Waltz". Neither player takes battle damage from battles involving this Token.\n',
					summoner: ["Battle Waltz"],
				},
				{
					name: "Wicked_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/2a/WickedToken-MADU-EN-VG-artwork.png/300px-WickedToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Statue of the Wicked".\n',
					summoner: ["Statue of the Wicked"],
				},
				{
					name: "Wild_Fire_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/dc/WildFireToken-MADU-EN-VG-artwork.png/300px-WildFireToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Wild Fire".\n',
					summoner: ["Wild Fire"],
				},
				{
					name: "Worm_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/37/WormToken-MADU-EN-VG-artwork.png/300px-WormToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Worm Bait".\n',
					summoner: ["Worm Bait"],
				},
				/*
				{
					name: "Zaphion,_the_Timelord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/300px-Back-EN.png",
					],
					desc: "",
					summoner: ["Z-ONE/Monster C"],
				},
				*/
			],
			artwork: [
				{
					name: "Asmo_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/28/AsmoToken-MADU-EN-VG-artwork.png/300px-AsmoToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Darklord Asmodeus". This Token cannot be destroyed by a card effect.\n',
					summoner: ["Darklord Asmodeus"],
				},
				{
					name: "Deus_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/c3/DeusToken-MADU-EN-VG-artwork.png/300px-DeusToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Darklord Asmodeus". This Token cannot be destroyed by battle.\n',
					summoner: ["Darklord Asmodeus"],
				},
				{
					name: "Blackwing_-_Black_Crest_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/fe/BlackwingBlackCrestToken-MADU-EN-VG-artwork.png/300px-BlackwingBlackCrestToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Black Wing Revenge".\n',
					summoner: ["Black Wing Revenge"],
				},
				{
					name: "Ceremonial_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/2b/CeremonialToken-MADU-EN-VG-artwork.png/300px-CeremonialToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Offering to the Immortals". This Token cannot be Tributed, except for a Tribute Summon of an "Earthbound Immortal" monster, and cannot be used as Synchro Material monsters.\n',
					summoner: ["Offering to the Immortals"],
				},
				{
					name: "Cloudian_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/aa/CloudianToken-MADU-EN-VG-artwork.png/300px-CloudianToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Cloudian - Sheep Cloud". This Token cannot be Tributed for a Tribute Summon, unless it is for a "Cloudian" monster.\n',
					summoner: ["Cloudian - Sheep Cloud"],
				},
				{
					name: "Compass_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/68/CompassToken-MADU-EN-VG-artwork.png/300px-CompassToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Cosmic Compass".\n',
					summoner: ["Cosmic Compass"],
				},
				{
					name: "Congester_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/30/CongesterToken-DULI-EN-VG-CA.png/300px-CongesterToken-DULI-EN-VG-CA.png",
					],
					desc: "",
					summoner: ["Cluster Congester"],
				},
				{
					name: "Double_Dude_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/9f/DoubleDudeToken-MADU-EN-VG-artwork.png/300px-DoubleDudeToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Destiny HERO - Double Dude".\n',
					summoner: ["Destiny HERO - Double Dude"],
				},
				{
					name: "Einherjar_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/9f/EinherjarToken-MADU-EN-VG-artwork.png/300px-EinherjarToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Valkyrie of the Nordic Ascendant".\n',
					summoner: ["Valkyrie of the Nordic Ascendant"],
				},
				{
					name: "Engine_Token",
					list: [
						"https://ms.yugipedia.com//thumb/7/78/EngineToken-MADU-EN-VG-artwork.png/300px-EngineToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Fiendish Engine Ω".\n',
					summoner: [
						"Fiendish Engine Omega",
						"Motor Shell",
						"Motor Frenzy",
					],
				},
				{
					name: "Evil_Token",
					list: [
						"https://ms.yugipedia.com//thumb/7/77/EvilToken-MADU-EN-VG-artwork.png/300px-EvilToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Vicious Claw".\n',
					summoner: ["Vicious Claw"],
				},
				{
					name: "Fireball_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/06/FireballToken-MADU-EN-VG-artwork.png/300px-FireballToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Goka, the Pyre of Malice".\n',
					summoner: [
						"Goka, the Pyre of Malice",
						"Graveyard of Wandering Souls",
					],
				},
				{
					name: "Ghost_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/30/GhostToken-MADU-EN-VG-artwork.png/300px-GhostToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Damage Translation".\n',
					summoner: ["Damage Translation"],
				},
				{
					name: "Gift_Fiend_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/bb/GiftFiendToken-MADU-EN-VG-artwork.png/300px-GiftFiendToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Revival Gift".\n',
					summoner: ["Revival Gift"],
				},
				{
					name: "Horseytail_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/9c/HorseytailToken-MADU-EN-VG-artwork.png/300px-HorseytailToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Horseytail". When this Token is destroyed by battle with a Plant-Type monster, its controller sends 1 card from their hand to the Graveyard.\n',
					summoner: ["Horseytail"],
				},
				{
					name: "Ice_Coffin_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/88/IceCoffinToken-MADU-EN-VG-artwork.png/300px-IceCoffinToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Royal Knight of the Ice Barrier". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Royal Knight of the Ice Barrier"],
				},
				{
					name: "Insect_Monster_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/09/InsectMonsterToken-MADU-EN-VG-artwork.png/300px-InsectMonsterToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Insect Queen".\n',
					summoner: ["Insect Queen", "Metamorphosed Insect Queen"],
				},
				{
					name: "Ivy_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e2/IvyToken-MADU-EN-VG-artwork.png/300px-IvyToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Wall of Ivy". When it is destroyed, the controller takes 300 damage.\n',
					summoner: ["Wall of Ivy"],
				},
				{
					name: "Jurrac_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a5/JurracToken-MADU-EN-VG-artwork.png/300px-JurracToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Jurrac Stauriko". This Token cannot be Tributed for a Tribute Summon, unless it is for a "Jurrac" monster.\n',
					summoner: ["Jurrac Stauriko"],
				},
				{
					name: "Kagemusha_Raccoon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d9/KagemushaRaccoonToken-MADU-EN-VG-artwork.png/300px-KagemushaRaccoonToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Number 64: Ronin Raccoon Sandayu". When Summoned, this Token\'s ATK becomes equal to the current ATK of the monster on the field that has the highest ATK (your choice, if tied).\n',
					summoner: ["Number 64: Ronin Raccoon Sandayu"],
				},
				{
					name: "Malus_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/27/MalusToken-MADU-EN-VG-artwork.png/300px-MalusToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "The Golden Apples". The ATK and DEF of this Token are each equal to the amount of Life Points gained by the effect of "The Golden Apples".\n',
					summoner: ["The Golden Apples"],
				},
				{
					name: "Manipulator_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a0/ManipulatorToken-MADU-EN-VG-artwork.png/300px-ManipulatorToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Number C43: High Manipulator of Chaos".\n',
					summoner: ["Number C43: High Manipulator of Chaos"],
				},
				{
					name: "Metabo_Token",
					list: [
						"https://ms.yugipedia.com//thumb/7/7a/MetaboToken-MADU-EN-VG-artwork.png/300px-MetaboToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Metabo Globster". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Metabo Globster"],
				},
				{
					name: "Metal_Fiend_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/bd/MetalFiendToken-MADU-EN-VG-artwork.png/300px-MetalFiendToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Fiend\'s Sanctuary". This Token cannot attack. Your opponent takes any battle damage you would have taken from battles involving this Token. During each of your Standby Phases, pay 1000 Life Points or destroy this Token.\n',
					summoner: ["Fiend's Sanctuary"],
				},
				{
					name: "Mini_Mare_Mare_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f3/MiniMareMareToken-MADU-EN-VG-artwork.png/300px-MiniMareMareToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Mare Mare"],
				},
				{
					name: "Mirage_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f2/MirageToken-MADU-EN-VG-artwork.png/300px-MirageToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Physical Double". Destroy this Token at the end of the turn.\n',
					summoner: ["Physical Double"],
				},
				{
					name: "Moon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/62/MoonToken-MADU-EN-VG-artwork.png/300px-MoonToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Arcana Force XVIII - The Moon".\n',
					summoner: ["Arcana Force XVIII - The Moon"],
				},
				{
					name: "Multi_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/68/MultiToken-MADU-EN-VG-artwork.png/300px-MultiToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Lord British Space Fighter".\n',
					summoner: ["Lord British Space Fighter"],
				},
				{
					name: "Needle_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/c3/NeedleToken-MADU-EN-VG-artwork.png/300px-NeedleToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Cactus Fighter".\n',
					summoner: ["Cactus Fighter"],
				},
				{
					name: "Nightmare_Archfiend_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/54/NightmareArchfiendToken-MADU-EN-VG-artwork.png/300px-NightmareArchfiendToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Nightmare Archfiends". When it is destroyed, the controller will take 800 damage.\n',
					summoner: ["Nightmare Archfiends"],
				},
				{
					name: "Nordic_Beast_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/4c/NordicBeastToken-MADU-EN-VG-artwork.png/300px-NordicBeastToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Tanngrisnir of the Nordic Beasts".\n',
					summoner: ["Tanngrisnir of the Nordic Beasts"],
				},
				{
					name: "Overflow_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/b2/OverflowToken-DULI-EN-VG-CA.png/300px-OverflowToken-DULI-EN-VG-CA.png",
					],
					desc: 'This card can be used as an "Overflow Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Overflow Dragon"],
				},
				{
					name: "Oyster_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e3/OysterToken-MADU-EN-VG-artwork.png/300px-OysterToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Oyster Meister".\n',
					summoner: ["Oyster Meister"],
				},
				{
					name: "Phantom_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/4e/PhantomToken-MADU-EN-VG-artwork.png/300px-PhantomToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Number 48: Shadow Lich".\n',
					summoner: ["Number 48: Shadow Lich"],
				},
				{
					name: "Plant_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a9/PlantToken-MADU-EN-VG-artwork.png/300px-PlantToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Bamboo Scrap".\n',
					summoner: ["Bamboo Scrap"],
				},
				{
					name: "Regenerating_Rose_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/07/RegeneratingRoseToken-MADU-EN-VG-artwork.png/300px-RegeneratingRoseToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Regenerating Rose".\n',
					summoner: ["Regenerating Rose"],
				},
				{
					name: "Rose_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/f0/RoseToken-MADU-EN-VG-artwork.png/300px-RoseToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Black Garden".\n',
					summoner: [
						"Black Garden",
						"Blooming of the Darkest Rose",
						"Garden Rose Flora",
					],
				},
				{
					name: "Seed_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/35/SeedToken-MADU-EN-VG-artwork.png/300px-SeedToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Seed of Flame". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Seed of Flame"],
				},
				{
					name: "Sinister_Seed_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/0e/SinisterSeedToken-MADU-EN-VG-artwork.png/300px-SinisterSeedToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Sinister Seeds".\n',
					summoner: ["Sinister Seeds"],
				},
				{
					name: "Soul_Token",
					list: [
						"https://ms.yugipedia.com//thumb/1/1a/SoulToken-MADU-EN-VG-artwork.png/300px-SoulToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Limit Impulse". This Token cannot be Tributed, except for a Tribute Summon.\n',
					summoner: ["Limit Impulse"],
				},
				{
					name: "Spinos_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d7/SpinosToken-MADU-EN-VG-artwork.png/300px-SpinosToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Jurrac Spinos".\n',
					summoner: ["Jurrac Spinos"],
				},
				{
					name: "Stag_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/00/StagToken-DULI-EN-VG-CA.png/300px-StagToken-DULI-EN-VG-CA.png",
					],
					desc: "",
					summoner: ["Boot Staggered"],
				},
				{
					name: "Steam_Token",
					list: [
						"https://ms.yugipedia.com//thumb/4/47/SteamToken-MADU-EN-VG-artwork.png/300px-SteamToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Blackwing - Steam the Cloak".\n',
					summoner: ["Blackwing - Steam the Cloak"],
				},
				{
					name: "Thunder_Option_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a8/ThunderOptionToken-MADU-EN-VG-artwork.png/300px-ThunderOptionToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Blue Thunder T-45". This Token cannot be used as a Tribute for a Tribute Summon.\n',
					summoner: ["Blue Thunder T-45"],
				},
				{
					name: "Utchatzimime_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/9b/UtchatzimimeToken-MADU-EN-VG-artwork.png/300px-UtchatzimimeToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Phantasmal Lord Ultimitl Bishbaalkin"],
				},
				{
					name: "Umbral_Horror_Mirage_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/bc/UmbralHorrorMirageToken-MADU-EN-VG-artwork.png/300px-UmbralHorrorMirageToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summon with the effect of "Corrupted Keys". When Summoned, this Token\'s ATK becomes equal to the current ATK of the Xyz Monster targeted by "Corrupted Keys". This Token cannot attack your opponent directly or be Tributed, except for a Tribute Summon. When that face-up Xyz Monster leaves the field, destroy this Token.\n',
					summoner: ["Corrupted Keys"],
				},
				{
					name: "Vague_Shadow_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/56/VagueShadowToken-MADU-EN-VG-artwork.png/300px-VagueShadowToken-MADU-EN-VG-artwork.png",
					],
					desc: "",
					summoner: ["Blackwing - Gofu the Vague Shadow"],
				},
				{
					name: "Wicked_Plant_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/3f/WickedPlantToken-MADU-EN-VG-artwork.png/300px-WickedPlantToken-MADU-EN-VG-artwork.png",
					],
					desc: 'Special Summoned with the effect of "Des Dendle".\n',
					summoner: ["Des Dendle"],
				},
			],
			printed: [
				{
					name: "Doomsday_Token",
					list: [
						"https://ms.yugipedia.com//9/91/Token-TKN4-JP-C-Doomsday1.png",
						"https://ms.yugipedia.com//c/c0/Token-TKN4-JP-C-Doomsday2.png",
					],
					desc: 'Special Summoned with the effect of "Fires of Doomsday". This Token cannot be used as a Tribute for a Tribute Summon, unless it is for a DARK monster.\n',
					summoner: ["Fires of Doomsday"],
				},
				{
					name: "Laval_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/58/Token-TKN3-JP-C-Laval.jpg/300px-Token-TKN3-JP-C-Laval.jpg",
					],
					desc: "This card can be used as any Token.\n",
					summoner: ["Searing Fire Wall"],
				},
				{
					name: "Spider_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/ff/Token-SOVR-EN-C-UE-Spider.jpg/300px-Token-SOVR-EN-C-UE-Spider.jpg",
					],
					desc: 'Special Summoned with the effect of "Spider Egg".\n',
					summoner: ["Spider Egg"],
				},
				{
					name: "Vassal_Token",
					list: [
						"https://ms.yugipedia.com//thumb/f/fd/Token-TKN4-EN-SR-UE-Vassal.png/300px-Token-TKN4-EN-SR-UE-Vassal.png",
					],
					desc: 'Special Summoned with the effect of "Mithra the Thunder Vassal".\n',
					summoner: ["Mithra the Thunder Vassal"],
				},
				{
					name: "Ancient_Gear_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/56/AncientGearToken-SR03-EN-C-1E.png/300px-AncientGearToken-SR03-EN-C-1E.png",
					],
					desc: 'This card can be used as an "Ancient Gear Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Ancient Gear Catapult"],
				},
				{
					name: "Black_Sheep_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/ea/BlackSheepToken-18TP-JP-C.png/300px-BlackSheepToken-18TP-JP-C.png",
					],
					desc: 'This card can be used as a "Black Sheep Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Scapeghost"],
				},
				/*
				{
					name: "Charisma_Token",
					list: [
						"https://ms.yugipedia.com//e/e1/CharismaToken-VJMP-JP-C.png",
					],
					desc: "If you use this card as a Token, you should consider using other Token Cards instead.*Charisma-Type and LAUGH Attribute do not exist in the Yu-Gi-Oh! Official Card Game's rules.\n",
					summoner: [""],
				},
				*/
				{
					name: "Crystal_Beast_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/b2/CrystalBeastToken-SDCB-EN-C-1E.png/300px-CrystalBeastToken-SDCB-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Crystal Beast Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Crystal Aegis"],
				},
				{
					name: "Crystron_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/ea/CrystronToken-TK01-JP-R.png/300px-CrystronToken-TK01-JP-R.png",
					],
					desc: 'This card can be used as a "Crystron Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Crystron Rosenix"],
				},
				{
					name: "Dark_Soul_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/21/DarkSoulToken-MAMA-EN-UR-1E.png/300px-DarkSoulToken-MAMA-EN-UR-1E.png",
					],
					desc: 'This card can be used as a "Dark Soul Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Dragonecro Nethersoul Dragon"],
				},
				{
					name: "Doppel_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/ee/DoppelToken-TK02-JP-R.png/300px-DoppelToken-TK02-JP-R.png",
					],
					desc: 'This card can be used as a "Doppel Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Doppelwarrior"],
				},
				{
					name: "Dragon_Lord_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/86/DragonLordToken-SR02-EN-C-1E.png/300px-DragonLordToken-SR02-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Dragon Lord Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Ruins of the Divine Dragon Lords"],
				},
				{
					name: "Dragonoid_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/8c/DragonoidToken-17TP-JP-C.png/300px-DragonoidToken-17TP-JP-C.png",
					],
					desc: 'This card can be used as a "Dragonoid Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Dragonoid Generator"],
				},
				{
					name: "Dual_Avatar_Spirit_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/89/DualAvatarSpiritToken-OP14-EN-SR-UE.png/300px-DualAvatarSpiritToken-OP14-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Dual Avatar Spirit Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: [
						"Dual Avatar Invitation",
						"Dual Avatar Return",
						"Perfect Sync - A-Un",
					],
				},
				{
					name: "Duel_Dragon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/80/DuelDragonToken-OP11-EN-SR-UE.png/300px-DuelDragonToken-OP11-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Duel Dragon Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Duel Link Dragon, the Duel Dragon"],
				},
				{
					name: "Emissary_of_Darkness_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/58/EmissaryofDarknessToken-TK02-JP-R.png/300px-EmissaryofDarknessToken-TK02-JP-R.png",
					],
					desc: 'This card can be used as an "Emissary of Darkness Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Gorz the Emissary of Darkness"],
				},
				{
					name: "Fluff_Token",
					list: [
						"https://ms.yugipedia.com//5/55/FluffToken-VJMP-JP-C.png",
					],
					desc: 'This card can be used as a "Fluff Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Dandylion"],
				},
				{
					name: "G_Golem_Token",
					list: [
						"https://ms.yugipedia.com//thumb/2/25/GGolemToken-MAMA-EN-UR-1E.png/300px-GGolemToken-MAMA-EN-UR-1E.png",
					],
					desc: 'This card can be used as a "G Golem Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["G Golem Rock Hammer"],
				},
				{
					name: "Gadget_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/00/GadgetToken-18TP-JP-C.png/300px-GadgetToken-18TP-JP-C.png",
					],
					desc: 'This card can be used as a "Gadget Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Cyberse Gadget"],
				},
				{
					name: "Generaider_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/53/GeneraiderToken-OP13-EN-SR-UE.png/300px-GeneraiderToken-OP13-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Generaider Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Generaider Boss Stage"],
				},
				{
					name: "Grinder_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e3/GrinderToken-TK01-JP-R.png/300px-GrinderToken-TK01-JP-R.png",
					],
					desc: 'This card can be used as a "Grinder Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Grinder Golem"],
				},
				{
					name: "Hippo_Token",
					list: [
						"https://ms.yugipedia.com//f/f3/HippoToken-ST16-JP-C-Orange.png",
						"https://ms.yugipedia.com//9/90/HippoToken-YS16-EN-C-1E-Orange.png",
						"https://ms.yugipedia.com//8/85/HippoToken-ST16-JP-C-Yellow.png",
						"https://ms.yugipedia.com//2/2e/HippoToken-YS16-EN-C-1E-Yellow.png",
						"https://ms.yugipedia.com//f/f9/HippoToken-ST16-JP-C-Blue.png",
						"https://ms.yugipedia.com//d/d7/HippoToken-YS16-EN-C-1E-Blue.png",
						"https://ms.yugipedia.com//0/03/HippoToken-TK04-JP-UR.png",
					],
					desc: 'This card can be used as a "Hippo Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Hippo Carnival", "Super Hippo Carnival"],
				},
				{
					name: "Ice_Barrier_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/63/IceBarrierToken-OP17-EN-SR-UE.png/300px-IceBarrierToken-OP17-EN-SR-UE.png",
					],
					desc: 'This card can be used as an "Ice Barrier Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Speaker for the Ice Barriers"],
				},
				{
					name: "Infernoid_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/5d/InfernoidToken-AT09-JP-C.png/300px-InfernoidToken-AT09-JP-C.png",
					],
					desc: 'This card can be used as an "Infernoid Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Void Expansion"],
				},
				{
					name: "Jurraegg_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/62/JurraeggToken-SR04-EN-C-1E.png/300px-JurraeggToken-SR04-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Jurraegg Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Lost World"],
				},
				{
					name: "Kuriboh_Token",
					list: [
						"https://ms.yugipedia.com//9/9b/KuribohToken-AC19-EN-SR-1E.png",
						"https://ms.yugipedia.com//6/65/KuribohToken-21TP-JP-C.png",
					],
					desc: 'This card can be used as a "Kuriboh Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Multiply"],
				},
				{
					name: "Lamb_Token",
					list: [
						"https://ms.yugipedia.com//thumb/0/01/LambToken-17TP-JP-C.png/300px-LambToken-17TP-JP-C.png",
					],
					desc: 'This card can be used as a "Lamb Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Stray Lambs"],
				},
				{
					name: "Mask_Token",
					list: [
						"https://ms.yugipedia.com//thumb/6/6b/MaskToken-OP19-EN-SR-UE.png/300px-MaskToken-OP19-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Mask Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Ecole de Zone"],
				},
				{
					name: "Mecha_Phantom_Beast_Token",
					list: [
						"https://ms.yugipedia.com//3/36/MechaPhantomBeastToken-OP09-EN-SR-UE-Megaraptor.png",
						"https://ms.yugipedia.com//5/52/MechaPhantomBeastToken-VJMP-JP-C.png",
						"https://ms.yugipedia.com//2/25/MechaPhantomBeastToken-OP09-EN-SR-UE-Harrliard.png",
						"https://ms.yugipedia.com//0/01/MechaPhantomBeastToken-OP09-EN-SR-UE-Dracossack.png",
					],
					desc: 'This card can be used as a "Mecha Phantom Beast Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: [
						"Aerial Recharge",
						"Mecha Phantom Beast Aerosguin",
						"Mecha Phantom Beast Auroradon",
						"Mecha Phantom Beast Blackfalcon",
						"Mecha Phantom Beast Blue Impala",
						"Mecha Phantom Beast Coltwing",
						"Mecha Phantom Beast Dracossack",
						"Mecha Phantom Beast Hamstrat",
						"Mecha Phantom Beast Harrliard",
						"Mecha Phantom Beast Kalgriffin",
						"Mecha Phantom Beast Megaraptor",
						"Mecha Phantom Beast O-Lion",
						"Mecha Phantom Beast Raiten",
						"Mecha Phantom Beast Stealthray",
						"Mecha Phantom Beast Tetherwolf",
						"Mecha Phantom Beast Warbluran",
						"Vertical Landing",
					],
				},
				{
					name: "Ogdoadic_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/89/OgdoadicToken-OP18-EN-SR-UE.png/300px-OgdoadicToken-OP18-EN-SR-UE.png",
					],
					desc: 'This card can be used as an "Ogdoadic Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Ogdoadic Calling"],
				},
				{
					name: "Ojama_Token",
					list: [
						"https://ms.yugipedia.com//d/db/OjamaToken-TK03-JP-R-OjamaYellow.png",
						"https://ms.yugipedia.com//3/3f/OjamaToken-TK03-JP-R-OjamaGreen.png",
						"https://ms.yugipedia.com//7/7e/OjamaToken-TK03-JP-R-OjamaBlack.png",
						"https://ms.yugipedia.com//1/16/OjamaToken-17TP-JP-C.png",
					],
					desc: 'This card can be used as an "Ojama Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Ojama Duo", "Ojama Trio"],
				},
				{
					name: "Option_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/34/OptionToken-OP20-EN-SR-UE.png/300px-OptionToken-OP20-EN-SR-UE.png",
					],
					desc: 'This card can be used as an "Option Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Victory Viper XX03", "Power Capsule"],
				},
				{
					name: "Phantasm_Token",
					list: [
						"https://ms.yugipedia.com//thumb/1/18/PhantasmToken-SDSA-EN-C-1E.png/300px-PhantasmToken-SDSA-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Phantasm Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Raviel, Lord of Phantasms"],
				},
				{
					name: "Phantasmal_Martyr_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/c5/PhantasmalMartyrToken-SDSA-EN-C-1E.png/300px-PhantasmalMartyrToken-SDSA-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Phantasmal Martyr Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Phantasmal Martyrs"],
				},
				{
					name: "Photon_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/82/PhotonToken-TK01-JP-R.png/300px-PhotonToken-TK01-JP-R.png",
					],
					desc: 'This card can be used as a "Photon Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Photon Sanctuary"],
				},
				{
					name: "Primal_Being_Token",
					list: [
						"https://ms.yugipedia.com//thumb/5/5e/PrimalBeingToken-OP12-EN-SR-UE.png/300px-PrimalBeingToken-OP12-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Primal Being Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Nibiru, the Primal Being"],
				},
				{
					name: "Sheep_Token",
					list: [
						"https://ms.yugipedia.com//6/6e/SheepToken-TK01-JP-R-Blue.png",
						"https://ms.yugipedia.com//1/14/SheepToken-TK01-JP-R-Orange.png",
						"https://ms.yugipedia.com//2/2c/SheepToken-TK01-JP-R-Pink.png",
						"https://ms.yugipedia.com//1/13/SheepToken-TK01-JP-R-Yellow.png",
					],
					desc: 'This card can be used as a "Sheep Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Scapegoat"],
				},
				{
					name: "Shinobird_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/33/ShinobirdToken-AT16-JP-C.png/300px-ShinobirdToken-AT16-JP-C.png",
					],
					desc: 'This card can be used as a "Shinobird Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Shinobaron Peacock", "Shinobaroness Peacock"],
				},
				{
					name: "Sky_Striker_Ace_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/37/SkyStrikerAceToken-MAMA-EN-UR-1E.png/300px-SkyStrikerAceToken-MAMA-EN-UR-1E.png",
					],
					desc: 'This card can be used as a "Sky Striker Ace Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Sky Striker Mecha - Hornet Drones"],
				},
				{
					name: "Skyblaster_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/e3/SkyblasterToken-TK01-JP-R.png/300px-SkyblasterToken-TK01-JP-R.png",
					],
					desc: 'This card can be used as a "Skyblaster Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Phantom Skyblaster"],
				},
				{
					name: "Slime_Token",
					list: [
						"https://ms.yugipedia.com//thumb/8/89/SlimeToken-OP19-EN-SR-UE.png/300px-SlimeToken-OP19-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Slime Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Jam Breeding Machine", "Reactor Slime"],
				},
				{
					name: "Synchron_Token",
					list: [
						"https://ms.yugipedia.com//thumb/c/c9/SynchronToken-AT09-JP-C.png/300px-SynchronToken-AT09-JP-C.png",
					],
					desc: 'This card can be used as a "Synchron Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Synchron Carrier"],
				},
				{
					name: "Synthetic_Seraphim_Token",
					list: [
						"https://ms.yugipedia.com//thumb/b/b0/SyntheticSeraphimToken-SR05-EN-C-1E.png/300px-SyntheticSeraphimToken-SR05-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Synthetic Seraphim Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Synthetic Seraphim"],
				},
				{
					name: "Torment_Token",
					list: [
						"https://ms.yugipedia.com//thumb/d/d6/TormentToken-SR06-EN-C-1E.png/300px-TormentToken-SR06-EN-C-1E.png",
					],
					desc: 'This card can be used as a "Torment Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Lair of Darkness"],
				},
				{
					name: "Trickstar_Token",
					list: [
						"https://ms.yugipedia.com//thumb/9/95/TrickstarToken-OP10-EN-SR-UE.png/300px-TrickstarToken-OP10-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "Trickstar Token". *If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: ["Trickstar Live Stage", "Trickstar Festival"],
				},
				{
					name: "World_Legacy_Token",
					list: [
						"https://ms.yugipedia.com//thumb/3/38/WorldLegacyToken-OP15-EN-SR-UE.png/300px-WorldLegacyToken-OP15-EN-SR-UE.png",
					],
					desc: 'This card can be used as a "World Legacy Token".*If used for another Token, apply that Token\'s Type/Attribute/Level/ATK/DEF.\n',
					summoner: [
						'World Legacy - "World Lance"',
						"Girsu, the Orcust Mekk-Knight",
					],
				},
			],
			generic: [
				{
					name: "Token_(15th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3e/Token-15AY-JP-UR-15thAnniversary.png/300px-Token-15AY-JP-UR-15thAnniversary.png",
					],
					desc: "This card can be used as any Token.2014 is the 15th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!\n",
					summoner: [""],
				},
				{
					name: "Token_(20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/0/08/Token-JF16-JP-NPR-20thAnniversary.png/300px-Token-JF16-JP-NPR-20thAnniversary.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Ai_and_Dark_Templar_@Ignister)",
					list: [
						"https://ms.yugipedia.com//thumb/1/1f/Token-19CC-JP-C.png/300px-Token-19CC-JP-C.png",
					],
					desc: 'This card can be used as any Token.Ai: "The creation of dark shadows! The wisdom of dark night scatters throughout the world!Gathers in my hand to become the power of rising vigor! Link Summon! Dark Templar @Ignister!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Ai_and_The_Arrival_Cyberse_@Ignister)",
					list: [
						"https://ms.yugipedia.com//thumb/8/88/Token-TK02-JP-R-AiTheArrivalCyberseIgnister.png/300px-Token-TK02-JP-R-AiTheArrivalCyberseIgnister.png",
					],
					desc: 'This card can be used as any Token.Ai: "The six shine and become one! Superior! Splendid! Stunning! Elegant! Super!... Ultra super! Appear! The Arrival Cyberse @Ignister!"',
					summoner: [""],
				},
				{
					name: "Token_(Akiza_and_%22Black_Rose_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d7/Token-TK03-JP-R-AkizaandBlackRoseDragon.png/300px-Token-TK03-JP-R-AkizaandBlackRoseDragon.png",
					],
					desc: 'This card can be used as any Token.Akiza: "Chilling flames engulf the entire world! Pitch-dark flower, set into bloom!Appear, Black Rose Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Alexis_and_%22Cyber_Angel_Dakini%22)",
					list: [
						"https://ms.yugipedia.com//thumb/2/20/Token-TK03-JP-R-AlexisandCyberAngelDakini.png/300px-Token-TK03-JP-R-AlexisandCyberAngelDakini.png",
					],
					desc: 'This card can be used as any Token.Alexis: "I\'ll show you the power of the Blue girls!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Anna_and_%22Superdreadnought_Rail_Cannon_Gustav_Max%22)",
					list: [
						"https://ms.yugipedia.com//thumb/f/f1/Token-TK03-JP-R-AnnaandSuperdreadnoughtRailCannonGustavMax.png/300px-Token-TK03-JP-R-AnnaandSuperdreadnoughtRailCannonGustavMax.png",
					],
					desc: 'This card can be used as any Token.Anna: "From beyond the railway, arriving here and now, alongside the tremors of the earth!Appear, Superdreadnought Rail Cannon Gustav Max!"',
					summoner: [""],
				},
				{
					name: "Token_(Antinomy_and_%22T.G._Blade_Blaster%22)",
					list: [
						"https://ms.yugipedia.com//thumb/6/62/Token-TK04-JP-R-AntinomyandTGBladeBlaster.png/300px-Token-TK04-JP-R-AntinomyandTGBladeBlaster.png",
					],
					desc: 'This card can be used as any Token.Antinomy: "Limiter removal, Level 10! Main bus booster control,all clear! Infinite power, here be released, and pierce through to beyond the dimension!Go! Accel Synchro! Come on! T.G. Blade Blaster!"',
					summoner: [""],
				},
				{
					name: "Token_(Aster_and_%22Destiny_HERO_-_Plasma%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/42/Token-TK03-JP-R-AsterandDestinyHEROPlasma.png/300px-Token-TK03-JP-R-AsterandDestinyHEROPlasma.png",
					],
					desc: 'This card can be used as any Token.Aster: "In order to put an end to destiny, the card that became the origin of destiny is most appropriate...Come on! The ultimate Destiny HERO - Plasma!"',
					summoner: [""],
				},
				{
					name: "Token_(Astral_and_Number_39:_Utopia)",
					list: [
						"https://ms.yugipedia.com//thumb/1/19/Token-TK01-JP-R-AstralNumber39Utopia.png/300px-Token-TK01-JP-R-AstralNumber39Utopia.png",
					],
					desc: 'This card can be used as any Token.Astral: "Let\'s do it, Yuma! Together!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Bastion_and_%22Water_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/1/10/Token-TK04-JP-R-BastionandWaterDragon.png/300px-Token-TK04-JP-R-BastionandWaterDragon.png",
					],
					desc: 'This card can be used as any Token.Bastion: "These are the tactics that I thoroughly came up with to fight against you! There are no mistakes in my calculations!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Blue_Angel_and_Trickstar_Holly_Angel)",
					list: [
						"https://ms.yugipedia.com//thumb/3/39/Token-TK01-JP-R-BlueAngelTrickstarHollyAngel.png/300px-Token-TK01-JP-R-BlueAngelTrickstarHollyAngel.png",
					],
					desc: 'This card can be used as any Token.Blue Angel: "Get ready. This is the finale!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Blue_Gal_and_%22Trickstar_Band_Sweet_Guitar%22)",
					list: [
						"https://ms.yugipedia.com//thumb/5/5c/Token-TK03-JP-R-BlueGalandTrickstarBandSweetGuitar.png/300px-Token-TK03-JP-R-BlueGalandTrickstarBandSweetGuitar.png",
					],
					desc: 'This card can be used as any Token.Blue Gal: "Hear the song of the Trickstars!Trickstar Band Sweet Guitar!"',
					summoner: [""],
				},
				{
					name: "Token_(Blue_Maiden_and_Marincess_Great_Bubble_Reef)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c8/Token-TK02-JP-R-BlueMaidenMarincessGreatBubbleReef.png/300px-Token-TK02-JP-R-BlueMaidenMarincessGreatBubbleReef.png",
					],
					desc: 'This card can be used as any Token.Blue Maiden: "The mother ocean\'s deep blue. Gather in my hand for the power of affection and purification.Appear, Marincess Great Bubble Reef!"',
					summoner: [""],
				},
				{
					name: "Token_(Carly_and_%22Fortune_Fairies%22)",
					list: [
						"https://ms.yugipedia.com//thumb/2/25/Token-TK04-JP-R-CarlyandFortuneFairies.png/300px-Token-TK04-JP-R-CarlyandFortuneFairies.png",
					],
					desc: 'This card can be used as any Token.Carly: "Drawing this card means your fortune today is...?"\n',
					summoner: [""],
				},
				{
					name: "Token_(Chazz_and_%22Armed_Dragon_Thunder_LV10%22)",
					list: [
						"https://ms.yugipedia.com//thumb/7/7c/Token-TK03-JP-R-ChazzandArmedDragonThunderLV10.png/300px-Token-TK03-JP-R-ChazzandArmedDragonThunderLV10.png",
					],
					desc: 'This card can be used as any Token.Chazz: "1, 10, 100, 1000, Armed Dragon Thunder!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Crow_and_%22Black-Winged_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c1/Token-TK03-JP-R-CrowandBlackWingedDragon.png/300px-Token-TK03-JP-R-CrowandBlackWingedDragon.png",
					],
					desc: 'This card can be used as any Token.Crow: "Darkened gales, reveal hidden wishes on your wings!Soar, Black Feather Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Crowler_and_%22Ancient_Gear_Golem%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e3/Token-TK04-JP-R-CrowlerandAncientGearGolem.png/300px-Token-TK04-JP-R-CrowlerandAncientGearGolem.png",
					],
					desc: 'This card can be used as any Token.Crowler: "Heh, I\'ll make sure to show you very clearlythe massive gap between a top-tier instructor and a dropout!"',
					summoner: [""],
				},
				{
					name: "Token_(Declan_and_D/D/D_Doom_King_Armageddon)",
					list: [
						"https://ms.yugipedia.com//0/09/Token-PREV-JP-C-DeclanDDDDoomKingArmageddon.png",
						"https://yugipedia.com/thumb.php?f=Token-TK02-JP-R-DeclanDDDDoomKingArmageddon.png&w=300",
					],
					desc: 'This card can be used as any Token.Declan: "Pendulum Summon!! Appear! My monsters!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Ghost_Gal_and_Altergeist_Primebanshee)",
					list: [
						"https://ms.yugipedia.com//thumb/f/f6/Token-TK01-JP-R-GhostGalAltergeistPrimebanshee.png/300px-Token-TK01-JP-R-GhostGalAltergeistPrimebanshee.png",
					],
					desc: 'This card can be used as any Token.Ghost Gal: "Appear! The circuit that connects to the unknown parallel universe!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Gong_and_%22Rise_to_Full_Height%22)",
					list: [
						"https://ms.yugipedia.com//thumb/6/66/Token-TK04-JP-R-GongandRisetoFullHeight.png/300px-Token-TK04-JP-R-GongandRisetoFullHeight.png",
					],
					desc: 'This card can be used as any Token.Gong: "Did you see that?! This is the true essence of the Heavystrong Duel!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Gong_and_%22Superheavy_Samurai_Shogun_Susanowo%22)",
					list: [
						"https://ms.yugipedia.com//thumb/2/2a/Token-TK03-JP-R-GongandSuperheavySamuraiShogunSusanowo.png/300px-Token-TK03-JP-R-GongandSuperheavySamuraiShogunSusanowo.png",
					],
					desc: 'This card can be used as any Token.Gong: "Raging deity, in unison with the roar of a thousand blades, come forth in a spiraling sandstorm!Synchro Summon! Now come before us! Superheavy Samurai Warlord Susanowo!"',
					summoner: [""],
				},
				{
					name: "Token_(Ishizu_and_%22Exchange_of_the_Spirit%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4b/Token-TK04-JP-R-IshizuandExchangeoftheSpirit.png/300px-Token-TK04-JP-R-IshizuandExchangeoftheSpirit.png",
					],
					desc: 'This card can be used as any Token.Ishizu: "I have already seen this vision..."\n',
					summoner: [""],
				},
				{
					name: "Token_(Jack_and_Red_Dragon_Archfiend)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c9/Token-TK03-JP-R-JackandRedDragonArchfiend.png/300px-Token-TK03-JP-R-JackandRedDragonArchfiend.png",
					],
					desc: 'This card can be used as any Token.Jack: "The pulse of the King now forms a line here! Witness the power of the rumbling heavens!My soul, Red Dragon Archfiend!"',
					summoner: [""],
				},
				{
					name: "Token_(Jack_%26_Yuya)",
					list: [
						"https://ms.yugipedia.com//thumb/1/12/Token-AT14-JP-C-JackYuya.png/300px-Token-AT14-JP-C-JackYuya.png",
					],
					desc: 'This card can be used as any Token.Yuya: "Pendulum isn\'t something that I borrowed from anyone. It\'s my own word!!"Jack: "Then shout at me with those words! With your own Duel!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Jaden_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/5/53/Token-ST18-JP-C-Jaden.png/300px-Token-ST18-JP-C-Jaden.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Jaden_and_%22Elemental_HERO_Flame_Wingman%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e8/Token-TK02-JP-R-JadenandElementalHEROFlameWingman.png/300px-Token-TK02-JP-R-JadenandElementalHEROFlameWingman.png",
					],
					desc: 'This card can be used as any Token.Jaden: "I\'ll show you! My favorite card! Elemental HERO Flame Wingman!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Jaden_and_Elemental_HERO_Neos_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/5/5a/Token-20TH-JP-UR-Jaden.png/300px-Token-20TH-JP-UR-Jaden.png",
					],
					desc: 'This card can be used as any Token.Jaden: "Take this! The fury of Neo Space! "Wrath of Neos"!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Jaden_and_Winged_Kuriboh)",
					list: [
						"https://ms.yugipedia.com//thumb/9/92/Token-TK01-JP-R-JadenWingedKuriboh.png/300px-Token-TK01-JP-R-JadenWingedKuriboh.png",
					],
					desc: 'This card can be used as any Token.Jaden: "Gotcha! That was a fun duel!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Jaden_and_%22Yubel%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e8/Token-TK03-JP-R-JadenandYubel.png/300px-Token-TK03-JP-R-JadenandYubel.png",
					],
					desc: "This card can be used as any Token.Yubel: \"You're not alone at all, I'm right by your side.\"Jaden: \"That's right... inside of me, there's another soul that believes in me!\"\n",
					summoner: [""],
				},
				{
					name: "Token_(Jesse_and_%22Crystal_Beast_Ruby_Carbuncle%22)",
					list: [
						"https://ms.yugipedia.com//thumb/a/ae/Token-TK04-JP-UR-JesseandCrystalBeastRubyCarbuncle.png/300px-Token-TK04-JP-UR-JesseandCrystalBeastRubyCarbuncle.png",
					],
					desc: 'This card can be used as any Token.Jesse: "This is Ruby the Carbuncle, a legendary creature!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Jesse_and_Rainbow_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/a/a9/Token-TK01-JP-R-JesseRainbowDragon.png/300px-Token-TK01-JP-R-JesseRainbowDragon.png",
					],
					desc: 'This card can be used as any Token.Jesse: "Fly, Rainbow Dragon! To everyone\'s bridge!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Joey_and_%22Gilford_the_Lightning%22)",
					list: [
						"https://ms.yugipedia.com//thumb/c/cb/Token-TK04-JP-R-JoeyandGilfordtheLightning.png/300px-Token-TK04-JP-R-JoeyandGilfordtheLightning.png",
					],
					desc: 'This card can be used as any Token.Joey: "This guy will end you! Get ready!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Joey_and_Red-Eyes_Black_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/2/22/Token-LDK2-EN-UR-LE-JoeyandRedEyesBlackDragon.png/300px-Token-LDK2-EN-UR-LE-JoeyandRedEyesBlackDragon.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Kaiba_and_%22Blue-Eyes_Ultimate_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/6/61/Token-TK03-JP-R-KaibaandBlueEyesUltimateDragon.png/300px-Token-TK03-JP-R-KaibaandBlueEyesUltimateDragon.png",
					],
					desc: 'This card can be used as any Token.Seto Kaiba: "Tough³! Invincible³! Unbeatable³!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Kaiba_and_Blue-Eyes_White_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/7/72/Token-LDK2-EN-UR-LE-KaibaBlueEyesWhiteDragon.png/300px-Token-LDK2-EN-UR-LE-KaibaBlueEyesWhiteDragon.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Kaiba_and_%22Obelisk_the_Tormentor%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/ef/Token-TK02-JP-R-KaibaandObelisktheTormentor.png/300px-Token-TK02-JP-R-KaibaandObelisktheTormentor.png",
					],
					desc: 'This card can be used as any Token.Kaiba: "Arrive on my field as my ultimate god!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Kaiba_%26_Yugi_-_The_Dark_Side_of_Dimensions)",
					list: [
						"https://ms.yugipedia.com//thumb/8/84/Token-JF16-JP-NPR-KaibaYugiTheDarkSideofDimensions.png/300px-Token-JF16-JP-NPR-KaibaYugiTheDarkSideofDimensions.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Kalin_and_%22Infernity_Doom_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d6/Token-TK04-JP-R-KalinandInfernityDoomDragon.png/300px-Token-TK04-JP-R-KalinandInfernityDoomDragon.png",
					],
					desc: 'This card can be used as any Token.Kalin: "The dead and the living, the moment they meet at zero, the demonic dragon will be released from the cage of eternity!Synchro Summon! Come forth, Infernity Doom Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Keith_and_%22Barrel_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e9/Token-TK03-JP-R-KeithandBarrelDragon.png/300px-Token-TK03-JP-R-KeithandBarrelDragon.png",
					],
					desc: 'This card can be used as any Token.Keith: "The former American National Champion, the great Bandit Keith,will show you what hell looks like!"',
					summoner: [""],
				},
				{
					name: "Token_(Kite)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c7/Token-TK01-JP-R-Kite.png/300px-Token-TK01-JP-R-Kite.png",
					],
					desc: 'This card can be used as any Token.Kite: "Are you ready for your repentance? I\'ll hunt that soul of yours!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Kite_%26_Mizar)",
					list: [
						"https://ms.yugipedia.com//thumb/0/08/Token-CD03-JP-C-KiteMizar.png/300px-Token-CD03-JP-C-KiteMizar.png",
					],
					desc: 'This card can be used as any Token.Mizar: "Well then, come! Other owner of Galaxy-Eyes!"Kite: "As you wish! I\'ll make you realize which of us is the real Galaxy-Eyes Tamer!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Kite_and_%22Galaxy-Eyes_Photon_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/9/98/Token-TK04-JP-R-KiteandGalaxyEyesPhotonDragon.png/300px-Token-TK04-JP-R-KiteandGalaxyEyesPhotonDragon.png",
					],
					desc: "This card can be used as any Token.Kite: \"I'll protect Hart! I'll show you I'll protect him to the very end! Even if it costs me my life!!\"\n",
					summoner: [""],
				},
				{
					name: "Token_(Kite_and_%22Number_62:_Galaxy-Eyes_Prime_Photon_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/f/fd/Token-TK02-JP-R-KiteandNumber62GalaxyEyesPrimePhotonDragon.png/300px-Token-TK02-JP-R-KiteandNumber62GalaxyEyesPrimePhotonDragon.png",
					],
					desc: 'This card can be used as any Token.Kite: "Even if you can reverse time, you cannot control my future!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Leo_and_%22Life_Stream_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/1/1a/Token-TK03-JP-R-LeoandLifeStreamDragon.png/300px-Token-TK03-JP-R-LeoandLifeStreamDragon.png",
					],
					desc: 'This card can be used as any Token.Leo: "The courage and power to protect the future of the planet is a Revolution!Evolve, Life Stream Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Luna_and_%22Ancient_Fairy_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/7/74/Token-TK03-JP-R-LunaandAncientFairyDragon.png/300px-Token-TK03-JP-R-LunaandAncientFairyDragon.png",
					],
					desc: 'This card can be used as any Token.Luna: "The holy light of protection, now cross and become eternal life!A regal birth, Ancient Fairy Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Mai_and_%22Harpie_Lady_Sisters%22)",
					list: [
						"https://ms.yugipedia.com//thumb/7/75/Token-TK02-JP-R-MaiandHarpieLadySisters.png/300px-Token-TK02-JP-R-MaiandHarpieLadySisters.png",
					],
					desc: 'This card can be used as any Token.Mai: "How is it...? My Harpie Lady Combo... is perfect!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Mako_and_%22The_Legendary_Fisherman%22)",
					list: [
						"https://ms.yugipedia.com//thumb/6/62/Token-TK04-JP-R-MakoandTheLegendaryFisherman.png/300px-Token-TK04-JP-R-MakoandTheLegendaryFisherman.png",
					],
					desc: 'This card can be used as any Token.Mako: "I\'ll bring down my opponents with this card... so I have resolved..."\n',
					summoner: [""],
				},
				{
					name: "Token_(Nash_and_%22Number_C101:_Silent_Honor_DARK%22)",
					list: [
						"https://ms.yugipedia.com//thumb/2/22/Token-TK02-JP-R-NashandNumberC101SilentHonorDARK.png/300px-Token-TK02-JP-R-NashandNumberC101SilentHonorDARK.png",
					],
					desc: "This card can be used as any Token.Nash: \"I don't think I've ever hated someone this much until now!\"\n",
					summoner: [""],
				},
				{
					name: "Token_(Numbers_Club)",
					list: [
						"https://ms.yugipedia.com//b/bf/Token-VJMP-JP-NumbersClub.png",
					],
					desc: 'This card can be used as any Token."Numbers Club meeting!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Odion_and_%22Embodiment_of_Apophis%22)",
					list: [
						"https://ms.yugipedia.com//thumb/a/a6/Token-TK04-JP-R-OdionandEmbodimentofApophis.png/300px-Token-TK04-JP-R-OdionandEmbodimentofApophis.png",
					],
					desc: 'This card can be used as any Token.Odion: "Have the resolve to fall to the very depths of hell."\n',
					summoner: [""],
				},
				{
					name: "Token_(Pegasus_and_%22Relinquished%22)",
					list: [
						"https://ms.yugipedia.com//thumb/1/11/Token-TK03-JP-R-PegasusandRelinquished.png/300px-Token-TK03-JP-R-PegasusandRelinquished.png",
					],
					desc: 'This card can be used as any Token.Pegasus: "The dreadfulness of illusion monsters is just beginning..."\n',
					summoner: [""],
				},
				{
					name: "Token_(Playmaker_and_Accesscode_Talker)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d8/Token-TK02-JP-UR-PlaymakerAccesscodeTalker.png/300px-Token-TK02-JP-UR-PlaymakerAccesscodeTalker.png",
					],
					desc: 'This card can be used as any Token.Playmaker: "Seize the wind that connects to the unseen world! Link Summon!Accesscode Talker!"',
					summoner: [""],
				},
				{
					name: "Token_(Playmaker_and_Cyberse_Clock_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3c/Token-TK01-JP-R-PlaymakerCyberseClockDragon.png/300px-Token-TK01-JP-R-PlaymakerCyberseClockDragon.png",
					],
					desc: 'This card can be used as any Token.Playmaker: "Now be one, and become a new legend! Fusion Summon! Cyberse Clock Dragon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Playmaker_and_Cyberse_Quantum_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/8/86/Token-18CC-JP-C.png/300px-Token-18CC-JP-C.png",
					],
					desc: 'This card can be used as any Token.Playmaker: "The unknown power transforms into a soaring dragon! Synchro Summon!Cyberse Quantum Dragon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Playmaker_and_Decode_Talker_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/6/66/Token-20TH-JP-UR-Playmaker.png/300px-Token-20TH-JP-UR-Playmaker.png",
					],
					desc: 'This card can be used as any Token.Playmaker: "Battle! Go! Decode Talker! "Decode Destruction"!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Playmaker_and_%22Firewall_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/3/39/Token-TK03-JP-R-PlaymakerandFirewallDragon.png/300px-Token-TK03-JP-R-PlaymakerandFirewallDragon.png",
					],
					desc: 'This card can be used as any Token.Ai: "Seize the wind, Playmaker!"Playmaker: "Storm Access!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Quattro_and_%22Number_15:_Gimmick_Puppet_Giant_Grinder%22)",
					list: [
						"https://ms.yugipedia.com//thumb/f/f9/Token-TK02-JP-R-QuattroandNumber15GimmickPuppetGiantGrinder.png/300px-Token-TK02-JP-R-QuattroandNumber15GimmickPuppetGiantGrinder.png",
					],
					desc: 'This card can be used as any Token.Quattro: "It\'s about time for you to receive my true fanservice"\n',
					summoner: [""],
				},
				{
					name: "Token_(Quattro_and_%22Puppet_Parade%22)",
					list: [
						"https://ms.yugipedia.com//thumb/f/ff/Token-TK04-JP-R-QuattroandPuppetParade.png/300px-Token-TK04-JP-R-QuattroandPuppetParade.png",
					],
					desc: 'This card can be used as any Token.Quattro: "With my Duel I\'ll deliver some passionate fanserviceto your torn heart that has turned to the other side!!"',
					summoner: [""],
				},
				{
					name: "Token_(Reginald)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d9/Token-CD01-JP-C-Reginald.png/300px-Token-CD01-JP-C-Reginald.png",
					],
					desc: "This card can be used as any Token.Reginald: \"I've hit my boiling point! Right now, there's no way I can lose!\"\n",
					summoner: [""],
				},
				{
					name: "Token_(Reginald_and_%22Number_32:_Shark_Drake%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/49/Token-TK04-JP-R-ReginaldandNumber32SharkDrake.png/300px-Token-TK04-JP-R-ReginaldandNumber32SharkDrake.png",
					],
					desc: 'This card can be used as any Token.Shark: "Heh... lousy Dueling as usual.But good work nonetheless, now leave the rest to me!"',
					summoner: [""],
				},
				{
					name: "Token_(Reginald_and_%22Number_C32:_Shark_Drake_Veiss%22)",
					list: [
						"https://ms.yugipedia.com//thumb/2/23/Token-TK02-JP-R-ReginaldandNumberC32SharkDrakeVeiss.png/300px-Token-TK02-JP-R-ReginaldandNumberC32SharkDrakeVeiss.png",
					],
					desc: 'This card can be used as any Token.Reginald: "A shark doesn\'t let go once it bites down into its prey. Not until its completely gnawed!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Rio)",
					list: [
						"https://ms.yugipedia.com//0/0a/Token-PR03-JP-C-Rio.png",
						"https://ms.yugipedia.com//5/5e/Token-PR03-KR-C-UE-Rio.png",
					],
					desc: 'This card can be used as any Token.Rio: "This Duel is accepted!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Rio_and_%22Ice_Beast_Zerofyne%22)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3d/Token-TK02-JP-R-RioandIceBeastZerofyne.png/300px-Token-TK02-JP-R-RioandIceBeastZerofyne.png",
					],
					desc: "This card can be used as any Token.Rio: \"Could it be that you're about to lose in a Duel? No way. You can't lose in front of me\"\n",
					summoner: [""],
				},
				{
					name: "Token_(Shay_and_Raidraptor_-_Revolution_Falcon)",
					list: [
						"https://ms.yugipedia.com//thumb/5/5a/Token-AT12-JP-C-Shay.png/300px-Token-AT12-JP-C-Shay.png",
					],
					desc: 'This card can be used as any Token.Shay: "Prideful falcon. Spread your wings, dyed in the blood of heroes, and charge through the path of revolution!Appear! Raidraptor - Revolution Falcon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Shay_and_Raidraptor_-_Ultimate_Falcon)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4a/Token-TK02-JP-R-ShayRaidraptorUltimateFalcon.png/300px-Token-TK02-JP-R-ShayRaidraptorUltimateFalcon.png",
					],
					desc: 'This card can be used as any Token.Shay: "Supreme falcon. Carry on the wishes of your fallen friends, and fly off to the sky of victory!Appear! Raidraptor - Ultimate Falcon!"',
					summoner: [""],
				},
				{
					name: "Token_(Sora_and_%22Frightfur_Chimera%22)",
					list: [
						"https://ms.yugipedia.com//thumb/a/ae/Token-TK03-JP-R-SoraandFrightfurChimera.png/300px-Token-TK03-JP-R-SoraandFrightfurChimera.png",
					],
					desc: 'This card can be used as any Token.Sora: "I guess it\'s time for me to get a little serious too."\n',
					summoner: [""],
				},
				{
					name: "Token_(Soulburner_and_Salamangreat_Heatleo)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e8/Token-TK02-JP-R-SoulburnerSalamangreatHeatleo.png/300px-Token-TK02-JP-R-SoulburnerSalamangreatHeatleo.png",
					],
					desc: 'This card can be used as any Token.Soulburner: "Awaken true strength! Reincarnation Link Summon! Resurrect, Salamangreat Heatleo!!"',
					summoner: [""],
				},
				{
					name: "Token_(Stardust_Spark_Dragon)",
					list: [
						"https://ms.yugipedia.com//3/35/Token-VJMP-JP-StardustSparkDragon.png",
					],
					desc: 'This card can be used as any Token."Flashing ray that tears seas and stars!! Roar throughout the world and shake the souls!!"\n',
					summoner: [""],
				},
				{
					name: "Statue_Token",
					list: [
						"https://ms.yugipedia.com//thumb/e/ea/Token-TKN-KR-C-UE-Statue.png/300px-Token-TKN-KR-C-UE-Statue.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Supreme_King_Jaden_and_%22Supreme_King%27s_Castle%22)",
					list: [
						"https://ms.yugipedia.com//thumb/0/0d/Token-TK04-JP-R-SupremeKingJadenandSupremeKingsCastle.png/300px-Token-TK04-JP-R-SupremeKingJadenandSupremeKingsCastle.png",
					],
					desc: 'This card can be used as any Token.Supreme King Jaden: "My name is Supreme King, the one that will rule over this world"\n',
					summoner: [""],
				},
				{
					name: "Token_(Sylvio_and_%22Abyss_Actors%22)",
					list: [
						"https://ms.yugipedia.com//thumb/3/38/Token-TK03-JP-R-SylvioandAbyssActors.png/300px-Token-TK03-JP-R-SylvioandAbyssActors.png",
					],
					desc: 'This card can be used as any Token.Sylvio: "An excited audience, a massive crowd, now this is truly a stage fit for someone as great as me!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Sylvio_and_%22Abyss_Playhouse_-_Fantastic_Theater%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4d/Token-TK04-JP-R-SylvioandAbyssPlayhouseFantasticTheater.png/300px-Token-TK04-JP-R-SylvioandAbyssPlayhouseFantasticTheater.png",
					],
					desc: 'This card can be used as any Token.Sylvio: "The Super Ultra Hyper Strong Duelistthe great Sylvio Sawatari will finish it for you!"',
					summoner: [""],
				},
				{
					name: "Token_(Syrus_and_%22Super_Vehicroid_-_Jumbo_Drill%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/48/Token-TK03-JP-R-SyrusandSuperVehicroidJumboDrill.png/300px-Token-TK03-JP-R-SyrusandSuperVehicroidJumboDrill.png",
					],
					desc: 'This card can be used as any Token.Syrus: "I don\'t need you to hold back!"\n',
					summoner: [""],
				},
				{
					name: "Token_(T%C3%A9a_and_%22Dark_Magician_Girl%22)",
					list: [
						"https://ms.yugipedia.com//thumb/b/b4/Token-TK03-JP-R-T%C3%A9aandDarkMagicianGirl.png/300px-Token-TK03-JP-R-T%C3%A9aandDarkMagicianGirl.png",
					],
					desc: 'This card can be used as any Token.Tea Gardner: "I\'ll never lose to someone like you!"\n',
					summoner: [""],
				},
				{
					name: "Tiger_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a2/Token-TKN-KR-C-UE-Tiger.png/300px-Token-TKN-KR-C-UE-Tiger.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Tori)",
					list: [
						"https://ms.yugipedia.com//thumb/1/1b/Token-TK01-JP-R-Tori.png/300px-Token-TK01-JP-R-Tori.png",
					],
					desc: 'This card can be used as any Token.Tori: "I do Kattobingu!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Tori_and_%22Fairy_Cheer_Girl%22)",
					list: [
						"https://ms.yugipedia.com//thumb/1/1b/Token-TK04-JP-R-ToriandFairyCheerGirl.png/300px-Token-TK04-JP-R-ToriandFairyCheerGirl.png",
					],
					desc: 'This card can be used as any Token.Tori: "The Duel has just begun! Keep fighting!!!"\n',
					summoner: [""],
				},
				{
					name: "Valley_Token",
					list: [
						"https://ms.yugipedia.com//thumb/a/a9/Token-TKN-KR-C-UE-Valley.png/300px-Token-TKN-KR-C-UE-Valley.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Varis_and_Playmaker)",
					list: [
						"https://ms.yugipedia.com//thumb/c/cc/Token-TK04-JP-R-VarisandPlaymaker.png/300px-Token-TK04-JP-R-VarisandPlaymaker.png",
					],
					desc: 'This card can be used as any Token.Playmaker: "Varis, I won\'t let you do as you please anymore!"Varis: "Heh, then let\'s settle the score with a Duel. Come, Playmaker!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Varis_and_Borreload_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/6/69/Token-TK01-JP-R-VarisBorreloadDragon.png/300px-Token-TK01-JP-R-VarisBorreloadDragon.png",
					],
					desc: 'This card can be used as any Token.Varis: "The new breath resides in my hand! Storm Access! ... This power is good."\n',
					summoner: [""],
				},
				{
					name: "Token_(Varis_and_Borreload_eXcharge_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/5/57/Token-TK02-JP-R-VarisBorreloadeXchargeDragon.png/300px-Token-TK02-JP-R-VarisBorreloadeXchargeDragon.png",
					],
					desc: 'This card can be used as any Token.Varis: "When two soaring, heroic roars merge into thunder, it opens the eternal door and shows its power!Appear, Borreload eXcharge Dragon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Vector_and_%22Number_C104:_Umbral_Horror_Masquerade%22)",
					list: [
						"https://ms.yugipedia.com//thumb/5/58/Token-TK03-JP-R-VectorandNumberC104UmbralHorrorMasquerade.png/300px-Token-TK03-JP-R-VectorandNumberC104UmbralHorrorMasquerade.png",
					],
					desc: 'This card can be used as any Token.Vector: "Aren\'t you going to call me Ray anymore, Yuma?"\n',
					summoner: [""],
				},
				{
					name: "Token_(World_Championship_2014)",
					list: [
						"https://ms.yugipedia.com//thumb/5/51/Token-AT07-JP-C-WorldChampionship2014.png/300px-Token-AT07-JP-C-WorldChampionship2014.png",
					],
					desc: "This card can be used as any Token.■□ Yu-Gi-Oh! World Championship 2014 □■Will be held in Rimini, Italy August 9–10, 2014",
					summoner: [""],
				},
				{
					name: "Token_(World_Championship_2019)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c3/Token-2019-KR-ScR-UE.png/300px-Token-2019-KR-ScR-UE.png",
					],
					desc: "This card can be used as any Token.■□ Yu-Gi-Oh! World Championship 2019 ■□Will be held in Berlin, Germany August 10–11, 2019",
					summoner: [""],
				},
				{
					name: "Token_(World_Duel_Carnival)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3b/Token-CD02-JP-C-WorldDuelCarnival.png/300px-Token-CD02-JP-C-WorldDuelCarnival.png",
					],
					desc: 'This card can be used as any Token."Let\'s Duel! Aim to be a Duel Champion!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Bakura_and_%22Dark_Necrofear%22)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3b/Token-TK02-JP-R-YamiBakuraandDarkNecrofear.png/300px-Token-TK02-JP-R-YamiBakuraandDarkNecrofear.png",
					],
					desc: 'This card can be used as any Token.Yami Bakura: "I\'ll show you... how terrifying my Occult Deck is"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Marik_and_%22The_Winged_Dragon_of_Ra%22)",
					list: [
						"https://ms.yugipedia.com//thumb/5/53/Token-TK02-JP-R-YamiMarikandTheWingedDragonofRa.png/300px-Token-TK02-JP-R-YamiMarikandTheWingedDragonofRa.png",
					],
					desc: 'This card can be used as any Token.Marik: "Arise for my victory! The Winged Dragon of Ra!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/a/a6/Token-ST18-JP-C-YamiYugi.png/300px-Token-ST18-JP-C-YamiYugi.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_and_Dark_Magician)",
					list: [
						"https://ms.yugipedia.com//thumb/2/22/Token-LDK2-EN-UR-LE-YugiDarkMagician.png/300px-Token-LDK2-EN-UR-LE-YugiDarkMagician.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_and_Dark_Magician_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/a/a5/Token-20TH-JP-UR-YamiYugi.png/300px-Token-20TH-JP-UR-YamiYugi.png",
					],
					desc: 'This card can be used as any Token.Yami Yugi: "Dark Magician\'s attack! "Dark Magic Attack"!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_and_Kaiba)",
					list: [
						"https://ms.yugipedia.com//thumb/f/fe/Token-TK04-JP-R-YamiYugiandKaiba.png/300px-Token-TK04-JP-R-YamiYugiandKaiba.png",
					],
					desc: 'This card can be used as any Token.Yami Yugi & Kaiba: "This is a Duel of fate... that has transcended thousands of years!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_and_Slifer_the_Sky_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d0/Token-TK02-JP-R-YamiYugiandSlifertheSkyDragon.png/300px-Token-TK02-JP-R-YamiYugiandSlifertheSkyDragon.png",
					],
					desc: 'This card can be used as any Token.Yami Yugi: "Resurrect!! Slifer the Sky Dragon!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yami_Yugi_and_%22The_Dark_Magicians%22)",
					list: [
						"https://ms.yugipedia.com//thumb/c/c7/Token-TK03-JP-R-YamiYugiandTheDarkMagicians.png/300px-Token-TK03-JP-R-YamiYugiandTheDarkMagicians.png",
					],
					desc: 'This card can be used as any Token.Yami Yugi: "I have friends... and in the same way,my Deck contains servants that have fought to the bitter end, in whom I can believe!"',
					summoner: [""],
				},
				{
					name: "Token_(Yugi)",
					list: [
						"https://ms.yugipedia.com//thumb/6/62/Token-CD03-JP-C-Yugi.png/300px-Token-CD03-JP-C-Yugi.png",
					],
					desc: 'This card can be used as any Token.Yugi: "There\'s always a chance in the hand of a Duelist!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yugi_and_Gandora_the_Dragon_of_Destruction)",
					list: [
						"https://ms.yugipedia.com//thumb/b/b5/Token-TK01-JP-R-YugiGandoratheDragonofDestruction.png/300px-Token-TK01-JP-R-YugiGandoratheDragonofDestruction.png",
					],
					desc: 'This card can be used as any Token.Yugi: "I will surpass you with all my strength!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yugi_and_Kuriboh)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d8/Token-PREV-JP-C-YugiKuriboh.png/300px-Token-PREV-JP-C-YugiKuriboh.png",
					],
					desc: 'This card can be used as any Token.Yugi: "I bet on this card!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yugi_and_%22Silent_Magician%22_and_%22Silent_Swordsman%22)",
					list: [
						"https://ms.yugipedia.com//thumb/7/7a/Token-TK04-JP-R-YugiandSilentMagicianandSilentSwordsman.png/300px-Token-TK04-JP-R-YugiandSilentMagicianandSilentSwordsman.png",
					],
					desc: 'This card can be used as any Token.Yugi Muto: "For Duelists that have resolved to fight... there is nothing but silence..."\n',
					summoner: [""],
				},
				{
					name: "Token_(Yugi_Muto_and_Yami_Yugi)",
					list: [
						"https://ms.yugipedia.com//thumb/6/6f/Token-JF15-JP-NPR-YugiMutoandYamiYugi.png/300px-Token-JF15-JP-NPR-YugiMutoandYamiYugi.png",
					],
					desc: 'This card can be used as any Token.Yami Yugi: "Can you surpass me... partner!!"Yugi Muto: "I\'ll win! My other self...!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yugo)",
					list: [
						"https://ms.yugipedia.com//thumb/6/60/Token-TK01-JP-R-Yugo.png/300px-Token-TK01-JP-R-Yugo.png",
					],
					desc: 'This card can be used as any Token.Yugo: "Flap your beautiful and heroic wings to strike the enemy at the speed of light! Appear!Clear Wing Synchro Dragon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Yuma)",
					list: [
						"https://ms.yugipedia.com//thumb/c/cf/Token-TK01-JP-R-Yuma.png/300px-Token-TK01-JP-R-Yuma.png",
					],
					desc: 'This card can be used as any Token.Yuma: "Believe in the bonds you have with your friends, and do Kattobingu!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuma_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/e/ed/Token-ST18-JP-C-Yuma.png/300px-Token-ST18-JP-C-Yuma.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Yuma_-_V_Jump)",
					list: [
						"https://ms.yugipedia.com//3/37/Token-VJMP-JP-Yuma.png",
					],
					desc: 'This card can be used as any Token.Yuma: "I do Kattobingu!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuma_and_%22Number_39:_Utopia%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e0/Token-TK04-JP-R-YumaandNumber39Utopia.png/300px-Token-TK04-JP-R-YumaandNumber39Utopia.png",
					],
					desc: 'This card can be used as any Token.Yuma: "Our hearts have already decided! We challenge you to a Duel with everyone\'s future at stake!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuma_and_Number_39:_Utopia_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4a/Token-20TH-JP-UR-Yuma.png/300px-Token-20TH-JP-UR-Yuma.png",
					],
					desc: 'This card can be used as any Token.Yuma: "GO! Utopia! "Rising Sun Slash"!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuma_and_%22Number_39:_Utopia_Beyond%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4d/Token-TK02-JP-R-YumaandNumber39UtopiaBeyond.png/300px-Token-TK02-JP-R-YumaandNumber39UtopiaBeyond.png",
					],
					desc: 'This card can be used as any Token.Yuma: "I swear to the gods of heaven and earth! I\'m gonna fight to the end to grasp the future!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuri)",
					list: [
						"https://ms.yugipedia.com//thumb/1/19/Token-TK01-JP-R-Yuri.png/300px-Token-TK01-JP-R-Yuri.png",
					],
					desc: 'This card can be used as any Token.Yuri: "Appear! Poisonous dragon with hungry fangs! Starving Venom Fusion Dragon!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yusaku)",
					list: [
						"https://ms.yugipedia.com//thumb/b/b3/Token-TKN4-EN-SR-UE-YusakuFujiki.png/300px-Token-TKN4-EN-SR-UE-YusakuFujiki.png",
					],
					desc: "This card can be used as any Token.\n",
					summoner: [""],
				},
				{
					name: "Token_(Yusaku_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4b/Token-ST18-JP-C-Yusaku.png/300px-Token-ST18-JP-C-Yusaku.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Yusei)",
					list: [
						"https://ms.yugipedia.com//thumb/9/94/Token-TK01-JP-R-Yusei.png/300px-Token-TK01-JP-R-Yusei.png",
					],
					desc: 'This card can be used as any Token.Yusei: "Turbo Duel! Acceleration!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yusei_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/1/1d/Token-ST18-JP-C-Yusei.png/300px-Token-ST18-JP-C-Yusei.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Yusei_-_V_Jump)",
					list: [
						"https://ms.yugipedia.com//9/9d/Token-VJMP-JP-Yusei.png",
					],
					desc: 'This card can be used as any Token.Yusei: "That was a good Sense……"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yusei_and_%22Junk_Warrior%22)",
					list: [
						"https://ms.yugipedia.com//thumb/6/68/Token-TK04-JP-R-YuseiandJunkWarrior.png/300px-Token-TK04-JP-R-YuseiandJunkWarrior.png",
					],
					desc: 'This card can be used as any Token.Yusei: "The stars come together to call forth a new power! Become the path that lights the way!Synchro Summon! Come! Junk Warrior!!"',
					summoner: [""],
				},
				{
					name: "Token_(Yusei_and_Stardust_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/2/24/Token-TK03-JP-R-YuseiandStardustDragon.png/300px-Token-TK03-JP-R-YuseiandStardustDragon.png",
					],
					desc: 'This card can be used as any Token.Yusei: "The wishes come together to form a new shining star! Become the path that lights the way!Take flight, Stardust Dragon!"',
					summoner: [""],
				},
				{
					name: "Token_(Yusei_and_Stardust_Dragon_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/3/34/Token-20TH-JP-UR-Yusei.png/300px-Token-20TH-JP-UR-Yusei.png",
					],
					desc: 'This card can be used as any Token.Yusei: "Soar! Stardust Dragon! Roar! "Cosmic Flare"!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuto)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d4/Token-TK01-JP-R-Yuto.png/300px-Token-TK01-JP-R-Yuto.png",
					],
					desc: 'This card can be used as any Token.Yuto: "From the black darkness, the fangs of rebellion that fight against the powers of stupidity descend!Dark Rebellion Xyz Dragon!!"',
					summoner: [""],
				},
				{
					name: "Token_(Yuya_-_OCG_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/2/2d/Token-ST18-JP-C-Yuya.png/300px-Token-ST18-JP-C-Yuya.png",
					],
					desc: "This card can be used as any Token.2019 is the 20th Anniversary of the Yu-Gi-Oh! Official Card Game.We are truly thankful to Duelists everywhere.From before to now, and from now on to the future ― Duel Standby!!\n",
					summoner: [""],
				},
				{
					name: "Token_(Yuya_and_Odd-Eyes_Pendulum_Dragon)",
					list: [
						"https://ms.yugipedia.com//thumb/8/8b/Token-TK01-JP-R-YuyaOddEyesPendulumDragon.png/300px-Token-TK01-JP-R-YuyaOddEyesPendulumDragon.png",
					],
					desc: 'This card can be used as any Token.Yuya: "Swing, my soul\'s pendulum! Draw an arc of light in the sky!!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuya_and_Odd-Eyes_Pendulum_Dragon_-_20th_Anniversary)",
					list: [
						"https://ms.yugipedia.com//thumb/5/52/Token-20TH-JP-UR-Yuya.png/300px-Token-20TH-JP-UR-Yuya.png",
					],
					desc: 'This card can be used as any Token.Yuya: "Odd-Eyes! Burn everything you see with your different-colored eyes! "Spiral Flame Strike"!!"',
					summoner: [""],
				},
				{
					name: "Token_(Yuya_and_%22Performapals%22_and_%22Hippos%22)",
					list: [
						"https://ms.yugipedia.com//thumb/a/a0/Token-TK03-JP-R-YuyaandPerformapalsandHippos.png/300px-Token-TK03-JP-R-YuyaandPerformapalsandHippos.png",
					],
					desc: 'This card can be used as any Token.Yuya: "Ladies and gentlemen~!!You are about to witness some authentic Dueltaining by Yuya Sakaki!"',
					summoner: [""],
				},
				{
					name: "Token_(Yuya_and_%22Performapal_Show_Down%22)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4e/Token-TK04-JP-R-YuyaandPerformapalShowDown.png/300px-Token-TK04-JP-R-YuyaandPerformapalShowDown.png",
					],
					desc: 'This card can be used as any Token.Yuya: "This is the Dueltaining inherited from Yusho Sakaki!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Yuya_and_%22Stargazer_Magician%22_and_%22Timegazer_Magician%22)",
					list: [
						"https://ms.yugipedia.com//thumb/3/3b/Token-TK02-JP-R-YuyaandStargazerMagicianandTimegazerMagician.png/300px-Token-TK02-JP-R-YuyaandStargazerMagicianandTimegazerMagician.png",
					],
					desc: 'This card can be used as any Token.Yuya: "Magician who understands space and time! Protect me with your precise powers!Magician who understands the heavens! Seal away the vengeful enemy with your profound powers!"',
					summoner: [""],
				},
				{
					name: "Token_(Zane_and_%22Cyberdark_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/e/e0/Token-TK04-JP-R-ZaneandCyberdarkDragon.png/300px-Token-TK04-JP-R-ZaneandCyberdarkDragon.png",
					],
					desc: 'This card can be used as any Token.Zane: "I\'ll be testing the proficiency of the Cyber Style Reverse Deck with you!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Zane_and_%22Cyber_End_Dragon%22)",
					list: [
						"https://ms.yugipedia.com//thumb/8/8b/Token-TK02-JP-R-ZaneandCyberEndDragon.png/300px-Token-TK02-JP-R-ZaneandCyberEndDragon.png",
					],
					desc: "This card can be used as any Token.Zane: \"As long as I feel the shine of this moment, I won't go quietly into death's darkness...this moment will last for eternity!!\"",
					summoner: [""],
				},
				{
					name: "Token_(ZEXAL)",
					list: [
						"https://ms.yugipedia.com//thumb/b/ba/Token-CD02-JP-C-ZEXAL.png/300px-Token-CD02-JP-C-ZEXAL.png",
					],
					desc: 'This card can be used as any Token.ZEXAL: "ZEXAL Morph!".\n',
					summoner: [""],
				},
				{
					name: "Token_(ZEXAL_and_%22Ultimate_Dragonic_Utopia_Ray%22)",
					list: [
						"https://ms.yugipedia.com//thumb/0/02/Token-TK03-JP-R-ZEXALandUltimateDragonicUtopiaRay.png/300px-Token-TK03-JP-R-ZEXALandUltimateDragonicUtopiaRay.png",
					],
					desc: 'This card can be used as any Token.ZEXAL: "In the Duels of the strongest Duelists, nothing is a coincidence!Even the drawn cards are created by the Duelists! Shining Draw!!"',
					summoner: [""],
				},
				{
					name: "Token_(ZEXAL_II)",
					list: [
						"https://ms.yugipedia.com//thumb/e/ea/Token-CD02-JP-C-ZEXALII.png/300px-Token-CD02-JP-C-ZEXALII.png",
					],
					desc: 'This card can be used as any Token.ZEXAL II: "I overlay these heated feelings to rebuild the world for a hopeful future!― Shining Evolution!"',
					summoner: [""],
				},
				{
					name: "Token_(Zuzu)",
					list: [
						"https://ms.yugipedia.com//thumb/0/0d/Token-TK04-JP-R-ZuzuBoyle.png/300px-Token-TK04-JP-R-ZuzuBoyle.png",
					],
					desc: 'This card can be used as any Token.Zuzu: "I\'ll show you my radiance right now!"\n',
					summoner: [""],
				},
				{
					name: "Token_(Zuzu_and_Bloom_Diva_the_Melodious_Choir)",
					list: [
						"https://ms.yugipedia.com//thumb/4/4c/Token-TK02-JP-R-ZuzuBloomDivatheMelodiousChoir.png/300px-Token-TK02-JP-R-ZuzuBloomDivatheMelodiousChoir.png",
					],
					desc: 'This card can be used as any Token.Zuzu Boyle: "Follow the baton and stack your power! Fusion Summon! Take the stage with the song of victory!Bloom Diva the Melodious Choir!"',
					summoner: [""],
				},
				{
					name: "Albaz_the_Shrouded",
					list: [
						"https://ms.yugipedia.com//thumb/d/db/AlbaztheShrouded-SDAZ-EN-C-1E.png/300px-AlbaztheShrouded-SDAZ-EN-C-1E.png",
					],
					desc: "This card can be used as any Token or Counter.Does his name refer to a past, buried in darkness, or to a bright future?\n",
					summoner: [""],
				},
				{
					name: "Aluber_the_Dogmatic",
					list: [
						"https://ms.yugipedia.com//thumb/b/bb/AlubertheDogmatic-SDAZ-EN-C-1E.png/300px-AlubertheDogmatic-SDAZ-EN-C-1E.png",
					],
					desc: "This card can be used as any Token or Counter.A thing separated from the abyss. It mocked the light and deceived the darkness.\n",
					summoner: [""],
				},
				{
					name: "Ecclesia_the_Exiled",
					list: [
						"https://ms.yugipedia.com//thumb/d/d9/EcclesiatheExiled-SDAZ-EN-C-1E.png/300px-EcclesiatheExiled-SDAZ-EN-C-1E.png",
					],
					desc: "This card can be used as any Token or Counter.A pure white heart to be filled with many memories. With thoughts of coming days in mind, the girl gifts a name to the boy.\n",
					summoner: [""],
				},
				{
					name: "Emperor%27s_Key_(card)",
					list: [
						"https://ms.yugipedia.com//thumb/8/80/EmperorsKey-SD42-JP-UR.png/300px-EmperorsKey-SD42-JP-UR.png",
					],
					desc: "This card can be used as any Token or Counter.―When a crisis threatens the world, a hero will appear to save it. That is ZEXAL.\n",
					summoner: [""],
				},
				{
					name: "Jesse_Anderson_-_Bonder_with_the_Crystal_Beasts",
					list: [
						"https://ms.yugipedia.com//thumb/d/de/JesseAndersonBonderwiththeCrystalBeasts-SDCB-EN-SR-1E.png/300px-JesseAndersonBonderwiththeCrystalBeasts-SDCB-EN-SR-1E.png",
					],
					desc: "This card can be used as any Token or Counter.\"They're my best friends... no, they're my family!\"\n",
					summoner: [""],
				},
				{
					name: "Jesse_and_Ruby_-_Unleashing_the_Legend",
					list: [
						"https://ms.yugipedia.com//thumb/e/eb/JesseandRubyUnleashingtheLegend-SDCB-EN-SR-1E.png/300px-JesseandRubyUnleashingtheLegend-SDCB-EN-SR-1E.png",
					],
					desc: 'This card can be used as any Token or Counter."This here\'s my pal, Ruby Carbuncle!"\n',
					summoner: [""],
				},
				{
					name: "Tri-Brigade_(card)",
					list: [
						"https://ms.yugipedia.com//thumb/d/d9/TriBrigade-SDAZ-EN-C-1E.png/300px-TriBrigade-SDAZ-EN-C-1E.png",
					],
					desc: "This card can be used as any Token or Counter.Ready... Aim...\n",
					summoner: [""],
				},
				{
					name: "The_Virtuous_Vestals",
					list: [
						"https://ms.yugipedia.com//thumb/6/64/TheVirtuousVestals-SDAZ-EN-C-1E.png/300px-TheVirtuousVestals-SDAZ-EN-C-1E.png",
					],
					desc: "This card can be used as any Token or Counter.Sometimes like a kind sister, sometimes like a strict teacher. The bond is always there, even while far apart.\n",
					summoner: [""],
				},
			],
		}
		return {
			allsets,
			tokens,
		}
	},
	data: () => ({
		tokensList: [],
		allcards: [],
		allsets: [],
		cheff: [],
		tokens: {},
		ready: false,
	}),
	head() {
		return {
			title: "Home Page",
			meta: [
				{
					hid: "Home Page",
					name: "Home Page",
					content: `Home Page`,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, olV) {
			switch (newV) {
				case "PER CATEGORIA": {
					this.bannedCards = this.categorySort(this.bannedCards)
					break
				}
				default:
					this.bannedCards.sort((a, b) => (a.name > b.name ? 1 : -1))
			}
		},
		banlists(newPossibleCard, oldPossibleCard) {
			this.index = 0
			this.thereIsNext = this.index + 1 < newPossibleCard.length
			this.thereIsPrev = this.index > 0
		},
		index(newIndex, oldIndex) {
			this.thereIsNext = newIndex + 1 < this.banlists.length
			this.thereIsPrev = newIndex > 0
		},
	},
	async mounted() {
		this.allcards = await this.getAllCardsLocal()
		for (const category in this.tokens) {
			for (const token of this.tokens[category]) {
				token.summoner_details = []
				for (const summoner of token.summoner) {
					const summoner_details = this.allcards.find(
						(_) => _.name === summoner
					)
					if (summoner_details === undefined)
						console.log(category + ": " + summoner)
					token.summoner_details.push(summoner_details)
				}
			}
		}
		this.ready = true

		return
		// eslint-disable-next-line no-unreachable
		const types = [
			"Aqua",
			"Beast",
			"Winged Beast",
			"Cyberse",
			"Fiend",
			"Dinosaur",
			"Dragon",
			"Fairy",
			"Warrior",
			"Beast-Warrior",
			"Spellcaster",
			"Insect",
			"Machine",
			"Fish",
			"Plant",
			"Psychic",
			"Pyro",
			"Reptile",
			"Rock",
			"Sea Serpent",
			"Thunder",
			"Wyrm",
			"Zombie",
		]
		this.tokensList = this.allcards.filter((card) => {
			if (
				card.type.includes("Monster") &&
				!card.name.toLowerCase().includes("dragon")
			) {
				if (
					types.some(
						(type) =>
							card.name
								.toLowerCase()
								.includes(type.toLowerCase()) &&
							card.race !== type
					)
				)
					return true
			}
			return false
		})
		// eslint-disable-next-line no-unreachable
		this.tokensList.forEach((card) => {
			card.tcg_date = "2200-11-11"
			if (card.card_sets === undefined) return
			card.card_sets.forEach((set) => {
				const tcg_date = this.allsets.find(
					(_) => _.set_name === set.set_name
				)?.tcg_date
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date
			})
		})
		// eslint-disable-next-line no-unreachable
		this.tokensList = this.categorySort(this.tokensList)
			.sort((a, b) => (a.name >= b.name ? 1 : -1))
			.sort((a, b) => (a.tcg_date >= b.tcg_date ? 1 : -1))
	},
	methods: {
		fixDate(date) {
			const aY = date.split(" ")[0].split("-")[0]
			const aM = +date.split(" ")[0].split("-")[1]
			return `${aY}-${aM < 10 ? "0" + aM : aM}`
		},
	},
}
</script>

<style scoped></style>
