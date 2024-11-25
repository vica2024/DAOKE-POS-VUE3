import Mock from 'mockjs';
import setupMock, {successResponseWrap} from '@/utils/setup-mock';
const today = new Date().toLocaleDateString('zh-CN', { // 获取今天的日期
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).replace(/\//g, '-'); // 将日期格式从斜杠替换为横杠

setupMock({
    setup() {
        // Quality Inspection
        Mock.mock(new RegExp('/message/sslist'), () => {
            return successResponseWrap([
                {
                    type: 'message',
                    title: '系统升级通知',
                    isReaded: 0,
                    content: '为了提升系统性能，今晚将于2点至5点进行系统升级，请提前做好相关准备。',
                    create_time: today,
                },
                {
                    type: 'todo',
                    title: '新订购订单提醒',
                    isReaded: 0,
                    content: '您有一个新的美团线上订单需要处理，请尽快查看。',
                    messageType: 0,
                    create_time: today,
                },
                {
                    type: 'todo',
                    title: '新预约订单提醒',
                    isReaded: 0,
                    content: '您有一个新的美团线上新预约订单需要处理，请尽快查看。',
                    messageType: 1,
                    create_time: today,
                },
                {
                    type: 'notice',
                    isReaded: 0,
                    title: '国庆放假通知',
                    content: '2024年国庆假期安排，请提前规划您的行程。',
                    create_time: today,
                },
                {
                    type: 'notice',
                    isReaded: 0,
                    title: '门店盘点通知',
                    content: '请注意，10月份将进行门店盘点，请提前做好准备。',
                    create_time: today,
                }
            ]);
        });

        Mock.mock(new RegExp('/message/read'), () => {
            return successResponseWrap({
                    id:1,
                    title:"asdasd",
                    content: '该系统将于今晚凌晨2点到5点进行升级维护',
                
            });
        });
    },
});
