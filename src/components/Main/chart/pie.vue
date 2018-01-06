<template>
	<ve-ring :legend-visible="false" :data="pieData.data" :settings="pieData.setting" :tooltip-visible="false" height="200px" :colors="pieData.color">
	</ve-ring>
</template>

<script>
export default {
	props: {
		pieData: {
			type: Object
		}
	},
	created: function() {

	}
}
</script>