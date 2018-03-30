<template>
	<ve-ring :legend-visible="false" :data="pieData.data" :settings="pieData.setting" :tooltip-visible="false" height="200px" :colors="pieData.color">
	</ve-ring>
</template>


<script>
/** 
 * 饼图组件
 * @module pie
 */
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