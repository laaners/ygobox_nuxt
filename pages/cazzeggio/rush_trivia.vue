<template>
	<div class="flex-col">
		<div
			v-if="allcards.length === 0"
			class="loader"
			style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
				margin-top: var(--space-1) !important;
			"
		></div>
		<div v-if="allcards.length > 0" class="flex-col" style="width: 100%">
			<grid-view
				:columns="2"
				:col-gap="1"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of rushTrivia"
					:key="card.name"
					class="flex-col"
					style="width: 100%"
				>
					<div class="flex-row" style="width: 100%">
						<div
							class="flex-col"
							style="width: 40%; text-align: center"
						>
							<div style="position: relative">
								<a
									:href="`https://yugipedia.com/wiki/Card_Trivia:${card.name.replace(
										/ /g,
										'_'
									)}`"
									target="_blank"
								>
									<img
										:src="card.img"
										style="width: 231.1px; height: 338.25px"
									/>
								</a>
							</div>
							<h3
								style="
									margin: 0 !important;
									font-weight: bold;
									color: blue;
								"
							>
								{{ card.name }}
							</h3>
							<p
								style="
									text-align: left;
									white-space: pre-line;
									background-color: white;
									border: 1px solid black;
									padding-bottom: 1em;
									padding-left: 1em;
									padding-right: 1em;
								"
							>
								{{ card.desc }}
							</p>
						</div>
						<div
							class="flex-col"
							style="width: 50%; margin-left: 5%"
						>
							<div
								class="flex-row"
								style="
									text-align: center;
									flex-wrap: wrap;
									width: 100%;
									margin-bottom: 0;
								"
							>
								<div
									v-for="cardTrivia of getTrivia(card.name)"
									:key="cardTrivia.id"
									class="flex-col"
									:style="{
										marginLeft: '0.5%',
										marginRight: '0.5%',
										width:
											getTrivia(card.name).length === 1
												? '220px'
												: '160px',
									}"
								>
									<card-modal
										:rarity="'Common'"
										:src="getPicUrl(cardTrivia.id)"
									/>
								</div>
							</div>
							<div
								v-for="cardTrivia of getTrivia(card.name)"
								:key="cardTrivia.id"
								style="margin-top: 0"
							>
								<p
									v-if="cardTrivia.desc.length > 0"
									style="
										border: 1px solid black;
										padding: 1em;
									"
								>
									{{ cardTrivia.desc }}
								</p>
							</div>
						</div>
					</div>
					<hr style="width: 100%; height: 1px; background-color: black" />
				</div>
			</grid-view>
		</div>
	</div>
</template>

<script>
import CardModal from "../../components/CardModal.vue"
// eslint-disable-next-line no-unused-vars
import GridView from "../../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal },
	mixins: [Utils],
	layout: "empty",
	async asyncData({ $axios }) {
		const allsets = await $axios.$get("/api/allsets")
		const rushTrivia = await $axios.$get("/api/rush")
		const { data } = await $axios.$get(
			"https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Rush%20Duel"
		)

		/*
		JSON.stringify({name: $(".card-table .heading").text(), img: $(".cardtable-main_image-wrapper .image img").attr("src"), desc: $(".lore").text().substring(1, $(".lore").text().length-1)})
		*/

		const missings = [
			{
				name: "Black Luster Soljersey - Envoy of the Drying",
				img: "https://ms.yugipedia.com//thumb/0/06/BlackLusterSoljerseyEnvoyoftheDrying-RDKP11-JP-SR.png/300px-BlackLusterSoljerseyEnvoyoftheDrying-RDKP11-JP-SR.png",
				desc: "[REQUIREMENT]\nShuffle 2 monsters with 500 DEF and different Attributes from your Graveyard into the Deck.\n[EFFECT]\nPlace 1 face-up Level 8 or lower monster from your opponent's field on the bottom of the owner's Deck. This turn, this card cannot attack directly.",
			},
			{
				name: "Card Devastation",
				img: "https://ms.yugipedia.com//thumb/8/88/CardDevastation-RDKP07-JP-C.png/300px-CardDevastation-RDKP07-JP-C.png",
				desc: "[REQUIREMENT]\nNone\n[EFFECT]\\nEach player with cards in their hand sends their entire hand to the Graveyard, then you can make 1 face-up monster on your field gain ATK equal to [the number of cards sent to the Graveyard by this effect] x 300 until the end of this turn.",
			},
			{
				name: "Light Dolphin",
				img: "https://ms.yugipedia.com//thumb/7/7e/LightDolphin-RDKP07-JP-C.png/450px-LightDolphin-RDKP07-JP-C.png",
				desc: `[REQUIREMENT] You have a face-up "Umi" or "Big Umi" and a face-up Fish, Sea Serpent, Thunder, or Aqua Type Normal Monster on your field.\n[EFFECT] Draw 1 card.`,
			},
			{
				name: "Sevens Road Magician",
				img: "https://yugipedia.com/thumb.php?f=SevensRoadMagician-RDSST1-JP-C.png&w=300",
				desc: "[REQUIREMENT] Send the top card of your Deck to the Graveyard.\n[EFFECT] This card gains ATK equal to [the number of different Attributes in your Graveyard] x 300, until the end of this turn.",
			},
			{
				name: "Sevens Road Witch",
				img: "https://yugipedia.com/thumb.php?f=SevensRoadWitch-RDKP01-JP-UR.png&w=300",
				desc: '[REQUIREMENT] Send 1 card from your hand to the Graveyard.\n[EFFECT] Special Summon 1 Level 7 or higher, DARK Attribute, Spellcaster Type monster from your hand, face-up to your field. If you Special Summoned "Sevens Road Magician" by this effect, this card gains 400 ATK until the end of this turn.',
			},
			{
				name: "Sevens Paladin the Magical Knight",
				img: "https://ms.yugipedia.com//f/f5/SevensPaladintheMagicalKnight-RDEXT1-JP-UR.png",
				desc: `"Sevens Road Magician" + "Swordsman of Roadstar"\n\n[REQUIREMENT] Send the top card of your Deck to the Graveyard.\n[MULTI-CHOICE EFFECT]\n● This card gains ATK equal to [the number of different Attributes in both players' Graveyards] x 400 until the end of this turn.● Shuffle 1 monster from your Graveyard into the Deck, then draw 1 card.`,
			},
			{
				name: "Max Raider",
				img: "https://ms.yugipedia.com//thumb/d/dc/MaxRaider-RDKP01-JP-R.png/450px-MaxRaider-RDKP01-JP-R.png",
				desc: "An axe-wielding warrior. He has pushed himself to the limit in honing his body. The attacks from the two axes he brandishes are quite powerful.",
			},
			{
				name: "Dark Sorcerer",
				img: "https://ms.yugipedia.com//0/01/DarkSorcerer-RDMRP1-JP-C.png",
				desc: "A sorcerer whose hands have been tainted by the forbidden arts. He does not yet know the price for the power he desired.",
			},
			{
				name: "Captain 39: Home Plate Pinch Hitter",
				img: "https://ms.yugipedia.com//8/8b/Captain39HomePlatePinchHitter-RDKP08-JP-SR.png",
				desc: "[REQUIREMENT] Shuffle 3 Level 4 FIRE Attribute monsters from your Graveyard into the Deck.\n[EFFECT] This card gains 1500 ATK until the end of this turn. Then, if your LP are 1000 or lower, you can make 1 face-up monster on your opponent's field lose 3000 ATK until the end of this turn.",
			},
			{
				name: "Last Day of the Pretty☆Witch",
				img: "https://ms.yugipedia.com//b/b4/LastDayofthePrettyWitch-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] If you have a face-up Level 8 or higher Aqua Type monster on your field, send 1 Aqua Type monster from your hand to the Graveyard.\n[EFFECT] Destroy 1 face-up Level 8 or lower monster on your opponent's field. Then, if you destroyed a Spellcaster Type monster by this effect, you can destroy all monsters on your opponent's field.",
			},
			{
				name: "Dragon's Return",
				img: "https://ms.yugipedia.com//thumb/8/8c/DragonsReturn-RDSD03-JP-C.png/300px-DragonsReturn-RDSD03-JP-C.png",
				desc: "[REQUIREMENT] Shuffle 3 Dragon Type monsters from your Graveyard into the Deck.\n[EFFECT] Draw 1 card.",
			},
			{
				name: "Trumpet Charge",
				img: "https://ms.yugipedia.com//thumb/3/3d/TrumpetCharge-RDGRP1-JP-C.png/300px-TrumpetCharge-RDGRP1-JP-C.png",
				desc: "[REQUIREMENT] When your Warrior Type monster is destroyed by an opponent's attack.\n[EFFECT] Special Summon 1 Warrior Type monster from your hand face-up to your field.",
			},
			{
				name: "Dian Keto the Security Master",
				img: "https://ms.yugipedia.com//thumb/2/2f/DianKetotheSecurityMaster-RDMRP1-JP-C.png/300px-DianKetotheSecurityMaster-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] Send 1 card from your hand to the Graveyard.\n[EFFECT] Look at your opponent's hand and send 1 card from it to the Graveyard. Then, if you sent a Level 7 or higher monster to the Graveyard by this effect, gain 1000 LP.",
			},
			{
				name: "Last Day of the Pretty☆Witch",
			},
			{
				name: "Daigyakutenno Megami",
				img: "https://ms.yugipedia.com//thumb/b/b8/DaigyakutennoMegami-RDGRP1-JP-SR.png/300px-DaigyakutennoMegami-RDGRP1-JP-SR.png",
				desc: '[REQUIREMENT] You have "Gyakutenno Megami" in your Graveyard.\n[EFFECT] Draw 1 card and send the top card of your Deck to the Graveyard. If you sent a monster to the Graveyard by this effect, you can destroy 2 face-up monsters on your opponent\'s field with the same Type as that monster.',
			},
			{
				name: "Dark Resonance Burst",
				img: "https://ms.yugipedia.com//thumb/e/ee/DarkResonanceBurst-RDGRP1-JP-SR.png/300px-DarkResonanceBurst-RDGRP1-JP-SR.png",
				desc: '[REQUIREMENT] None\n[EFFECT] 1 face-up Level 6 or higher DARK Attribute Spellcaster Type monster on your field gains 1000 ATK until the end of this turn. Then, if you have "Dark Magician" or "Dark Magician Girl" face-up on your field, that Level 6 or higher DARK Attribute Spellcaster Type monster gains 1000 more ATK until the end of this turn.',
			},
			{
				name: "Captain 39: Home Plate Pinch Hitter",
			},
			{
				name: "Prime Roast Beef Horseman",
				img: "https://ms.yugipedia.com//thumb/1/12/PrimeRoastBeefHorseman-RDKP08-JP-C.png/300px-PrimeRoastBeefHorseman-RDKP08-JP-C.png",
				desc: '"Barbeque Ox" + "Mystic Roastman"\n\n[REQUIREMENT] During your Main Phase that you Special Summoned this card, place 4 FIRE Attribute Beast Type monsters from your Graveyard on top of your Deck in any order.\n[EFFECT] Add up to 1 each of "Best Bite", "B・B・Q", and "Wild Kitchen" from your Graveyard to your hand.',
			},
			{
				name: "Sakuretsu Force",
				img: "https://ms.yugipedia.com//thumb/1/18/SakuretsuForce-RDKP08-JP-C.png/300px-SakuretsuForce-RDKP08-JP-C.png",
				desc: "[REQUIREMENT] When an opponent's monster declares an attack, shuffle 3 monsters from your Graveyard into the Deck.\n[EFFECT] The attacking monster loses 500 ATK until the end of this turn. Then, if you have \"Sakuretsu Armor\" in your Graveyard, you can destroy up to 2 Attack Position monsters on your opponent's field.",
			},
			{
				name: "Galactica Oblivion",
				img: "https://ms.yugipedia.com//thumb/4/41/GalacticaOblivion-RDORP1-JP-ORR.png/300px-GalacticaOblivion-RDORP1-JP-ORR.png",
				desc: "War To Zen! Awesome True Goodnight!\n",
			},
			{
				name: "Sevensgias the Magical Dragon Knight",
				img: "https://ms.yugipedia.com//thumb/c/c3/SevensgiastheMagicalDragonKnight-RDKP09-JP-RR.png/300px-SevensgiastheMagicalDragonKnight-RDKP09-JP-RR.png",
				desc: '"Sevens Road Magician" + "Multistrike Dragon Dragias"\n\n[REQUIREMENT] If your opponent has a face-up Level 7 or higher monster on their field, send the top card of your Deck to the Graveyard.\n[MULTI-CHOICE EFFECT]\n● This turn, this card gains ATK equal to [the number of different Types in your Graveyard] x 700, and it can make up to 2 attacks on monsters.● Destroy all face-up cards on the field.',
			},
			{
				name: "Meteor Charge",
				img: "https://ms.yugipedia.com//thumb/d/d3/MeteorCharge-RDSD05-JP-C.png/300px-MeteorCharge-RDSD05-JP-C.png",
				desc: "[REQUIREMENT] None\n[EFFECT] Choose 1 face-up Galaxy Type monster on your field. If it attacks a Defense Position monster this turn, inflict piercing battle damage (if the ATK of the attacking monster exceeds the DEF of the attack target, inflict the difference). Also, if the chosen monster is a Normal Monster, you can change the battle position of 1 monster on your opponent's field (Attack Position becomes face-up Defense Position, Defense Position becomes face-up Attack Position).",
			},
			{
				name: "Insect Rampage",
				img: "https://ms.yugipedia.com//thumb/f/f6/InsectRampage-RDKP09-JP-C.png/300px-InsectRampage-RDKP09-JP-C.png",
				desc: "[REQUIREMENT] Shuffle 2 monsters from your Graveyard into the Deck.\n[EFFECT] All face-up Insect Type monsters on your field gain 300 ATK until the end of this turn. Then, if your opponent has a face-up Insect Type monster on their field, you can destroy 1 face-up Level 8 or lower monster on your opponent's field.",
			},
			{
				name: "Card Reprint",
				img: "https://ms.yugipedia.com//thumb/d/d9/CardReprint-RDKP09-JP-C.png/300px-CardReprint-RDKP09-JP-C.png",
				desc: "[REQUIREMENT] When an opponent's monster declares an attack.\n[EFFECT] Draw until you have 5 cards in your hand and reveal all cards in your hand. Then, if there is a monster(s) among them, gain LP equal to [the number of those monsters] x 200.",
			},
			{
				name: "Anciant Barrier",
				img: "https://ms.yugipedia.com//thumb/6/6c/AnciantBarrier-RDKP09-JP-C.png/300px-AnciantBarrier-RDKP09-JP-C.png",
				desc: "[REQUIREMENT] When an opponent's Level 8 or lower monster declares an attack, shuffle 2 Insect Type monsters from your Graveyard into the Deck.\n[EFFECT] The attacking monster loses 800 ATK until the end of this turn. Then, if a face-up Defense Position Insect Type monster is on the field, you can destroy the attacking monster.",
			},
			{
				name: "Delight of the Mighty",
				img: "https://ms.yugipedia.com//thumb/9/9f/DelightoftheMighty-RDB221-JP-C.png/300px-DelightoftheMighty-RDB221-JP-C.png",
				desc: "[REQUIREMENT] When your opponent Normal Summons a monster.\n[EFFECT] 1 face-up Normal Monster on your field gains ATK/DEF equal to [that Normal Summoned monster's Level] x 100 until the end of this turn.",
			},
			{
				name: "Magician of Dark Sevens",
				img: "https://ms.yugipedia.com//thumb/f/f1/MagicianofDarkSevens-RDMRP1-JP-UR.png/300px-MagicianofDarkSevens-RDMRP1-JP-UR.png",
				desc: '"Sevens Road Magician" + "Darkness Zerorogue"\n\n[REQUIREMENT] None\n[CONTINUOUS EFFECT]\nThis card gains ATK equal to [the number of DARK Attribute Spellcaster Type monsters in your Graveyard] x 300. You take no battle damage from battles involving your other monsters.',
			},
			{
				name: "Magic Curtain",
				img: "https://ms.yugipedia.com//thumb/6/6b/MagicCurtain-RDMRP1-JP-C.png/300px-MagicCurtain-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] Pay 1000 LP.\n[EFFECT] Special Summon 1 Spellcaster Type monster from your hand face-up to your field. It cannot be destroyed by your opponent's Trap Card effects this turn.",
			},
			{
				name: "Progress Potter",
				img: "https://ms.yugipedia.com//thumb/b/b9/ProgressPotter-RDMRP1-JP-UR.png/300px-ProgressPotter-RDMRP1-JP-UR.png",
				desc: '[REQUIREMENT] Shuffle 5 monsters from your Graveyard into the Deck.\n[EFFECT] Shuffle up to 2 cards from your opponent\'s Graveyard into the Deck. Then, you can draw cards equal to [the number of "Progress Potter" and "Pot of Avarice" with different names in your Graveyard].',
			},
			{
				name: "Dian Keto the Cooking Master",
				img: "https://ms.yugipedia.com//thumb/a/a2/DianKetotheCookingMaster-RDMRP1-JP-SR.png/300px-DianKetotheCookingMaster-RDMRP1-JP-SR.png",
				desc: "[REQUIREMENT] Send 1 card from your hand to the Graveyard.\n[EFFECT] Send the top 3 cards of your Deck to the Graveyard. Then, if your LP are 2000 or less, you can gain LP equal to [the number of Aqua Type monsters sent to the Graveyard by this effect] x 1000.",
			},
			{
				name: "Shoulder Phone Nyan Nyan",
				img: "https://ms.yugipedia.com//thumb/5/53/ShoulderPhoneNyanNyan-RDMRP1-JP-UR.png/300px-ShoulderPhoneNyanNyan-RDMRP1-JP-UR.png",
				desc: "[REQUIREMENT] During the turn you Normal Summoned this card, place 1 card from your hand on the bottom of the Deck.\n[EFFECT] 1 face-up monster on your opponent's field loses 500 ATK until the end of this turn. Then, you can add 1 Level 7 or higher Aqua Type monster from your Graveyard to your hand.",
			},
			{
				name: "High-Heel Priestess",
				img: "https://ms.yugipedia.com//thumb/b/b8/HighHeelPriestess-RDMRP1-JP-SR.png/300px-HighHeelPriestess-RDMRP1-JP-SR.png",
				desc: "[REQUIREMENT] You Normal Summoned this card this turn and have a face-up Level 7 or higher Aqua Type monster on your field.\n[EFFECT] Draw 1 card. Then, all face-up Level 7 or higher Aqua Type monsters on your field gain 400 ATK until the end of this turn.",
			},
			{
				name: "Tiramisu Dark Witch",
				img: "https://ms.yugipedia.com//thumb/c/c1/TiramisuDarkWitch-RDMRP1-JP-C.png/300px-TiramisuDarkWitch-RDMRP1-JP-C.png",
				desc: "An angelic store attendant who carries both tiramisu and all the raging fads. Even against the ever-changing trends and the hearts of evil, she will never lose.\n",
			},
			{
				name: "Frenzied Panda Cotta",
				img: "https://ms.yugipedia.com//thumb/c/c4/FrenziedPandaCotta-RDMRP1-JP-C.png/300px-FrenziedPandaCotta-RDMRP1-JP-C.png",
				desc: "A savage panda store clerk. It completely snaps when someone orders panna cotta.\n",
			},
			{
				name: "Change of Dessert",
				img: "https://ms.yugipedia.com//thumb/e/e6/ChangeofDessert-RDMRP1-JP-C.png/300px-ChangeofDessert-RDMRP1-JP-C.png",
				desc: "An angel-like store attendant that's actually a demon. Her heart is jiggling like jelly, wondering whether to bring the order or not.\n",
			},
			{
				name: "Mother's Storm",
				img: "https://ms.yugipedia.com//thumb/e/e6/MothersStorm-RDMRP1-JP-C.png/300px-MothersStorm-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] If you have a face-up Level 8 or higher Aqua Type monster on your field, send 1 Aqua Type monster from your hand to the Graveyard.\n[EFFECT] Destroy 1 Level 8 or lower monster on your opponent's field. Then, if you destroyed a Machine Type monster by this effect, you can destroy all monsters on your opponent's field.",
			},
			{
				name: "Master's Cure",
				img: "https://ms.yugipedia.com//thumb/0/08/MastersCure-RDMRP1-JP-C.png/300px-MastersCure-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] When your opponent Normal or Special Summons a Level 7 or higher monster face-up.\n[EFFECT] Gain 1000 LP. Then, you can make 1 face-up Aqua Type monster on your field gain 1000 ATK until the end of this turn.",
			},
			{
				name: "Cyber-Stein Frankenshrine",
				img: "https://ms.yugipedia.com//thumb/d/d0/CyberSteinFrankenshrine-RDMRP1-JP-R.png/300px-CyberSteinFrankenshrine-RDMRP1-JP-R.png",
				desc: "[REQUIREMENT] If you have a Level 4 or lower Zombie Type Normal Monster in your Graveyard during the turn you Normal Summoned this card, send the top card of your Deck to the Graveyard.\n[EFFECT] Special Summon up to 2 Level 4 or lower Zombie Type Normal Monsters from your Graveyard face-up to your field.",
			},
			{
				name: "Surprising Zomvictory",
				img: "https://ms.yugipedia.com//thumb/f/f8/SurprisingZomvictory-RDMRP1-JP-C.png/300px-SurprisingZomvictory-RDMRP1-JP-C.png",
				desc: "[REQUIREMENT] You have 2 or more face-up Zombie Type Normal Monsters on your field.\n[EFFECT] Change the battle positions of up to 3 monsters on your opponent's field. Then, you can make all face-up Zombie Type monsters on your field gain ATK equal to [the number of Zombie Type Normal Monsters in your Graveyard] x 100 until the end of this turn.",
			},
			{
				name: "Mystical Sandbox",
				img: "https://ms.yugipedia.com//thumb/7/7c/MysticalSandbox-RDB222-JP-C.png/300px-MysticalSandbox-RDB222-JP-C.png",
				desc: "A spellcaster who controls water and can harden sand. She creates all kinds of things with her muddy hands.\n",
			},
			{
				name: "Kanan the Swordmaiden",
				img: "https://ms.yugipedia.com//thumb/0/0b/KanantheSwordmaiden-RDB222-JP-C.png/300px-KanantheSwordmaiden-RDB222-JP-C.png",
				desc: "A lady swordmaster whose main battlefield is the theater club. Armed with a sword and shield, she floats like a butterfly and dances like a bee.\n",
			},
			{
				name: "Spirit of the Mini Harp",
				img: "https://ms.yugipedia.com//thumb/c/cc/SpiritoftheMiniHarp-RDB222-JP-C.png/300px-SpiritoftheMiniHarp-RDB222-JP-C.png",
				desc: "A spirit that soothes the soul with the music of its music class harp.\n",
			},
			{
				name: "Tutumes Dark Witch",
				img: "https://ms.yugipedia.com//thumb/7/7c/TutumesDarkWitch-RDKP10-JP-C.png/300px-TutumesDarkWitch-RDKP10-JP-C.png",
				desc: "An angelic ballerina who spares no effort. Because of her strong convictions, not even the most intense instruction and practice stops her.\n",
			},
			{
				name: "Voidvelgr Requiem",
				img: "https://ms.yugipedia.com//thumb/1/1e/VoidvelgrRequiem-RD711B-JP-NPR.png/300px-VoidvelgrRequiem-RD711B-JP-NPR.png",
				desc: "[REQUIREMENT] Send the top card of your Deck to the Graveyard.\n[EFFECT] This card gains ATK equal to [the number of face-up DARK Attribute monsters on your field] x 300 until the end of this turn. Then, if your opponent has a face-up LIGHT Attribute monster on their field, this card gains 600 ATK until the end of this turn.",
			},
			{
				name: "Nuvia the Wicked Mischief Maker",
				img: "https://ms.yugipedia.com//thumb/e/ec/NuviatheWickedMischiefMaker-RDKP10-JP-C.png/300px-NuviatheWickedMischiefMaker-RDKP10-JP-C.png",
				desc: '[REQUIREMENT] If you have 3 face-up Aqua Type monsters on your field, send the top card of your Deck to the Graveyard.\n[EFFECT] All face-up Aqua Type monsters on your field gain 200 ATK until the end of this turn. Then, you can add 1 "Rainy Megalopolis" from your Graveyard to your hand.',
			},
			{
				name: "Dian Keto the Cure Maiden",
				img: "https://ms.yugipedia.com//thumb/d/d8/DianKetotheCureMaiden-RDKP10-JP-SR.png/300px-DianKetotheCureMaiden-RDKP10-JP-SR.png",
				desc: "[REQUIREMENT] You have a face-up Field Spell Card on your field.\n[EFFECT] Draw 1 card and show it. Then, if that card is a Field Spell Card, gain 1000 LP.",
			},
			{
				name: "Cosmo Aurorizer",
				img: "https://ms.yugipedia.com//thumb/0/03/CosmoAurorizer-RDSD01-JP-C.png/300px-CosmoAurorizer-RDSD01-JP-C.png",
				desc: "[REQUIREMENT] Send 1 Spell/Trap Card from your hand to the Graveyard.\n[EFFECT] This card gains ATK equal to [the number of Spell/Trap Cards on your opponent's field] x 500 until the end of this turn.",
			},
			{
				name: "Black Luster Soljersey",
				img: "https://ms.yugipedia.com//thumb/3/32/BlackLusterSoljersey-RDKP11-JP-R.png/300px-BlackLusterSoljersey-RDKP11-JP-R.png",
				desc: "A Super Soldier that appears due to Black Luster Jersey Ritual. He cuts though his enemies with his deadly Chaos Nylon Blade.\n",
			},
			{
				name: "Penguin Soljersey",
				img: "https://ms.yugipedia.com//thumb/4/4b/PenguinSoljersey-RDKP11-JP-C.png/300px-PenguinSoljersey-RDKP11-JP-C.png",
				desc: "[REQUIREMENT] During the turn you Normal Summoned this card, send 1 monster with 500 DEF from your hand to the Graveyard.\n[EFFECT] Return up to 2 face-up Level 4 or lower monsters from your opponent's field to the owner's hand.",
			},
			{
				name: "Cannon Soljersey",
				img: "https://ms.yugipedia.com//thumb/6/67/CannonSoljersey-RDKP11-JP-R.png/300px-CannonSoljersey-RDKP11-JP-R.png",
				desc: "[REQUIREMENT] If you have another face-up monster with 500 DEF on your field, send 1 face-up monster with 500 DEF from your field to the Graveyard.\n[EFFECT] Inflict 500 damage to your opponent. Then, you can make 1 face-up Level 8 or lower monster on your opponent's field lose 500 ATK until the end of this turn.",
			},
			{
				name: "Black Luster Soljersey - Envoy of the Drying",
				img: "https: //ms.yugipedia.com//thumb/0/06/BlackLusterSoljerseyEnvoyoftheDrying-RDKP11-JP-SR.png/300px-BlackLusterSoljerseyEnvoyoftheDrying-RDKP11-JP-SR.png",
				desc: "[REQUIREMENT] Shuffle 2 monsters with 500 DEF and different Attributes from your Graveyard into the Deck.\n[EFFECT] Place 1 face-up Level 8 or lower monster from your opponent's field on the bottom of the owner's Deck. This turn, this card cannot attack directly.",
			},
			{
				name: "Black Luster Jersey Ritual",
				img: "https://ms.yugipedia.com//thumb/3/33/BlackLusterJerseyRitual-RDKP11-JP-C.png/300px-BlackLusterJerseyRitual-RDKP11-JP-C.png",
				desc: "[REQUIREMENT] Send 2 monsters from your field to the Graveyard.\n[EFFECT] Special Summon 1 Level 8 monster with 500 DEF from your hand face-up to your field. This turn, the monster Special Summoned by this effect gains 500 ATK, it cannot be destroyed by your opponent's Trap Card effects, and if it attacks a Defense Position monster, inflict piercing battle damage (if the ATK of the attacking monster exceeds the DEF of the attack target, inflict the difference).",
			},
			{
				name: "Preparation of Jersey Rites",
				img: "https://ms.yugipedia.com//thumb/b/b3/PreparationofJerseyRites-RDKP11-JP-R.png/300px-PreparationofJerseyRites-RDKP11-JP-R.png",
				desc: '[REQUIREMENT] Pay 500 LP.\n[EFFECT] Add 1 Level 8 monster with 500 DEF from your Graveyard to your hand. Then, you can add 1 "Black Luster Jersey Ritual" from your Graveyard to your hand.',
			},
			{
				name: "Cyber Assault Dragon",
				img: "https://ms.yugipedia.com//thumb/0/03/CyberAssaultDragon-RDORP1-JP-SR.png/300px-CyberAssaultDragon-RDORP1-JP-SR.png",
				desc: 'You can Tribute Summon this card in Attack Position by Tributing 1 face-up "Cyber Dragon".\n\n[REQUIREMENT] Place 1 "Cyber Dragon" from your Graveyard on top of your Deck.\n[EFFECT] Destroy 1 face-up Level 8 or lower monster with 2400 or more ATK on your opponent\'s field.',
			},
			{
				name: "Cyber Stealth Dragon",
				img: "https://ms.yugipedia.com//thumb/e/ed/CyberStealthDragon-RDORP1-JP-C.png/300px-CyberStealthDragon-RDORP1-JP-C.png",
				desc: 'You can Tribute Summon this card in Attack Position by Tributing 1 face-up "Cyber Dragon".\n\n[REQUIREMENT] None\n[CONTINUOUS EFFECT]\nIf you have "Cyber Dragon" in your Graveyard, this card gains 2000 DEF and cannot be destroyed by your opponent\'s monster effects.',
			},
			{
				name: "Evolution Rush Burst",
				img: "https://ms.yugipedia.com//thumb/1/10/EvolutionRushBurst-RDORP1-JP-C.png/300px-EvolutionRushBurst-RDORP1-JP-C.png",
				desc: "[REQUIREMENT] If you have a face-up Level 5 or higher Machine Type monster on your field, shuffle 5 LIGHT Attribute Machine Type monsters from your Graveyard into the Deck.\n[EFFECT] Destroy 1 card on your opponent's field.",
			},
			{
				name: "Cyber Entry",
				img: "https://ms.yugipedia.com//thumb/9/92/CyberEntry-RDORP1-JP-C.png/300px-CyberEntry-RDORP1-JP-C.png",
				desc: '[REQUIREMENT] You have 3 or more LIGHT Attribute Machine Type monsters in your Graveyard.\n[EFFECT] Special Summon 1 "Cyber Dragon" or "Proto-Cyber Dragon" from your hand or your Graveyard face-up to your field. This turn, you can only attack with LIGHT Attribute Machine Type monsters.',
			},
			{
				name: "Multiple Adapter Unit",
				img: "https://ms.yugipedia.com//thumb/4/4f/MultipleAdapterUnit-RDORP1-JP-C.png/300px-MultipleAdapterUnit-RDORP1-JP-C.png",
				desc: '[REQUIREMENT] When your opponent Normal Summons a monster, send 1 face-up Level 5 or higher Machine Type monster from your field to the Graveyard.\n[EFFECT] Change that Normal Summoned monster to face-down Defense Position. Then, you can Special Summon 1 "Cyber Assault Dragon" or "Cyber Stealth Dragon" from your Graveyard face-up to your field.',
			},
			{
				name: "Valkyrian Call",
				img: "https://ms.yugipedia.com//thumb/e/e9/ValkyrianCall-RDORP1-JP-C.png/300px-ValkyrianCall-RDORP1-JP-C.png",
				desc: "[REQUIREMENT] None\n[EFFECT] Special Summon 1 Level 4 Spellcaster Type monster from your Graveyard face-up to your field. Then, you can make 1 face-up \"Magician's Valkyria\" on your field gain 1000 ATK until the end of your opponent's next turn.",
			},
			{
				name: "Valkyrian Guard",
				img: "https://ms.yugipedia.com//thumb/a/af/ValkyrianGuard-RDORP1-JP-C.png/300px-ValkyrianGuard-RDORP1-JP-C.png",
				desc: '[REQUIREMENT] When your opponent Normal or Special Summons a monster.\n[EFFECT] Special Summon 1 Level 4 Spellcaster Type monster from your Graveyard to your field in face-up Attack Position. Then, you can change up to 3 Attack Position monsters on your field to face-up Defense Position, including "Magician\'s Valkyria". This turn, while the monsters changed to Defense Position by this effect are in face-up Defense Position, they cannot be destroyed by battle.',
			},
			{
				name: "Word Working",
				img: "https://ms.yugipedia.com//thumb/0/0b/WordWorking-RDORP1-JP-UR.png/300px-WordWorking-RDORP1-JP-UR.png",
				desc: "[REQUIREMENT] When your opponent Normal Summons a Level 7 or higher monster, or after your opponent activates a Spell Card.\n[EFFECT] Shuffle up to 5 monsters from your opponent's Graveyard into the Deck.",
			},
			{
				name: "Wave Crest Madoor",
				img: "https://ms.yugipedia.com//thumb/0/0d/WaveCrestMadoor-RD23PR-JP-NPR.png/300px-WaveCrestMadoor-RD23PR-JP-NPR.png",
				desc: "[REQUIREMENT] Send 1 Spellcaster Type monster from your hand to the Graveyard.\n[EFFECT] Destroy 1 Spell/Trap Card on your opponent's field.",
			},
			{
				name: "Machvio of the Ultimate Aria",
				img: "https://ms.yugipedia.com//thumb/8/86/MachviooftheUltimateAria-RDKP12-JP-SR.png/300px-MachviooftheUltimateAria-RDKP12-JP-SR.png",
				desc: "[REQUIREMENT] None\n[CONTINUOUS EFFECT]\nThis card gains ATK equal to [the total number of Equip Spell Cards equipped to this card and the number of face-up Normal Monsters on your opponent's field] x 500.",
			},
			{
				name: "Gilford the Rising",
				img: "https://ms.yugipedia.com//thumb/8/8b/GilfordtheRising-RDKP12-JP-UR.png/300px-GilfordtheRising-RDKP12-JP-UR.png",
				desc: "This card cannot be Special Summoned.\n\n[REQUIREMENT] During the turn you Normal Summoned this card, shuffle 2 Warrior Type monsters from your Graveyard into the Deck.\n[EFFECT] This turn, this card can make up to 3 attacks on monsters.",
			},
			{
				name: "Ring of Storms",
				img: "https://ms.yugipedia.com//thumb/2/26/RingofStorms-RDKP12-JP-UR.png/300px-RingofStorms-RDKP12-JP-UR.png",
				desc: "[REQUIREMENT] Shuffle 2 monsters from your Graveyard into the Deck.\n[EFFECT] Shuffle 2-7 monsters with different names from your opponent's Graveyard into their Deck. Then, if you shuffled 6 or more monsters by this effect, you can shuffle 1 face-up Level 8 or lower monster from your opponent's field into the owner's Deck.",
			},
		]

		for (let i = 0; i < rushTrivia.length; i++) {
			const card = rushTrivia[i]

			const missing = missings.find((_) => _.name === card.name)
			if (missing === undefined) {
				const apiCard = data.find((_) => _.name === card.name)
				card.img = `https://images.ygoprodeck.com/images/cards/${apiCard.id}.jpg`
				card.desc = apiCard.desc
			} else {
				card.img = missing.img
				card.desc = missing.desc
			}
		}
		return {
			rushTrivia,
			allsets,
		}
	},
	data: () => ({
		rushTrivia: [],
		allcards: [],
		allsets: [],
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
		this.allcards = await this.getAllCards()
        console.log(this.rushTrivia.length)
	},
	methods: {
		// eslint-disable-next-line require-await
		getTrivia(cardName) {
			return this.rushTrivia.find((_) => _.name === cardName).cards
		},
		fixDate(date) {
			const aY = date.split(" ")[0].split("-")[0]
			const aM = +date.split(" ")[0].split("-")[1]
			return `${aY}-${aM < 10 ? "0" + aM : aM}`
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin-top: var(--space-0);
	margin-bottom: var(--space-0);
}

.banner > * {
	margin: 0;
}
</style>
