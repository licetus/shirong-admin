import InfoCard from './info-card'
import ActionCard from './action-card'
import ImageControl from './image-control'
import OrderPane from './order-pane'
import PilotPane from './pilot-pane'
import OperatorPane from './operator-pane'
import BasicSelector from './basic-selector'
import DynamicForm from './dynamic-form'
import ImgUploader from './img-uploader'
import Calendar from './calendar'
import ChannelCard from './channel-card'
import NotificationCard from './notification-card'

const Public = {
	install(Vue) {
		Vue.component('InfoCard', InfoCard)
		Vue.component('ActionCard', ActionCard)
		Vue.component('ImageControl', ImageControl)
		Vue.component('OrderPane', OrderPane)
		Vue.component('PilotPane', PilotPane)
		Vue.component('OperatorPane', OperatorPane)
		Vue.component('BasicSelector', BasicSelector)
		Vue.component('DynamicForm', DynamicForm)
		Vue.component('ImgUploader', ImgUploader)
		Vue.component('Calendar', Calendar)
		Vue.component('ChannelCard', ChannelCard)
		Vue.component('NotificationCard', NotificationCard)
	},
}

export default Public
