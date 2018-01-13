
<style lang="scss" >
.rsIndex {
	&_follow_title {
		span {
			font-size: 13px;
		}
	}
	&_header {
		box-sizing: border-box;
		padding: 15px;
		display: flex;
		justify-content: space-between;
		padding-bottom: 0;
		&_avatar {
			height: 90px;
			width: 80px;
			overflow: hidden;
			position: relative;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.09);
			border-radius: 4px;
			border: solid 1px rgba(255, 255, 255, 0.51);
			>img {
				display: block;
				height: 100%;
				width: 100%;
			}
			>span {
				height: 17.5px;
				line-height: 17.5px;
				text-align: center;
				background-color: rgba(0, 0, 0, 0.3);
				color: #fff;
				font-size: 12px;
				position: absolute;
				bottom: 0;
				left: 0;
				display: block;
				width: 100%;
			}
		}
		&_text {
			line-height: 23.5px;
			width: calc(100% - 100px);
			font-size: 13px;
			color: #666;
		}
	}

	&_middle {
		padding: 15px;
		box-sizing: border-box;
		&_content {
			box-sizing: border-box;
			padding: 15px 0;
			display: flex;
			box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
			border-radius: 4px;
			border: solid 1px rgba(0, 0, 0, 0.09);
			background-color: #fff;
		}
		&_single {
			box-sizing: border-box;
			padding: 0 10px;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			&:nth-of-type(2) {
				&:after {
					content: "";
					display: block;
					width: 1px;
					height: 100%;
					background-color: #e5e5e5;
					position: absolute;
					left: 0;
					top: 0;
				}
				&:before {
					content: "";
					display: block;
					width: 1px;
					height: 100%;
					background-color: #e5e5e5;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			>p {
				font-size: 12px;
				line-height: 24px;
				text-align: center;
				color: #666666;
			}
			>h4 {
				text-align: center;
			}
			>span {
				display: block;
				text-align: center;
				font-size: 12px;
				color: #666;
				>a {
					color: #f36837;
					cursor: pointer;
				}
			}
		}
		&_number {}
	}
	&_chart {
		&_disease {
			background-color: #fff;
			margin-bottom: 10px;
		}
		&_drugs {
			background-color: #fff;
			margin-bottom: 10px;
		}
		&_disContent {
			display: flex;
			justify-content: space-between;
		}
		&_disChart {
			width: 200px;
			height: 200px;
			flex-grow: 0;
			flex-shrink: 0;
			position: relative;
			>h3 {
				font-size: 18px;
				color: #666;
				top: 50%;
				position: absolute;
				transform: translateY(-50%);
				text-align: center;
				width: 100%;
			}
		}
		&_indexList {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-sizing: border-box;
			padding-right: 15px;
		}
		&_disChartLine {
			width: 100%;
		}
		&_commonTitle {
			.weui-cell__ft {
				font-size: 13px;
			}
		}
		&_indexPer {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			>div {
				width: 30%;
				position: relative;
				height: 53px;
				border-radius: 2px;
				border: solid 1px #e9e9e9;
				>h3 {
					font-size: 15px;
					color: #484848;
					height: 33px;
					line-height: 33px;
					text-align: center;
				}
				>span {
					display: block;
					height: 20px;
					background-color: #f8f8f8;
					border: solid 1px #e9e9e9;
					color: #484848;
					font-size: 10px;
					text-align: center;
					line-height: 20px;
				}
			}
		}
		&_indexSingle {
			display: flex;
			height: 20px;
			align-items: center;
			margin-bottom: 5px;
			>span {
				height: 10px;
				width: 10px;
				border-radius: 50%;
				display: block;
				flex-shrink: 0;
				flex-grow: 0;
				margin-right: 5px;
			}
			>h4 {
				font-size: 12px;
				color: #666;
				flex: 1;
				font-weight: 400;
			}
			>h5 {
				margin-left: 5px;
				font-size: 12px;
				color: #333;
				font-weight: 400;
				width: 40px;
				flex-shrink: 0;
				flex-grow: 0;
			}
		}
	}

	&_ {}
}
</style>


<template lang="pug">
//- 首页主体
.rsIndex
	b-scroll(
		:data="dataList",
		pulldown=true,
		@pulldown="listRefresh",
		@scrollToEnd="getData",
		ref="scollView",
		)
		//- 头部
		.rsIndex_header
			.rsIndex_header_avatar
				img(:src="baseData.aipicTureUrl")
				span {{baseData.AiName}}
			p.rsIndex_header_text 早上好，{{baseData.realname}}医生，{{baseData.AiName}}已等候您{{getLastHours}}小时了。以下是您需要处理的内容。
			//- 中间部分
		.rsIndex_middle 
			.rsIndex_middle_content
				.rsIndex_middle_single
					p 已随访{{baseData.hadVisitCount}}次共{{baseData.hadVisitPeopleCount}}位患者
				.rsIndex_middle_single
					h4.rsIndex_middle_number {{baseData.needShCount}}
					span 随访计划
						router-link(to="/main/main/plan") 待审核
				.rsIndex_middle_single
					h4.rsIndex_middle_number {{baseData.needClCount}}
					span 随访结果
						router-link(to="/main/main/result") 待处理
		//- 图表插件 两个图表 ，折线图和环状图
		.rsIndex_chart
			//- 疾病分类情况
			.rsIndex_chart_disease
				group.rsIndex_chart_commonTitle
					popup-radio(title="疾病分布情况", :options="timeOptions",@on-change="getDisease", v-model="dataList[0].timeSelect")
				.rsIndex_chart_disContent
					.rsIndex_chart_disChart
						pie-example(:pieData="dataList[0].pieData")
						h3 {{dataList[0].pieData.data.rows[0].Count}}人
					.rsIndex_chart_indexList
						li(v-for="item,index in dataList[0].pieData.data.rows",:key="item.index").rsIndex_chart_indexSingle
							span(:style="{'backgroundColor':dataList[0].pieData.color[index]}") 
							h4.nowarp {{item.diagnoseName}}
							h5 {{item.percent}}%
					
			//- 用药依从性
			.rsIndex_chart_drugs
				group.rsIndex_chart_commonTitle
					popup-radio(title="用药依从性", :options="timeOptions",@on-change="getDrugs", v-model="dataList[1].timeSelect")
				.rsIndex_chart_disContent
					.rsIndex_chart_disChart
						pie-example(:pieData="dataList[1].pieData")
						h3 {{dataList[1].pieData.data.rows[0].Count}}人次
					.rsIndex_chart_indexList
						.rsIndex_chart_indexPer
							div(v-for="item,index in dataList[1].pieData.data.rows",:key="item.index") 
								h3 {{item.percent}}%
								span {{item.diagnoseName}}
						li(v-for="item,index in dataList[1].pieData.data.rows",:key="item.index").rsIndex_chart_indexSingle
							span(:style="{'backgroundColor':dataList[1].pieData.color[index]}")  
							h4.nowarp {{item.diagnoseName}}
							h5 {{item.itemCount}}
			//- 随访数量统计
			.rsIndex_chart_drugs
				group.rsIndex_chart_commonTitle
					popup-radio(title="随访数量统计" ,:options="timeOptions_simple",@on-change="getFollowData", v-model="dataList[2].timeSelect")
				.rsIndex_chart_disContent
					.rsIndex_chart_disChartLine
						line-example(:lineData="dataList[2].lineData")
			
		group.rsIndex_follow_title
			cell( title="特别关注" ,link="/main/main/mine/follow")
				span(slots="default") 更多
		list-compent(:list="list") 
</template>

<script>
import { API } from '@/services';
import { ButtonTab, ButtonTabItem, Group, PopupRadio, Cell } from 'vux';
import ListCompent from '../Common/Result.vue';
import BScroll from '../Common/scrollView.vue';
import LineExample from './chart/line.vue';
import PieExample from './chart/pie.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		ButtonTab,
		ButtonTabItem,
		Group,
		PopupRadio,
		BScroll,
		LineExample,
		PieExample,
		ListCompent,
		Cell
	},
	computed: {
		...mapGetters(
			[
				'getLastHours'
			]
		)
	},
	data() {
		return {
			/* 上拉加载更多 */
			swiper_pullUp: false,//显示加载
			swiper_nodata: false,//没有更多数据
			page: 1,
			list: [],//我的特别关注
			loading: false,
			timeOptions: [
				{
					value: "全部",
					key: 0,
				}, {
					value: "7天",
					key: 1,
				}, {
					value: "30天",
					key: 2,
				}, {
					value: "3个月",
					key: 3,
				}, {
					value: "6个月",
					key: 4,
				}, {
					value: "1年",
					key: 5,
				}],
			timeOptions_simple: [
				{
					value: "7天",
					key: 1,
				}, {
					value: "30天",
					key: 2,
				},
			],
			baseData: {},//基础数据
			dataList: [
				//疾病分布情况
				{
					timeSelect: 0,
					pieData: {
						data: {
							columns: ['diagnoseName', 'itemCount'],
							rows: [
								{
									Count: 0,
								}
							]
						},
						setting: {
							offsetY: 100,
							radius: ['55', '70'],
							label: {
								normal: {
									show: false
								},
								emphasis: {
									show: false
								}
							}
						},
						color: ['#f36837', '#59d0bd', '#f8df94', '#5d98e3', '#5d64e3']
					}
				},
				//用药依从性
				{
					timeSelect: 0,
					pieData: {
						data: {
							columns: ['diagnoseName', 'itemCount'],
							rows: [
								{
									Count: 0,
								}
							]
						},
						setting: {
							/* roseType: 'radius', */
							offsetY: 100,
							radius: ['45', '70'],
							label: {
								normal: {
									show: false
								},
								emphasis: {
									show: false
								}
							}
						},
						color: ['#fe6262', '#74d477', '#f2b52e', '#5d98e3', '#5d64e3']
					}
				},
				//随访数量统计
				{
					timeSelect: 1,
					lineData: {
						data: {
							columns: ['diagnoseName', 'itemCount'],
							rows: [

							]
						},
						setting: {
							itemStyle: {
								normal: {
									color: '#f36837'
								}
							},
							areaStyle: {
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
											offset: 1, color: '#f79776' // 100% 处的颜色
										}],
										globalCoord: false // 缺省为 false
									}
								}
							},
							area: true
						}
					}
				},
			],//数据列表
		}
	},
	methods: {
		/** 
		 * 页面刷新，获取所有数据
		 */
		listRefresh() {
			/** 获取基础数据 */
			this.getBaseData();
			this.getDrugs();
			this.getDisease();
			this.getFollowData();
			this.getList();
		},
		/** 
		 * 获取基础数据
		 */
		getBaseData() {
			API.homePage.adminInfo().then((res) => {
				this.baseData = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 获取用药依从性接口
		 */
		getDrugs() {
			API.homePage.getUseEatInfo({
				dateType: this.dataList[0].timeSelect
			}).then((res) => {
				this.dataList[1].pieData.data.rows = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 获取疾病信息
		 */
		getDisease() {
			API.homePage.diagnoseInfo({
				dateType: this.dataList[1].timeSelect
			}).then((res) => {
				this.dataList[0].pieData.data.rows = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 获取随访数量统计
		 */
		getFollowData() {
			API.homePage.visitCountInfo({
				dateType: this.dataList[2].timeSelect
			}).then((res) => {
				this.dataList[2].lineData.data.rows = res.data;
			}).catch((err) => {

			});
		},
		/**@argument
         * 获取特别关注
         */
		getList() {
			API.patientList.list(
				{
					pager: 1,
					limit: 3,
				}
			).then((res) => {
				this.list = res.data
			}).catch((err) => {

			});
		},
		/**
		 * 获取首页推荐列表
		 */
		getData() {
			if (this.loading) {
				return false;
			}
			this.loading = true;
			if (this.dataList.length >= 10) {
				this.swiper_pullUp = true;
				this.swiper_nodata = false;
			}
		},
		/**@argument
		 * 滚动刷新
		 */
		scollRefresh() {
			this.$refs.scollView.scroll.refresh();
		},
	},
	mounted() {
		this.listRefresh();
	},
	activated() {

	}
}
</script>
