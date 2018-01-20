<template>
	<ve-ring :legend-visible="false" :data="pieData.data" :settings="pieData.setting" :tooltip-visible="false" height="200px" :colors="pieData.color">
	</ve-ring>
</template>

<script>
import VeRing from 'v-charts/lib/ring'
export default {
	props: {
		pieData: {
			type: Object
		}
	},
	components: {
		VeRing	
	},
	created: function() {

	}
}
</script>