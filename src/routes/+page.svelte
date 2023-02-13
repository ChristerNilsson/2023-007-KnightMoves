<script>
	import _ from 'lodash'
	const range = _.range
	const log = console.log
	const NOQUEEN = [10,13,17,18,19,20,21,22,26,29,34,37,41,42,43,44,45,46,50,53]
	const N=8
	const c = (n) => n % N
	const r = (n) => Math.floor(n / N)

	const Queen = '♛'
	const Knight = '♘'
	let queen
	const illegal = []
	let targets = []
	let state = 0
	
	let knight
	let clicks=0
	const arrClicks=[]
	let taken = 0

	function placeQueen(index) {
		if (NOQUEEN.includes(index)) {
			log('No queen here')
			return
		}
		queen = index
			for (const i of range(N*N)) {
				const col = c(i)
				const row = r(i)
				if (col == c(queen) || row == r(queen)) illegal.push(i)
				if (Math.abs(col - c(queen)) == Math.abs(row - r(queen))) illegal.push(i)
			}
			targets= range(N*N).filter(i => !illegal.includes(i))
			knight = targets[0]
			arrClicks.push(0)
			taken++
			state++
	}

	function moveKnight(index) {
		if (illegal.includes(index)) return
		const col = c(index)
		const row = r(index)
		const dx = Math.abs(col - c(knight))
		const dy = Math.abs(row - r(knight))
		if (dx*dx+dy*dy == 5) {
			knight = index
			clicks++
			if (targets[taken] == knight) {
				taken++
				arrClicks.push(clicks)
			}
		}
	}

	function click(index) {
		if (state==0) {
			placeQueen(index)
		} else {
			moveKnight(index)
		}
	}

	function noop() {}
</script>

<!-- Make a black and white chess board with svg-->
<!-- The board is 8x8 squares, each square is 50x50 pixels -->
<!-- The queen and knight are placed on the board using the queen and knight variables -->

<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
	<g>
		{#each range(N*N) as index}
				<rect
					on:click = {() => click(index)}
					on:keyup = {noop}
					x = {c(index) * 50}
					y = {r(index) * 50}
					width = 50
					height = 50
					fill = {((r(index) + c(index)) % 2) ? 'yellow' : 'brown'}
					/>
		{/each}
		{#if state==1}
			<text 
				x={c(queen) * 50 + 25}  
				y={r(queen) * 50 + 35}  
				font-size="50" 
				fill="black" 
				text-anchor="middle" 
				dominant-baseline="middle">
				{Queen}
			</text>
			<text 
				x={c(knight) * 50 + 25} 
				y={r(knight) * 50 + 35} 
				font-size="60" 
				fill="black" 
				text-anchor="middle" 
				dominant-baseline="middle">
				{Knight}
			</text>
		{/if}
		{#each illegal as i}
			{#if i != queen}
				<circle 
					cx={c(i) * 50 + 25} 
					cy={r(i) * 50 + 25} 
					r=5 
					stroke="black" 
					stroke-width="1" 
				/>
			{/if}
		{/each}
		{#each range(taken) as i}
			{#if targets[i]!= knight}
				<text 
					on:click = {() => click(targets[i])}
					on:keyup={noop}
					x={c(targets[i]) * 50 + 25} 
					y={r(targets[i]) * 50 + 30} 
					dominant-baseline="middle" 
					text-anchor="middle" 
					stroke="black" 
					stroke-width="1" 
					font-size="30" 
					fill-opacity="0">{arrClicks[i]}</text>
			{/if}
		{/each}

		{#if state==1}
			<circle 
				on:click = {() => click(targets[taken])}
				on:keyup={noop} 
				cx={c(targets[taken]) * 50 + 25} 
				cy={r(targets[taken]) * 50 + 25} 
				r=10 
				stroke="black"
				stroke-width="1"
				fill-opacity="0"
			/>
		{/if}
	</g>
</svg>
