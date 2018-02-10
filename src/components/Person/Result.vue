
<style lang="scss" >
.resultData {
	&_main {
		height: 100%;
	}
	&_list {
		box-sizing: border-box;
		padding: 15px;
		height: 100%;
	}
	&_single {
		box-sizing: border-box;
		padding: 10px;
		border-radius: 5px;
		background-color: #fff;
		font-size: 13px;
		margin-bottom: 15px;
		color: #999;
		>span {
			color: #f36837;
			margin-right: 5px;
		}
		>div {

			div {
				//width: 100% !important;
			}
		}
	}
}
</style>


<template lang="pug">
//- 首页主体
.resultData
	.resultData_main
		//-header-cop(:heder_title="title")
		b-scroll(
			:data="resultList",
			pulldown=true,
			@pulldown="listRefresh",
			@scrollToEnd="listRefresh",
			ref="scollView",
			)
			ul.resultData_list
				template(v-for="item,index in resultList",v-if='item.isNum')
					li.resultData_single
						span {{item.fieldName}}:
						| {{item.fieldValue}}
						div
							ve-line(height="230px",:legend-visible="false",:yAxis="yAxis",:data="item.chartdata",:settings="item.setting",:grid="grid")
				template(v-for="item,index in resultList",v-if='!item.isNum')
					li.resultData_single
						span {{item.fieldName}}:
						| {{item.fieldValue}}
						//-line-example(:lineData="")
				
</template>

<script>
import HeaderCop from '../Common/Header.vue';
import VeLine from 'v-charts/lib/line';
import { API } from '@/services';
import { mapGetters } from 'vuex';
import BScroll from '../Common/scrollView.vue';
export default {
	components: {
		BScroll,
		VeLine,
		HeaderCop
	},
	computed: {
		...mapGetters([
			'getReload'
		])
	},
	data() {
		return {
			title: "结果详情",
			setting: {
				itemStyle: {
					normal: {
						color: '#333'
					}
				},
				label: {
					normal: {
						show: true
					}
				},
				lineStyle: {
					normal: {
						color: "#fff"
					}
				},
				/* areaStyle: {
					normal: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: '#f36837' // 0% 处的颜色
							}, {
								offset: 1, color: '#FFF' // 100% 处的颜色
							}],
							globalCoord: true // 缺省为 false
						}
					}
				}, */
				/* area: true */
			},
			grid: {
				height: "150px",
				show: true,
				top: 50,
				left: 20,
				right: 30,
				backgroundColor: '#f36837',
				borderColor: '#fff'
			},
			xAxisType: 'value',
			yAxis: {
				type: 'value',
				name: "数值",
				axisTick: {
					inside: true
				},
				axisLine: {
					lineStyle: {
						type: "dashed",
						color: "#666"
					}
				},
				axisTick: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.4)"
					}
				},
				nameTextStyle: {
					color: "#333"
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.4)"
					}
					/* show: false */
				},
			},
			id: "",
			taskid: "",
			num: 1,
			/* 上拉加载更多 */
			swiper_pullUp: false,//显示加载
			swiper_nodata: false,//没有更多数据
			loading: false,
			baseData: {},//基础数据

			resultList: [],//统计列表
			flag: 0,
		}
	},
	methods: {
		/** 
		 * 页面刷新，获取所有数据
		 */
		listRefresh() {
			/** 获取基础数据 */
			this.getPlanResult();
		},
		/** 
         * 根据id获取随访结果
         */
		getPlanResult() {
			API.followway.getVisistOrderResult(
				{
					taskId: this.taskid,//计划id
					num: this.num
				}
			).then((res) => {
				this.flag = 0;
				for (const item of res.data) {
					let self = this;
					let setting = JSON.parse(JSON.stringify(self.setting));
					if (item.fieldName.indexOf('血压') > -1) {
						item.chartdata = {
							columns: ['dateAdd', 'fieldValue', 'fieldValueElse'],
							rows: []
						};
						setting.labelMap = {
							dateAdd: '日期',
							fieldValue: '高压',
							fieldValueElse: '低压'
						};
					} else {
						item.chartdata = {
							columns: ['dateAdd', 'fieldValue'],
							rows: []
						};
						setting.labelMap = {
							dateAdd: '日期',
							fieldValue: item.fieldName
						};
					}


					item.setting = setting;
					if (item.isNum) {
						this.flag++;
						this.getChart(item);
					}
				}
				let inter = setInterval(() => {
					if (this.flag == 0) {
						clearInterval(inter);
						this.resultList = res.data;
					}
				}, 10)
			}).catch((err) => {

			});
		},
		getChart(item) {
			API.followway.getChartData(
				{
					hzxxId: this.id,
					fieldName: item.fieldName  //指标名称
				}
			).then((res) => {
				for (const ite of res.data) {
					if (ite.fieldValue.indexOf('/') > -1) {
						let arr = ite.fieldValue.split('/');
						ite.fieldValueElse = arr[1];
						ite.fieldValue = arr[0];
					}
				}
				item.chartdata.rows = res.data;

				let copy = item.chartdata;
				item.chartdata = {};
				item.chartdata = copy;
				this.flag--;
			}).catch((err) => {

			});
		},
		/**@argument
		 * 滚动刷新
		 */
		scollRefresh() {
			this.$refs.scollView.scroll.refresh();
		},
	},
	mounted() {
		this.$store.commit('updateIsReload');
		//获取任务id
		this.taskid = this.$route.query.id;
		this.id = this.$route.query.hzxxId;
		this.num = this.$route.query.num;
		this.listRefresh();
	},
	activated() {

	}
}
</script>
