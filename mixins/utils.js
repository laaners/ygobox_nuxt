export default {
	methods: {
		async getAllCards() {
			const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
				await Promise.all([
					fetch("https://ygobox.herokuapp.com/allcards?n=0").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=1").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=2").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=3").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=4").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=5").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=6").then((response) => response.json()),
					fetch("https://ygobox.herokuapp.com/allcards?n=7").then((response) => response.json()),
				])
			const allcards = [
				...new Set([
					...seg1,
					...seg2,
					...seg3,
					...seg4,
					...seg5,
					...seg6,
					...seg7,
					...seg8,
				]),
			]
			allcards.sort((a, b) => a.id - b.id)
            return allcards
		},
	},
}
